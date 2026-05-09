'use client'

import { Syne, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-[#F5F0E8] overflow-x-hidden text-rendering-optimizeLegibility`}>
        <Navbar />
        <main
          className="min-h-screen transition-opacity duration-500 ease-in-out"
          style={{ contain: 'content' }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
