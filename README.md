# Rijo Suplidora — Landing Page

Sitio web oficial de **Rijo Suplidora** (Lambar Trading Corporation), suplidor mayorista de
souvenirs, artesanías y joyería en Larimar y Ámbar en República Dominicana.

Sitio bilingüe (Español / Inglés), construido en React con pre-renderizado estático (SSG) para
SEO real, y pensado para desplegarse en **Cloudflare Pages**.

---

## 1. Stack técnico y por qué se eligió

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | React 19 + TypeScript | Requisito del proyecto. TypeScript detecta errores antes de producción (ya se usó durante el desarrollo para atrapar varios bugs). |
| Build tool | Vite 8 | Estándar actual para proyectos React: arranque y HMR casi instantáneos, build de producción optimizado. |
| Enrutamiento | React Router v6 (vía `vite-react-ssg`) | Enrutamiento del lado del cliente con URLs limpias y traducidas. |
| Renderizado | **`vite-react-ssg`** (Static Site Generation) | Genera un archivo `.html` real y completo por cada página/idioma en el build (10 páginas). Esto es clave para el SEO: Google, Bing, WhatsApp, Facebook, etc. reciben el contenido y las etiquetas `<meta>` ya escritas en el HTML, sin depender de que ejecuten JavaScript. Es mejor que un sitio React "tradicional" (solo del lado del cliente) para posicionamiento en buscadores. |
| Multilenguaje | `i18next` / `react-i18next` | Estándar de la industria para internacionalización en React. Los textos viven en dos archivos JSON (`src/i18n/locales/es.json` y `en.json`), fáciles de editar sin tocar código. |
| Estilos | Tailwind CSS v4 | Versión estable más reciente de Tailwind (motor en CSS nativo, más rápido). Paleta de marca centralizada en `src/styles/index.css`. |
| Animaciones | Motion (antes "Framer Motion") | Librería de animación estándar para React; se usa para las transiciones y efectos de scroll del sitio. |
| Iconos | Lucide React | Set de iconos SVG moderno, liviano y consistente. |
| Tipografías | Fraunces + Inter (autoalojadas vía `@fontsource`) | Se sirven desde el propio dominio en vez de Google Fonts: una petición externa menos, mejor privacidad y mejor puntaje de rendimiento. |
| Formulario de contacto | Web3Forms (envío directo desde el navegador) | Servicio gratuito diseñado para funcionar del lado del cliente (ver sección 4). |

### ¿Por qué SSG y no solo un sitio React normal?

Un sitio React "normal" genera una página HTML casi vacía y arma todo con JavaScript en el
navegador del visitante. Los buscadores modernos *pueden* ejecutar JavaScript, pero hacerlo es más
lento y menos confiable que leer HTML ya completo — y varias herramientas (vistas previas de
WhatsApp/Facebook, algunos bots) no ejecutan JavaScript en absoluto. Por eso este proyecto usa
`vite-react-ssg`: en cada `npm run build` se generan **10 archivos HTML reales (más un `404.html` compartido)**, uno por cada
combinación de página × idioma, cada uno con su propio `<title>`, meta descripción, textos
Open Graph, `hreflang` (para indicar a Google cuál es la versión en cada idioma) y datos
estructurados (JSON-LD). El resultado sigue siendo una aplicación React normal una vez que carga
en el navegador (con todas las animaciones e interactividad), pero el "primer vistazo" que reciben
buscadores y redes sociales ya viene completo.

---

## 2. Estructura del proyecto

