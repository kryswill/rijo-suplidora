import { useTranslation } from 'react-i18next'
import { Head } from 'vite-react-ssg'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { Blobs } from '../components/ui/Blobs'
import { ButtonLink } from '../components/ui/Button'
import { localePath, type Locale } from '../lib/routes'

export function NotFound({ locale }: { locale: Locale }) {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('notFound.seo.title')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-larimar-950">
        <Blobs variant="amber" />
        <Container className="relative text-center">
          <Reveal>
            <p className="font-display text-7xl font-semibold text-amber-400 sm:text-8xl">{t('notFound.title')}</p>
            <h1 className="font-display mt-4 text-2xl font-semibold text-white sm:text-3xl">{t('notFound.subtitle')}</h1>
            <p className="mt-3 text-white/60">{t('notFound.body')}</p>
            <ButtonLink to={localePath(locale, 'home')} variant="amber" className="mt-8">
              {t('common.backHome')}
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
