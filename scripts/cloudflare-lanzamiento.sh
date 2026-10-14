#!/usr/bin/env bash
# Publica Rijo Suplidora en la cuenta de Cloudflare de la clienta, sin usar el panel.
#
# Qué hace (cada paso revisa primero si ya existe, así que se puede repetir sin riesgo):
#   1. Verifica que el token ve la zona rijosuplidora.com (y que está en ESTA cuenta).
#   2. Crea el proyecto de Pages (producción = main) si no existe.
#   3. Compila y despliega a producción.
#   4. Asocia rijosuplidora.com al proyecto.
#   5. Crea los registros DNS: apex -> proyecto (CNAME con proxy) y www (A de relleno con proxy).
#   6. Crea la regla 301: www.rijosuplidora.com -> https://rijosuplidora.com (conserva ruta y query).
#
# Uso:
#   bash scripts/cloudflare-lanzamiento.sh             # SIMULACIÓN: solo lee y muestra lo que haría
#   bash scripts/cloudflare-lanzamiento.sh --aplicar   # ejecuta los cambios
#   Opción --sin-deploy: NO crea el proyecto ni compila/despliega. Úsala si el proyecto de Pages ya
#   existe y se publica por otra vía (p. ej. conectado a GitHub): solo hace dominio, DNS y redirección.
#   Ej.: bash scripts/cloudflare-lanzamiento.sh --sin-deploy --aplicar
#
# Variables de entorno necesarias (NO se escriben en este archivo):
#   CLOUDFLARE_API_TOKEN    token de la cuenta de la clienta. Permisos:
#                             Account > Cloudflare Pages > Edit
#                             Zone > Zone > Read
#                             Zone > DNS > Edit
#                             Zone > Single Redirect > Edit   (limitado a rijosuplidora.com)
#   CLOUDFLARE_ACCOUNT_ID   ID de la cuenta de la clienta
#
# El correo contacto@ (Email Routing) se configura aparte, en el panel (ver README/estado del proyecto).

set -euo pipefail

PROJECT="rijo-suplidora"
DOMAIN="rijosuplidora.com"
WWW_HOST="www.${DOMAIN}"
PROD_BRANCH="main"
API="https://api.cloudflare.com/client/v4"
APPLY=0
SIN_DEPLOY=0
for arg in "$@"; do
  case "$arg" in
    --aplicar)    APPLY=1 ;;
    --sin-deploy) SIN_DEPLOY=1 ;;
    *) echo "Opción desconocida: $arg (usa --aplicar y/o --sin-deploy)"; exit 1 ;;
  esac
done

: "${CLOUDFLARE_API_TOKEN:?Falta CLOUDFLARE_API_TOKEN (créalo en la cuenta de la clienta y expórtalo con read -s)}"
: "${CLOUDFLARE_ACCOUNT_ID:?Falta CLOUDFLARE_ACCOUNT_ID (ID de la cuenta de la clienta)}"
command -v node >/dev/null || { echo "Se necesita node (ya lo usas para el proyecto)."; exit 1; }

# --- utilidades -------------------------------------------------------------
cf() { # cf MÉTODO RUTA [JSON]   (el token viaja solo en la cabecera, nunca se imprime)
  # -4: fuerza IPv4 (en esta red IPv6 corta las conexiones, igual que le pasaba a wrangler).
  # --retry-all-errors: reintenta también si la conexión se reinicia a mitad.
  local m="$1" p="$2" d="${3:-}" out
  local opts=(-4 -sS --connect-timeout 15 --retry 3 --retry-all-errors --retry-delay 2)
  if [[ -n "$d" ]]; then
    out=$(curl "${opts[@]}" -X "$m" "${API}${p}" -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
      -H "Content-Type: application/json" --data "$d") || { net_error; return 1; }
  else
    out=$(curl "${opts[@]}" -X "$m" "${API}${p}" -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}") || { net_error; return 1; }
  fi
  printf '%s' "$out"
}
net_error() {
  printf '\nERROR de red al hablar con api.cloudflare.com (la conexión se cortó incluso tras reintentar).\n' >&2
  printf 'Prueba: otra red (datos del celular), desactivar VPN/antivirus que inspecciona HTTPS, y vuelve a correr el script.\n' >&2
}
js() { # lee JSON de stdin y evalúa una expresión sobre `j`; imprime vacío si no hay valor
  node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{let j;try{j=JSON.parse(s)}catch(e){console.log("");return}
  let r;try{r=eval(process.argv[1])}catch(e){r=undefined}
  console.log(r===undefined||r===null?"":(typeof r==="object"?JSON.stringify(r):r))})' "$1"
}
say()  { printf '\n== %s\n' "$*"; }
plan() { if (( APPLY )); then printf '   -> %s\n' "$*"; else printf '   [SIMULACIÓN] haría: %s\n' "$*"; fi; }
fail() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

