// Banco temporal de fotografías de stock (Unsplash License — uso comercial libre, sin atribución
// obligatoria) mientras la clienta entrega su propia fotografía profesional y logo.
// Reemplazar cada entrada por la imagen real del negocio cuando esté disponible.

export type StockImage = {
  id: string
  credit: string
  altEs: string
  altEn: string
}

function unsplash(id: string, w: number, q = 80) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`
}

export const IMAGES = {
  heroCoastline: {
    id: 'photo-1692017827893-f97d95397b49',
    credit: 'Victor Rosario / Unsplash',
    altEs: 'Costa tropical de aguas turquesa bordeada de palmeras, República Dominicana',
    altEn: 'Turquoise tropical coastline lined with palm trees, Dominican Republic',
  },
  larimarStone: {
    id: 'photo-1752253830425-c7cb6d3e97b4',
    credit: 'Mr. Pugo / Unsplash',
    altEs: 'Piedra de Larimar azul, gema exclusiva de República Dominicana',
    altEn: 'Blue Larimar stone, a gemstone exclusive to the Dominican Republic',
  },
  amberStone: {
    id: 'photo-1780432036901-a3a3e64c5a31',
    credit: 'Mr. Pugo / Unsplash',
    altEs: 'Piedras de Ámbar pulidas en tonos naranja y miel',
    altEn: 'Polished Amber stones in orange and honey tones',
  },
  giftShopInterior: {
    id: 'photo-1783260821886-5950e10f88f2',
    credit: 'Max Firsov / Unsplash',
    altEs: 'Interior acogedor de tienda de regalos con artículos artesanales',
    altEn: 'Cozy gift shop interior with handmade goods',
  },
  artisanCrafts: {
    id: 'photo-1744255823523-63aa2468a093',
    credit: 'an thet / Unsplash',
    altEs: 'Sombreros y cestas artesanales tejidas a mano',
    altEn: 'Handwoven artisan hats and baskets',
  },
  colorCeramics: {
    id: 'photo-1776218643294-9f0f1475b654',
    credit: 'jason hu / Unsplash',
    altEs: 'Colección de cerámica artesanal colorida',
    altEn: 'Collection of colorful artisan ceramics',
  },
  necklaces: {
    id: 'photo-1621264682184-bb49fb5f82a1',
    credit: 'Juliet Frías / Unsplash',
    altEs: 'Collar artesanal de cuentas sobre tela blanca',
    altEn: 'Handcrafted beaded necklace on white fabric',
  },
  giftDisplay: {
    id: 'photo-1767302866263-a6e374299781',
    credit: 'Eunkwang Choi / Unsplash',
    altEs: 'Cerámica y artesanías exhibidas en la entrada de una tienda',
    altEn: 'Pottery and crafts displayed at a shop entrance',
  },
} as const

export type ImageKey = keyof typeof IMAGES

export function src(key: ImageKey, w: number, q?: number) {
  return unsplash(IMAGES[key].id, w, q)
}

export function srcSet(key: ImageKey, widths: number[]) {
  return widths.map((w) => `${unsplash(IMAGES[key].id, w)} ${w}w`).join(', ')
}