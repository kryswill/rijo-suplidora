#!/usr/bin/env bash
# Configura el correo del dominio rijosuplidora.com con Cloudflare Email Routing (gratis, SOLO RECIBE):
# las direcciones de abajo reenvían al Gmail de la clienta. Las etiquetas se crean en Gmail con el
# archivo scripts/gmail-filtros-rijo-suplidora.xml (ver instrucciones al final de la ejecución).
#
# Uso:
#   DEST_EMAIL="correo@gmail.com" bash scripts/cloudflare-correo.sh             # SIMULACIÓN (solo lee)
#   DEST_EMAIL="correo@gmail.com" bash scripts/cloudflare-correo.sh --aplicar   # ejecuta
#
# Se ejecuta en DOS pasadas (es normal): la 1.ª activa Email Routing y registra el Gmail de destino; Cloudflare
# le manda un correo de verificación. Cuando lo confirmes, la 2.ª pasada crea las 7 direcciones.
# Cada paso comprueba si ya existe, así que se puede repetir sin riesgo.
#
# Variables (no se escriben aquí):
#   CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID  (los mismos del otro script)
#   DEST_EMAIL  Gmail de destino. Se pide confirmarlo antes de aplicar (un error de tipeo mandaría
#               el correo de verificación a un desconocido).
# Permisos EXTRA del token (además de los del otro script):
#   Zone > Email Routing Rules > Edit      Account > Email Routing Addresses > Edit

set -euo pipefail

DOMAIN="rijosuplidora.com"
ALIASES=(administracion finanzas comercial ventas compras contacto rrhh)
API="https://api.cloudflare.com/client/v4"
APPLY=0
[[ "${1:-}" == "--aplicar" ]] && APPLY=1

: "${CLOUDFLARE_API_TOKEN:?Falta CLOUDFLARE_API_TOKEN}"
: "${CLOUDFLARE_ACCOUNT_ID:?Falta CLOUDFLARE_ACCOUNT_ID}"
: "${DEST_EMAIL:?Falta DEST_EMAIL (el Gmail de destino). Ej.: DEST_EMAIL=\"correo@gmail.com\" bash scripts/cloudflare-correo.sh}"
command -v node >/dev/null || { echo "Se necesita node."; exit 1; }
[[ "$DEST_EMAIL" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]] || { echo "DEST_EMAIL no parece un correo válido: $DEST_EMAIL"; exit 1; }
DEST_EMAIL=$(printf '%s' "$DEST_EMAIL" | tr 'A-Z' 'a-z')

cf() {
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
  printf '\nERROR de red al hablar con api.cloudflare.com (se cortó incluso tras reintentar). Prueba otra red o sin VPN.\n' >&2
}
js() {
  node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{let j;try{j=JSON.parse(s)}catch(e){console.log("");return}
  let r;try{r=eval(process.argv[1])}catch(e){r=undefined}
  console.log(r===undefined||r===null?"":(typeof r==="object"?JSON.stringify(r):r))})' "$1"
}
say()  { printf '\n== %s\n' "$*"; }
plan() { if (( APPLY )); then printf '   -> %s\n' "$*"; else printf '   [SIMULACIÓN] haría: %s\n' "$*"; fi; }
fail() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

(( APPLY )) && echo "MODO: APLICAR cambios" || echo "MODO: SIMULACIÓN (agrega --aplicar para ejecutar)"
echo "Cuenta:  ${CLOUDFLARE_ACCOUNT_ID}"
echo "Destino: ${DEST_EMAIL}   <-- revisa que esté bien escrito"
if (( APPLY )); then
  read -r -p "¿Es ese el Gmail correcto? Escribe s para continuar: " ok
  [[ "$ok" == "s" || "$ok" == "S" ]] || { echo "Cancelado."; exit 1; }
fi

