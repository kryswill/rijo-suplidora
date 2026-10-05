import { Link } from 'react-router-dom'
import clsx from 'clsx'
import type { Locale } from '../../lib/routes'
import { localePath } from '../../lib/routes'
import logoHorizontal from '../../assets/brand/logo-horizontal-recortado.png'

/**
 * `dark` = el logo se muestra sobre un fondo oscuro o una foto (header transparente
 * sobre el hero, footer). El isotipo trae el texto "Rijo Suplidora" en tinta oscura,
 * así que en esos casos se envuelve en una placa clara para mantenerlo legible.
 *
 * Imagen: `logo-horizontal-recortado.png` es el logo original recortado a su contenido
 * (el original trae ~21 % de transparencia arriba/abajo y ~8 % a los lados). Así la altura
 * de la imagen es la altura real del dibujo y el padding de la placa es el único margen.
 *
 * Layout estable: la placa SIEMPRE ocupa su espacio (px-2.5 py-1.5); lo único que cambia
 * entre estados es el color de fondo y la sombra. Si el padding existiera solo con `dark`,
 * el logo se ensancharía 20 px al cruzar el scroll y, por el `justify-between` del header,
 * el menú se movería ~10 px (el "salto"). El `-ml-2.5` compensa ese padding a la izquierda
 * para que el dibujo del logo quede alineado con el contenido de la página en ambos estados.
 *
 * Tamaño: en sm+ el logo mide h-9 (36 px) y con el padding de la placa (py-1.5 = 12 px en
 * total) la placa ocupa ~48 px dentro del header de h-20 (80 px). Para agrandar el logo
 * hay holgura de sobra: se puede subir la clase sin tocar la altura del header.
 */
export function Logo({ locale, dark }: { locale: Locale; dark?: boolean }) {
  return (
    <Link
      to={localePath(locale, 'home')}
      className={clsx(
        '-ml-2.5 inline-flex shrink-0 items-center rounded-lg px-2.5 py-1.5',
        'transition-[background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none',
        dark ? 'bg-white/95 shadow-sm' : 'bg-white/0 shadow-none',
      )}
      aria-label="Rijo Suplidora"
    >
      <img src={logoHorizontal} alt="Rijo Suplidora" width={640} height={185} className="h-7 w-auto sm:h-9" />
    </Link>
  )
}