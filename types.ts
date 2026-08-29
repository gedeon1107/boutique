export type ProductCategory =
  | 'whisky'
  | 'bieres-cannettes'
  | 'champagnes-aperitifs'
  | 'rhums'
  | 'spiritueux'
  | 'eaux'
  | 'vins'

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: ProductCategory
  image_url: string | null
  images: string[]
  price_retail: number
  price_wholesale: number | null
  min_wholesale_qty: number | null
  stock: number
  active: boolean
  created_at: string
