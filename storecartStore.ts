'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, Product } from '@/lib/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity: number, isWholesale: boolean) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  subtotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem(product, quantity, isWholesale) {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.is_wholesale === isWholesale
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.is_wholesale === isWholesale
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity, is_wholesale: isWholesale }] }
        })
      },

      removeItem(productId) {
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        }))
      },

      updateQuantity(productId, quantity) {
        if (quantity < 1) {
          get().removeItem(productId)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }))
      },

      clearCart() {
        set({ items: [] })
      },

      totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      subtotal() {
        return get().items.reduce((sum, i) => {
          const price =
            i.is_wholesale && i.product.price_wholesale != null
              ? i.product.price_wholesale
              : i.product.price_retail
          return sum + price * i.quantity
        }, 0)
      },
    }),
    {
      name: 'abr-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
