'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { CATEGORY_LABELS } from '@/lib/types'
import type { ProductCategory } from '@/lib/types'

const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? 'border-neutral-800 bg-neutral-950/95 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Anne Boissons Royale"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="hidden font-display text-lg font-bold text-gold-500 sm:block">
            Anne Boissons Royale
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-gold-500"
          >
            Accueil
          </Link>

          {/* Boutique dropdown */}
          <div className="relative">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              onBlur={() => setTimeout(() => setShopOpen(false), 150)}
              className="flex items-center gap-1 text-sm font-medium text-neutral-300 transition-colors hover:text-gold-500"
              aria-expanded={shopOpen}
              aria-haspopup="true"
            >
              Boutique
              <ChevronDown
                size={14}
                className={`transition-transform ${shopOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-neutral-800 bg-neutral-900 py-2 shadow-lg animate-slide-up">
                <Link
                  href="/boutique"
                  className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-gold-500"
                  onClick={() => setShopOpen(false)}
                >
                  Tous les produits
                </Link>
                <div className="my-1 border-t border-neutral-800" />
                {categories.map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/boutique/${key}`}
                    className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-gold-500"
                    onClick={() => setShopOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/a-propos"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-gold-500"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-neutral-300 transition-colors hover:text-gold-500"
          >
            Contact
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            href="/panier"
            aria-label={`Panier — ${totalItems} article${totalItems !== 1 ? 's' : ''}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-gold-500"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-neutral-950">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
  
