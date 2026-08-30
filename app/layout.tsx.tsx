import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { AgeGate } from '@/components/age-gate/AgeGate'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Chatbot } from '@/components/chatbot/Chatbot'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://anneboissonsroyale.bj'),
  title: {
    default: 'Anne Boissons Royale — Vente de boissons à Cotonou, Bénin',
    template: '%s | Anne Boissons Royale',
  },
  description:
    'Achetez vos boissons en ligne à Cotonou : whisky, bières, champagnes, rhums, vins et eaux. Vente au détail et en gros. Livraison à Cotonou, Calavi et Porto-Novo. Paiement à la livraison.',
  keywords: [
    'achat boissons Cotonou',
    'whisky Bénin',
    'vente rhum en gros Bénin',
    'livraison boissons Cotonou Calavi Porto-Novo',
    'champagne Bénin',
    'bière Cotonou',
    'spiritueux Bénin',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_BJ',
    url: 'https://anneboissonsroyale.bj',
    siteName: 'Anne Boissons Royale',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-neutral-950 text-neutral-200 antialiased">
        <AgeGate />
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1c1c1f',
              color: '#d0d0d8',
              border: '1px solid #2a2a2e',
            },
            success: { iconTheme: { primary: '#c9a84c', secondary: '#111113' } },
          }}
        />
      </body>
    </html>
  )
}
