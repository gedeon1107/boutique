'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const STORAGE_KEY = 'abr-age-verified'

export function AgeGate() {
  const [show, setShow] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verified = sessionStorage.getItem(STORAGE_KEY)
    if (verified !== 'true') setShow(true)
  }, [])

  function handleConfirm() {
    sessionStorage.setItem(STORAGE_KEY, 'true')
    setShow(false)
  }

  function handleDeny() {
    router.push('/acces-refuse')
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950/95 backdrop-blur-sm animate-fade-in"
    >
      <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-10 shadow-xl text-center animate-slide-up">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Anne Boissons Royale"
          width={160}
          height={160}
          priority
          className="rounded-xl"
        />

        {/* Title */}
        <div className="space-y-2">
          <h1
            id="age-gate-title"
            className="font-display text-2xl font-bold text-gold-500"
          >
            Bienvenue
          </h1>
          <p className="text-lg font-semibold text-neutral-100">
            Avez-vous 18 ans ou plus ?
          </p>
          <p className="text-sm text-neutral-400">
            Ce site contient de l'alcool. Vous devez avoir au moins 18 ans pour y accéder.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-lg bg-gold-500 px-6 py-3.5 font-semibold text-neutral-950 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 active:bg-gold-600"
          >
            Oui, j'ai 18 ans ou plus
          </button>
          <button
            onClick={handleDeny}
            className="w-full rounded-lg border border-neutral-700 bg-transparent px-6 py-3.5 text-sm text-neutral-400 transition-colors hover:border-neutral-500 hover:text-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-500"
          >
            Non, j'ai moins de 18 ans
          </button>
        </div>

        <p className="text-xs text-neutral-600">
          En entrant, vous confirmez avoir l'âge légal pour consommer de l'alcool dans votre pays.
        </p>
      </div>
    </div>
  )
}
