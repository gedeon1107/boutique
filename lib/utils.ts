import type { ProductCategory } from './types'

/**
 * Format a price in FCFA (no decimal places, thousands separator).
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Slugify a string to a URL-safe identifier.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Return a placeholder image URL for a product category.
 */
export function categoryPlaceholder(category: ProductCategory): string {
  const map: Record<ProductCategory, string> = {
    'whisky':               '/placeholders/whisky.jpg',
    'bieres-cannettes':     '/placeholders/biere.jpg',
    'champagnes-aperitifs': '/placeholders/champagne.jpg',
    'rhums':                '/placeholders/rhum.jpg',
    'spiritueux':           '/placeholders/spiritueux.jpg',
    'eaux':                 '/placeholders/eau.jpg',
    'vins':                 '/placeholders/vin.jpg',
  }
  return map[category] ?? '/placeholders/default.jpg'
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Truncate a string to maxLength characters, appending '…'.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}
