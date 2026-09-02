import { Outlet, useLocation } from 'react-router-dom'
import i18n from '../../i18n'
import { resolveCurrentPage } from '../../lib/routes'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { ScrollToTop } from './ScrollToTop'

/**
 * Layout raíz: sincroniza el idioma activo de i18next con el prefijo de la URL
 * ANTES de renderizar el resto del árbol (necesario para que el pre-renderizado /
 * SSG genere el HTML ya traducido en cada idioma, no solo en el cliente).
 *
 * Se llama directamente en el cuerpo del componente (no en un efecto): con los
 * recursos ya precargados, `changeLanguage` actualiza el idioma de forma
 * síncrona, y debe ocurrir tanto en el servidor (SSG) como en el cliente.
 */
export function Layout() {
  const location = useLocation()
  const { locale } = resolveCurrentPage(location.pathname)

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />
      <Header locale={locale} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer locale={locale} />
      <WhatsAppButton />
    </div>
  )
}