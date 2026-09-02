import type { TFunction } from 'i18next'

/**
 * Helper tipado para leer arreglos/objetos desde los recursos de i18next
 * (listas de valores, categorías, FAQs, etc.) con `returnObjects: true`.
 */
export function tArray<T>(t: TFunction, key: string): T[] {
  return t(key, { returnObjects: true }) as unknown as T[]
}