```
src/
  i18n/locales/es.json   ← todos los textos en español
  i18n/locales/en.json   ← todos los textos en inglés (misma estructura)
  data/site.ts           ← datos de contacto, dirección, horario, redes
  data/images.ts         ← banco de fotos de stock temporales (ver sección 5)
  data/products.ts       ← íconos de categorías de producto
  lib/routes.ts          ← definición de TODAS las rutas (es/en) — única fuente de verdad
  assets/brand/           ← logo oficial de la clienta (ver más abajo)
  components/            ← header, footer, botón de WhatsApp, formulario, tarjetas, etc.
  pages/                 ← Home, About, Products, Faq, Contact, NotFound
scripts/generate-seo-files.mjs  ← genera sitemap.xml y robots.txt (corre automático en el build)
public/                  ← favicons (generados del logo real), imagen para redes sociales, `_headers` de Cloudflare
```

Para **editar cualquier texto del sitio** (misión, historia, preguntas frecuentes, etc.) solo hay
que editar `src/i18n/locales/es.json` y su equivalente en `en.json` — no hace falta tocar los
componentes.

### Logo de marca

El sitio usa el logo oficial que entregó la clienta (no un marcador temporal). Los tres archivos
originales están en `src/assets/brand/`:

- `logo-horizontal.png` — isotipo + logotipo en línea horizontal. Es el que se usa en el header y
  el footer (`src/components/layout/Logo.tsx`).
- `logo-icon.png` — solo el isotipo (sin texto), cuadrado. Se usó para generar todo el set de
  favicons (`public/favicon-*.png`, `favicon.ico`, `apple-touch-icon.png`) y aparece también
  incrustado en la imagen de vista previa para redes sociales (`public/og-cover.png`).
- `logo-stacked.png` — isotipo + logotipo apilado (cuadrado). No se usa todavía en ninguna página;
  queda disponible para el futuro (por ejemplo, un sello grande en la página "Sobre Nosotros").

El wordmark del logo viene en tinta oscura, por eso `Logo.tsx` lo envuelve en una placa blanca
semitransparente (`bg-white/95`) cuando se muestra sobre fondos oscuros o el hero con foto (prop
`dark`) — así se mantiene legible sin necesidad de una segunda versión del archivo en blanco.

---

## 3. Desarrollo local

Requiere Node.js 20 o superior.

```bash
npm install
cp .env.example .env        # y completar la llave de Web3Forms (ver sección 4)
npm run dev                 # servidor de desarrollo
npm run build                # build de producción (genera /dist)
npm run preview              # sirve /dist localmente para revisar el build final
npm run typecheck            # solo verifica tipos de TypeScript
npm run lint                  # solo linting
```

---

## 4. Formulario de contacto (Web3Forms)