say "1/4 Zona ${DOMAIN}"
R=$(cf GET "/zones?name=${DOMAIN}&account.id=${CLOUDFLARE_ACCOUNT_ID}")
[[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "El token no pudo consultar zonas: $(echo "$R" | js 'j.errors')"
ZONE_ID=$(echo "$R" | js 'j.result[0].id')
[[ -n "$ZONE_ID" ]] || fail "No veo la zona ${DOMAIN} en la cuenta ${CLOUDFLARE_ACCOUNT_ID}."
echo "   zona encontrada"

say "2/4 Email Routing activo en la zona"
R=$(cf GET "/zones/${ZONE_ID}/email/routing")
ENABLED=$(echo "$R" | js 'j.result.enabled')
if [[ "$ENABLED" == "true" ]]; then
  echo "   ya está activo"
else
  plan "POST /zones/{zona}/email/routing/enable   (añade los registros MX y SPF de Cloudflare)"
  if (( APPLY )); then
    R=$(cf POST "/zones/${ZONE_ID}/email/routing/enable")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo activar por API: $(echo "$R" | js 'j.errors')
   Alternativa en el panel: Email -> Email Routing -> Onboard Domain (rijosuplidora.com). Luego repite este script."
    echo "   activado"
  fi
fi

say "3/4 Dirección de destino ${DEST_EMAIL}"
R=$(cf GET "/accounts/${CLOUDFLARE_ACCOUNT_ID}/email/routing/addresses")
[[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No pude leer las direcciones de destino: $(echo "$R" | js 'j.errors') (¿falta el permiso Account > Email Routing Addresses > Edit?)"
FOUND=$(echo "$R" | js "j.result.some(a=>a.email.toLowerCase()==='${DEST_EMAIL}')")
VERIFIED=$(echo "$R" | js "(j.result.find(a=>a.email.toLowerCase()==='${DEST_EMAIL}')||{}).verified")
if [[ "$FOUND" != "true" ]]; then
  plan "registrar ${DEST_EMAIL} como destino (Cloudflare le enviará un correo de verificación)"
  if (( APPLY )); then
    R=$(cf POST "/accounts/${CLOUDFLARE_ACCOUNT_ID}/email/routing/addresses" "{\"email\":\"${DEST_EMAIL}\"}")
    [[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No se pudo registrar el destino: $(echo "$R" | js 'j.errors')"
    VERIFIED=""
  fi
fi
if [[ -z "$VERIFIED" ]]; then
  if (( APPLY )); then
    cat <<MSG

   PAUSA: ${DEST_EMAIL} aún NO está verificado.
   Abre ese Gmail (revisa también Spam), busca el correo de Cloudflare y pulsa el enlace de verificación.
   Después vuelve a correr este mismo comando para crear las direcciones.
MSG
    exit 0
  else
    echo "   (el destino aún no está verificado; en la pasada real se pedirá confirmar el correo de Cloudflare)"
  fi
else
  echo "   verificado"
fi

say "4/4 Direcciones ${DOMAIN} -> ${DEST_EMAIL}"
R=$(cf GET "/zones/${ZONE_ID}/email/routing/rules")
[[ "$(echo "$R" | js 'j.success')" == "true" ]] || fail "No pude leer las reglas: $(echo "$R" | js 'j.errors')"
for a in "${ALIASES[@]}"; do
  addr="${a}@${DOMAIN}"
  CUR=$(echo "$R" | js "(j.result.find(r=>(r.matchers||[]).some(m=>(m.value||'').toLowerCase()==='${addr}'))||{actions:[]}).actions.map(x=>(x.value||[]).join(',')).join(',')")
  if [[ -n "$CUR" ]]; then
    [[ "$CUR" == "$DEST_EMAIL" ]] && echo "   ${addr}: ya existe" || echo "   ${addr}: ya existe pero va a ${CUR} — NO lo toco"
    continue
  fi
  plan "regla ${addr} -> ${DEST_EMAIL}"
  if (( APPLY )); then
    BODY="{\"name\":\"${addr} -> destino\",\"enabled\":true,\"matchers\":[{\"type\":\"literal\",\"field\":\"to\",\"value\":\"${addr}\"}],\"actions\":[{\"type\":\"forward\",\"value\":[\"${DEST_EMAIL}\"]}]}"
    RR=$(cf POST "/zones/${ZONE_ID}/email/routing/rules" "$BODY")
    [[ "$(echo "$RR" | js 'j.success')" == "true" ]] || fail "No se pudo crear ${addr}: $(echo "$RR" | js 'j.errors')"
    echo "   ${addr}: creada"
  fi
done

say "Listo"
if (( APPLY )); then
  cat <<MSG
Prueba: desde OTRA cuenta de correo, escribe a ventas@${DOMAIN}; debe llegar a ${DEST_EMAIL}.
Etiquetas en Gmail (con la sesión del Gmail de destino):
  Configuración (engranaje) -> Ver todos los ajustes -> Filtros y direcciones bloqueadas
  -> Importar filtros -> elegir scripts/gmail-filtros-rijo-suplidora.xml -> Abrir archivo
  -> marcar todos -> "Crear filtros" (marca también "Aplicar filtro a las conversaciones existentes" si quieres).
MSG
else
  echo "Esto fue una simulación: no se cambió nada."
fi
