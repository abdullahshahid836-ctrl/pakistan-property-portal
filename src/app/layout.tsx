import { Syne, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
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

export const metadata = {
  title: 'Pakistan Property Portal — Buy, Sell & Rent Properties',
  description: "Pakistan's trusted real estate portal. Find 50,000+ verified properties for sale and rent across Lahore, Karachi, Islamabad and 25+ cities.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16 bg-[#F5F0E8]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
