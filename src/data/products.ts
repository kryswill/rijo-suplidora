import {
  Gem,
  Gift,
  Landmark,
  Sparkles,
  Shirt,
  Waves,
  Briefcase,
  Watch,
  Scissors,
  Package,
  Stamp,
  Star,
  Warehouse,
  Truck,
  Users,
  ShieldCheck,
  Handshake,
  Compass,
  type LucideIcon,
} from 'lucide-react'
import type { ImageKey } from './images'

// El orden debe coincidir 1:1 con `products.categories.items` en los archivos de traducción.
export const productCategoryIcons: LucideIcon[] = [
  Gem,
  Gift,
  Landmark,
  Sparkles,
  Shirt,
  Waves,
  Briefcase,
  Watch,
  Scissors,
  Package,
  Stamp,
  Star,
]

// Fotos de stock (banco temporal, ver `images.ts`) representativas de cada categoría.
// El orden debe coincidir 1:1 con `products.categories.items` y con `productCategoryIcons`.
export const productCategoryImages: ImageKey[] = [
  'necklaces', // Joyería y Bisutería (Larimar y Ámbar)
  'artisanCrafts', // Souvenirs y Artesanías
  'culturalSouvenirs', // Productos Culturales
  'colorCeramics', // Artículos Decorativos
  'strawHatsDisplay', // Ropa, Bolsos y Sombreros
  'poolInflatables', // Inflables
  'corporateGiftBoxes', // Regalos Corporativos
  'accessoriesFlatlay', // Accesorios
  'foldedTextiles', // Textiles
  'packagedGourmetShelf', // Productos Gastronómicos Empacados
  'personalizedKeychains', // Artículos Personalizados
  'giftDisplay', // Productos de Temporada y Líneas Exclusivas
]

// El orden debe coincidir 1:1 con `home.valueProps.items`.
export const valuePropIcons: LucideIcon[] = [
  Package,
  Sparkles,
  Warehouse,
  Truck,
  Users,
  Gem,
  ShieldCheck,
  Handshake,
  Star,
  Compass,
]