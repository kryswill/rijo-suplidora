import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Products } from './pages/Products'
import { Faq } from './pages/Faq'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'
import { paths } from './lib/routes'

// Cada rama (es/en) reutiliza el mismo Layout, pero cada página recibe su
// propio `locale` de forma estática — así el pre-renderizado (SSG) genera
// contenido 100% traducido para cada URL, sin depender de detección en cliente.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      // Español (idioma por defecto, sin prefijo)
      { index: true, Component: () => <Home locale="es" /> },
      { path: paths.es.about.slice(1), Component: () => <About locale="es" /> },
      { path: paths.es.products.slice(1), Component: () => <Products locale="es" /> },
      { path: paths.es.faq.slice(1), Component: () => <Faq locale="es" /> },
      { path: paths.es.contact.slice(1), Component: () => <Contact locale="es" /> },

      // English (/en)
      { path: 'en', Component: () => <Home locale="en" /> },
      { path: paths.en.about.slice(1), Component: () => <About locale="en" /> },
      { path: paths.en.products.slice(1), Component: () => <Products locale="en" /> },
      { path: paths.en.faq.slice(1), Component: () => <Faq locale="en" /> },
      { path: paths.en.contact.slice(1), Component: () => <Contact locale="en" /> },

      // 404 — se compila como /404.html (Cloudflare Pages lo sirve automáticamente
      // para cualquier ruta no encontrada).
      { path: '404', Component: () => <NotFound locale="es" /> },
      { path: '*', Component: () => <NotFound locale="es" /> },
    ],
  },
]