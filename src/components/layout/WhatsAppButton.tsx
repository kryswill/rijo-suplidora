import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../../data/site'

export function WhatsAppButton() {
  const { t } = useTranslation()

  return (
    <a
      href={whatsappLink(t('whatsapp.defaultMessage'))}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsapp.floatingLabel')}
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-300 hover:scale-110 sm:bottom-8 sm:right-8"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/60" />
      <MessageCircle size={28} fill="white" className="text-[#25D366]" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-larimar-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {t('whatsapp.floatingLabel')}
      </span>
    </a>
  )
}