(( APPLY )) && echo "MODO: APLICAR cambios" || echo "MODO: SIMULACIÓN (agrega --aplicar para ejecutar)"
echo "Cuenta: ${CLOUDFLARE_ACCOUNT_ID}"

# --- 1. Zona ----------------------------------------------------------------
say "1/6 Zona ${DOMAIN}"
R=$(cf GET "/zones?name=${DOMAIN}&account.id=${CLOUDFLARE_ACCOUNT_ID}")
[[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "El token no pudo consultar zonas: $(echo "$R" | js 'j.errors')"
ZONE_ID=$(echo "$R" | js 'j.result[0].id')
[[ -n "$ZONE_ID" ]] || fail "No veo la zona ${DOMAIN} en la cuenta ${CLOUDFLARE_ACCOUNT_ID}. Revisa el Account ID y que el token incluya Zone > Zone > Read sobre ese dominio."
echo "   zona encontrada (estado: $(echo "$R" | js 'j.result[0].status'))"

# --- 2. Proyecto ------------------------------------------------------------
say "2/6 Proyecto de Pages '${PROJECT}'"
R=$(cf GET "/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}")
if [[ "$(echo "$R" | js 'j.success')" == "true" ]]; then
  echo "   ya existe"
elif (( SIN_DEPLOY )); then
  fail "El proyecto '${PROJECT}' no existe en esta cuenta. Con --sin-deploy debe crearse antes (p. ej. en el panel con Connect to Git)."
else
  plan "npx wrangler pages project create ${PROJECT} --production-branch=${PROD_BRANCH}"
  if (( APPLY )); then
    npx wrangler pages project create "${PROJECT}" --production-branch="${PROD_BRANCH}"
    R=$(cf GET "/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}")
  fi
fi
SUBDOMAIN=$(echo "$R" | js 'j.result.subdomain')
if [[ -z "$SUBDOMAIN" ]]; then
  (( APPLY )) && fail "No pude leer el subdominio *.pages.dev del proyecto."
  SUBDOMAIN="${PROJECT}.pages.dev"   # solo para mostrar en simulación
fi
echo "   dirección pages.dev: ${SUBDOMAIN}"

# --- 3. Build + deploy ------------------------------------------------------
say "3/6 Compilar y desplegar a producción (--branch=${PROD_BRANCH})"
if (( SIN_DEPLOY )); then
  echo "   omitido (--sin-deploy): el sitio se publica por otra vía"
else
plan "npm run build  &&  npx wrangler pages deploy dist --project-name=${PROJECT} --branch=${PROD_BRANCH}"
if (( APPLY )); then
  [[ -f .env ]] || echo "   AVISO: no hay .env; el formulario de contacto no tendrá la llave de Web3Forms."
  npm run build
  npx wrangler pages deploy dist --project-name="${PROJECT}" --branch="${PROD_BRANCH}"
fi
fi

# --- 4. Dominio en el proyecto ---------------------------------------------
say "4/6 Dominio ${DOMAIN} en el proyecto"
R=$(cf GET "/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}/domains")
if echo "$R" | js 'j.result.map(d=>d.name).join(",")' | tr ',' '\n' | grep -qx "${DOMAIN}"; then
  echo "   ya asociado (estado: $(echo "$R" | js "j.result.find(d=>d.name==='${DOMAIN}').status"))"
else
  plan "POST /pages/projects/${PROJECT}/domains  {name: ${DOMAIN}}"
  if (( APPLY )); then
    R=$(cf POST "/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/${PROJECT}/domains" "{\"name\":\"${DOMAIN}\"}")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo asociar el dominio: $(echo "$R" | js 'j.errors')"
    echo "   asociado (estado: $(echo "$R" | js 'j.result.status'))"
  fi
fi

# --- 5. DNS -----------------------------------------------------------------
dns_has() { # dns_has NOMBRE -> imprime los registros A/AAAA/CNAME existentes con ese nombre
  cf GET "/zones/${ZONE_ID}/dns_records?name=$1" | js "j.result.filter(r=>['A','AAAA','CNAME'].includes(r.type)).map(r=>r.type+' '+r.name+' -> '+r.content+(r.proxied?' (proxied)':'')).join('; ')"
}
say "5/6 Registros DNS"
EX=$(dns_has "${DOMAIN}")
if [[ -n "$EX" ]]; then
  echo "   ${DOMAIN}: ya hay registro, NO lo toco -> ${EX}"
else
  plan "DNS CNAME ${DOMAIN} -> ${SUBDOMAIN} (proxy activado)"
  if (( APPLY )); then
    R=$(cf POST "/zones/${ZONE_ID}/dns_records" "{\"type\":\"CNAME\",\"name\":\"${DOMAIN}\",\"content\":\"${SUBDOMAIN}\",\"proxied\":true,\"ttl\":1,\"comment\":\"Rijo Suplidora - Pages\"}")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo crear el CNAME: $(echo "$R" | js 'j.errors')"
    echo "   CNAME creado"
  fi
fi
EX=$(dns_has "${WWW_HOST}")
if [[ -n "$EX" ]]; then
  echo "   ${WWW_HOST}: ya hay registro, NO lo toco -> ${EX}"
else
  plan "DNS A ${WWW_HOST} -> 192.0.2.1 (proxy activado; IP de relleno, el redirect ocurre antes)"
  if (( APPLY )); then
    R=$(cf POST "/zones/${ZONE_ID}/dns_records" "{\"type\":\"A\",\"name\":\"${WWW_HOST}\",\"content\":\"192.0.2.1\",\"proxied\":true,\"ttl\":1,\"comment\":\"Rijo Suplidora - www redirige al dominio raiz\"}")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo crear el registro www: $(echo "$R" | js 'j.errors')"
    echo "   registro www creado"
  fi
fi

# --- 6. Redirect www -> raíz ------------------------------------------------
say "6/6 Redirección 301 de ${WWW_HOST} a https://${DOMAIN}"
R=$(cf GET "/zones/${ZONE_ID}/rulesets/phases/http_request_dynamic_redirect/entrypoint")
if [[ "$(echo "$R" | js 'j.success')" == "true" ]]; then
  if [[ "$(echo "$R" | js "(j.result.rules||[]).some(r=>r.ref==='rijo_www_a_raiz')")" == "true" ]]; then
    echo "   la regla ya existe"
  else
    echo "   AVISO: la zona ya tiene reglas de redirección propias; no las modifico."
    echo "   Agrega a mano (Rules > Redirect Rules) una regla 301 de ${WWW_HOST} hacia https://${DOMAIN} conservando la ruta."
  fi
else
  RULESET='{"name":"Redirecciones Rijo Suplidora","kind":"zone","phase":"http_request_dynamic_redirect","rules":[{"ref":"rijo_www_a_raiz","description":"www -> dominio raiz (301)","expression":"(http.host eq \"'"${WWW_HOST}"'\")","action":"redirect","action_parameters":{"from_value":{"status_code":301,"preserve_query_string":true,"target_url":{"expression":"concat(\"https://'"${DOMAIN}"'\", http.request.uri.path)"}}}}]}'
  plan "crear regla 301 ${WWW_HOST} -> https://${DOMAIN} (conserva ruta y query)"
  if (( APPLY )); then
    R=$(cf POST "/zones/${ZONE_ID}/rulesets" "$RULESET")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo crear la redirección: $(echo "$R" | js 'j.errors')"
    echo "   regla creada"
  fi
fi

# --- Fin --------------------------------------------------------------------
say "Listo"
if (( APPLY )); then
  cat <<MSG
Verifica en 2-5 minutos (el certificado del dominio puede tardar un poco):
  curl -I https://${DOMAIN}/
  curl -I https://${WWW_HOST}/        # debe responder 301 hacia https://${DOMAIN}/
Pendiente (en el panel): Email Routing para contacto@${DOMAIN}.
MSG
else
  echo "Esto fue una simulación: no se cambió nada. Si todo se ve bien, repite con --aplicar."
fi
