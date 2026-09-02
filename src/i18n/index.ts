import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'
import { DEFAULT_LOCALE } from '../lib/routes'

// Recursos cargados de forma síncrona (sin backend HTTP): imprescindible para que
// el pre-renderizado (SSG) genere el HTML final ya traducido en cada idioma.
void i18next.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
})

export default i18next
