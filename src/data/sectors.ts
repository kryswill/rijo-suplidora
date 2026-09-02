import {
  Store,
  BedDouble,
  Plane,
  Anchor,
  Landmark,
  Castle,
  ShoppingBasket,
  FerrisWheel,
  ShoppingBag,
  Briefcase,
  Compass,
  ShoppingCart,
  Zap,
  Sparkles,
  Award,
  Leaf,
  Handshake,
  type LucideIcon,
} from 'lucide-react'

// El orden debe coincidir 1:1 con `home.sectors.list`.
export const sectorIcons: LucideIcon[] = [
  Store,
  BedDouble,
  Plane,
  Anchor,
  Landmark,
  Castle,
  ShoppingBasket,
  FerrisWheel,
  ShoppingBag,
  Briefcase,
  Compass,
  ShoppingCart,
]

// El orden debe coincidir 1:1 con `home.pillars.items`.
export const pillarIcons: LucideIcon[] = [Zap, Sparkles, Award, Handshake, Leaf]
