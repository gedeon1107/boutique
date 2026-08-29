export type ProductCategory =
  | 'whisky'
  | 'bieres-cannettes'
  | 'champagnes-aperitifs'
  | 'rhums'
  | 'spiritueux'
  | 'eaux'
  | 'vins'

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'whisky':              'Whisky',
  'bieres-cannettes':    'Bières & Cannettes',
  'champagnes-aperitifs':'Champagnes & Apéritifs',
  'rhums':               'Rhums',
  'spiritueux':          'Spiritueux',
  'eaux':                'Eaux en bouteille',
  'vins':                'Vins',
}

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
}

export type DeliveryZoneType = 'local' | 'expedition'

export interface DeliveryZone {
  id: string
  name: string
  cities: string[]
  zone_type: DeliveryZoneType
  fee: number
  free_above: number | null
  message: string | null
}

export type OrderStatus =
  | 'en_attente'
  | 'en_cours_livraison'
  | 'livree'
  | 'annulee'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  en_attente:          'En attente',
  en_cours_livraison:  'En cours de livraison',
  livree:              'Livrée',
  annulee:             'Annulée',
}

export interface OrderItem {
  product_id: string
  product_name: string
  product_image: string | null
  quantity: number
  unit_price: number
  is_wholesale: boolean
}

export interface Order {
  id: string
  created_at: string
  customer_name: string
  customer_phone: string
  customer_city: string
  customer_address: string
  delivery_zone_id: string
  delivery_zone_name: string
  delivery_fee: number
  items: OrderItem[]
  subtotal: number
  total: number
  status: OrderStatus
  notes: string | null
}

export interface CartItem {
  product: Product
  quantity: number
  is_wholesale: boolean
}