El formulario de la página de Contacto envía los mensajes **directamente desde el navegador del
visitante** hacia [Web3Forms](https://web3forms.com), un servicio gratuito que reenvía el mensaje
por correo. Se investigó explícitamente usar un "proxy" (una función de Cloudflare que reenviara
la petición) para evitar bloqueos de firewall/ad-blockers, pero la documentación oficial de
Web3Forms indica que el uso del lado del servidor requiere plan de pago + whitelisting de IP —
algo inviable con Cloudflare Pages Functions (no tienen IP fija). Por eso se implementó el método
recomendado por el propio proveedor (envío directo desde el cliente), que es gratuito, confiable y
es exactamente para lo que Web3Forms fue diseñado.

**Antes de lanzar el sitio, hay que:**

1. Crear una cuenta gratuita en <https://web3forms.com> con el correo `contacto@rijosuplidora.com`.
2. Copiar el "Access Key" que genera.
3. En Cloudflare Pages → Settings → Environment variables, agregar:
   - `VITE_WEB3FORMS_ACCESS_KEY` = *(la llave copiada)*
4. Volver a desplegar el sitio para que tome la variable.

(Para probarlo en local, esa misma variable va en el archivo `.env`, ver `.env.example`.)

---

## 5. Pendientes del lado del cliente (Rijo Suplidora)

Estos son los puntos que **no estaban disponibles en los documentos compartidos** y que se
resolvieron con una solución temporal profesional, para no bloquear el desarrollo:

- **Fotografías propias**: el formulario indica "pendiente de anexar". Se usaron fotografías de
  stock de Unsplash (uso comercial libre, sin atribución obligatoria) como marcador visual
  temporal, elegidas para representar fielmente el negocio (joyería en Larimar y Ámbar, souvenirs,
  artesanías, tienda de regalos, costa dominicana). Estas están centralizadas en
  `src/data/images.ts` — cuando lleguen las fotos reales, ese es el único archivo que hay que
  editar.
- **Horario por días**: el formulario solo especificó el horario ("7:00 AM – 7:00 PM") sin indicar
  los días. Se asumió que aplica todos los días de la semana para los datos estructurados
  (JSON-LD, usado por Google) — confirmar con la clienta si el showroom cierra algún día, para
  corregirlo en `src/lib/jsonLd.ts`.
- **Dominio**: el sitio está preparado para `www.rijosuplidora.com` (usado en el sitemap, URLs
  canónicas y datos estructurados). Falta que la clienta compre el dominio — una vez comprado, se
  conecta a Cloudflare Pages en un paso y no requiere cambios en el código.
- **Testimonios**: el formulario pedía una sección de "Testimonios/Reseñas", pero no se compartió
  ningún testimonio real de clientes. Por integridad (no se deben inventar reseñas atribuidas a
  clientes que no existen), se reemplazó esa sección por datos verificables de la propia empresa:
  años de trayectoria, posición de mercado declarada, cifra oficial de turismo (Ministerio de
  Turismo) y los sectores que atiende. Cuando la clienta tenga testimonios reales de sus clientes
  mayoristas, se pueden agregar fácilmente como una sección nueva.

---

## 6. Desplegar en Cloudflare Pages

**Opción recomendada — conectar el repositorio (despliegue automático en cada cambio):**

1. Subir este proyecto a un repositorio de GitHub/GitLab.
2. En el dashboard de Cloudflare → Workers & Pages → Create → Pages → conectar el repositorio.
3. Configurar:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Agregar la variable de entorno `VITE_WEB3FORMS_ACCESS_KEY` (sección 4).
5. Desplegar. Cloudflare le asigna una URL `*.pages.dev`; luego se conecta el dominio
   `rijosuplidora.com` en Custom domains.

**Opción alterna — CLI (`wrangler`):**

```bash
npm run build
npx wrangler pages deploy dist --project-name=rijo-suplidora
```

El archivo `wrangler.toml` ya incluido tiene la configuración base para esta opción.

### Notas de SEO ya incluidas

- `sitemap.xml` y `robots.txt` se generan automáticamente en cada build (`npm run seo:generate`,
  incluido dentro de `npm run build`).
- Cada una de las 10 páginas tiene su propio `<title>`, meta descripción, Open Graph, Twitter Card
  y etiquetas `hreflang` apuntando a su versión en el otro idioma.
- Datos estructurados (JSON-LD) tipo `Organization`, `Store`/`WholesaleStore`, `BreadcrumbList` y
  `FAQPage` en las páginas correspondientes, para habilitar resultados enriquecidos en Google.
- `public/_headers` configura caché de un año para los archivos con hash (JS/CSS/fuentes) y
  revalidación inmediata para el HTML, siguiendo las recomendaciones de rendimiento de Cloudflare
  Pages.

---

## 7. URLs del sitio

| Página | Español | English |
|---|---|---|
| Inicio | `/` | `/en` |
| Sobre Nosotros | `/nosotros` | `/en/about` |
| Productos | `/productos` | `/en/products` |
| Preguntas Frecuentes | `/preguntas-frecuentes` | `/en/faq` |
| Contacto | `/contacto` | `/en/contact` |

> El sitio no incluye páginas de Política de Privacidad ni Términos de Servicio (se retiraron a
> pedido de la clienta). El formulario de contacto solo recopila los datos que la persona
> proporciona voluntariamente para responder su consulta.