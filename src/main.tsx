import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App'
import './i18n'
import './styles/index.css'

export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
