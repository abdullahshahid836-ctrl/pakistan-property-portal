import { Syne, Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

const inter = Inter({
  subsets: ['latin'],
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
      <body className="font-inter">
        <Navbar />
        <main className="min-h-screen pt-16 bg-bg-primary">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
