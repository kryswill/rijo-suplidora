import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { ProductCategoryChip } from './ProductCategoryChip'
import { Reveal, RevealGroup } from './Reveal'
import { productCategoryIcons } from '../../data/products'
import catalogCollagePhoto from '../../assets/photos/catalogo-productos-rijo-suplidora.jpg'
import { tArray } from '../../lib/i18nHelpers'

type Item = { title: string; body: string }

/**
 * Bloque "imagen del catálogo centrada + las 12 categorías flotando alrededor". Se usa tanto en
 * la sección Categorías de Productos (fondo claro) como en la sección Portafolio del Inicio
 * (fondo oscuro, `dark`) — se centralizó acá, en vez de repetir el layout en ambas páginas, para
 * que las dos compartan exactamente el mismo comportamiento responsive y para que un ajuste
 * futuro (el color del borde, la proporción de columnas, etc.) se aplique una sola vez.
 *
 * Layout desktop (lg+): la imagen (vertical, 2:3) queda centrada como ancla visual y las 12
 * categorías "flotan" en dos columnas a los lados, con un leve zigzag vertical (mt-6 alternado)
 * para reforzar esa sensación de flotación en vez de una grilla rígida. Se usa `lg:items-start`
 * para que la imagen quede alineada por arriba con la primera tarjeta de cada columna lateral.
 * Como una columna CSS Grid no puede reordenar sus propios hijos en dos sub-columnas
 * independientes sin quebrar la altura compartida con la imagen central, las categorías se
 * renderizan dos veces (una vez para las columnas laterales de escritorio, oculta en pantallas
 * chicas; otra en una grilla simple de 2 columnas para móvil/tablet, oculta en escritorio) — el
 * mismo patrón responsive que usan los menús mobile/desktop: en cualquier ancho solo una versión
 * es visible y la otra tiene `display:none`, así que no afecta accesibilidad ni SEO.
 */
export function CatalogShowcase({ dark = false }: { dark?: boolean }) {
  const { t } = useTranslation()
  const categories = tArray<Item>(t, 'products.categories.items')

  return (
    <>
      <div className="relative mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(0,1.3fr)_1fr] lg:items-start lg:gap-6">
        <RevealGroup className="hidden lg:grid lg:auto-rows-min lg:gap-5" stagger={0.06}>
          {categories.slice(0, 6).map((item, i) => (
            <ProductCategoryChip
              key={item.title}
              icon={productCategoryIcons[i]}
              title={item.title}
              body={item.body}
              accent={i % 2 === 0 ? 'larimar' : 'amber'}
              dark={dark}
              className={i % 2 === 1 ? 'lg:mt-6' : undefined}
            />
          ))}
        </RevealGroup>

        <Reveal direction="scale" className="order-first lg:order-none">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-amber-400">
            <img
              src={catalogCollagePhoto}
              alt={t('products.categories.imageAlt')}
              loading="lazy"
              className="aspect-[2/3] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-larimar-950/10" />
          </div>
          <div className="mx-auto mt-5 max-w-sm text-center">
            <span
              className={clsx(
                'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest',
                dark ? 'bg-white/10 text-amber-300 ring-1 ring-white/20 backdrop-blur' : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
              )}
            >
              {t('products.categories.imageBadge')}
            </span>
            <p className={clsx('mt-3 text-sm', dark ? 'text-white/70' : 'text-larimar-700/75')}>{t('products.categories.imageCaption')}</p>
          </div>
        </Reveal>

        <RevealGroup className="hidden lg:grid lg:auto-rows-min lg:gap-5" stagger={0.06}>
          {categories.slice(6, 12).map((item, i) => (
            <ProductCategoryChip
              key={item.title}
              icon={productCategoryIcons[i + 6]}
              title={item.title}
              body={item.body}
              accent={(i + 6) % 2 === 0 ? 'larimar' : 'amber'}
              dark={dark}
              className={i % 2 === 0 ? 'lg:mt-6' : undefined}
            />
          ))}
        </RevealGroup>
      </div>

      <RevealGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden" stagger={0.05}>
        {categories.map((item, i) => (
          <ProductCategoryChip
            key={item.title}
            icon={productCategoryIcons[i]}
            title={item.title}
            body={item.body}
            accent={i % 2 === 0 ? 'larimar' : 'amber'}
            dark={dark}
          />
        ))}
      </RevealGroup>
    </>
  )
}