import { useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react'
import { Button } from './Button'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const { t, i18n } = useTranslation()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ACCESS_KEY) {
      // eslint-disable-next-line no-console
      console.error(
        'Falta configurar VITE_WEB3FORMS_ACCESS_KEY. Crea una cuenta gratuita en https://web3forms.com y agrega la llave en tu archivo .env',
      )
      setStatus('error')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    // Honeypot anti-spam: si un bot completa este campo oculto, se descarta el envío.
    if (formData.get('botcheck')) {
      setStatus('success')
      form.reset()
      return
    }

    setStatus('sending')

    const payload = {
      access_key: ACCESS_KEY,
      subject: 'Nueva consulta desde el sitio web — Rijo Suplidora',
      from_name: 'Rijo Suplidora — Formulario de contacto',
      language: i18n.language,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t('contact.form.name')} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={t('contact.form.namePlaceholder') ?? ''}
            className={inputClass}
          />
        </Field>
        <Field label={t('contact.form.email')} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('contact.form.emailPlaceholder') ?? ''}
            className={inputClass}
          />
        </Field>
        <Field label={t('contact.form.phone')} htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={t('contact.form.phonePlaceholder') ?? ''}
            className={inputClass}
          />
        </Field>
        <Field label={t('contact.form.company')} htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            placeholder={t('contact.form.companyPlaceholder') ?? ''}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={t('contact.form.message')} htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('contact.form.messagePlaceholder') ?? ''}
          className={inputClass}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div aria-live="polite" className="order-2 sm:order-1 sm:flex-1">
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-xl bg-larimar-50 px-4 py-3 text-sm text-larimar-800"
            >
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-larimar-600" />
              {t('contact.form.success')}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800"
            >
              <TriangleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />
              {t('contact.form.error')}
            </motion.p>
          )}
        </div>

        <Button type="submit" disabled={status === 'sending'} className="order-1 w-full sm:order-2 sm:w-auto sm:shrink-0">
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> {t('contact.form.sending')}
            </>
          ) : (
            <>
              <Send size={18} /> {t('contact.form.submit')}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

const inputClass =
  'w-full rounded-xl border border-larimar-100 bg-larimar-50/40 px-4 py-3 text-sm text-larimar-950 placeholder:text-larimar-400 outline-none transition-colors focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100'

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-larimar-800">
        {label}
      </label>
      {children}
    </div>
  )
}