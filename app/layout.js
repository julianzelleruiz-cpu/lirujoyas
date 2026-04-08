import { Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Liru Joyas',
  description: 'Handcrafted fine jewellery · Barcelona, España',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={playfair.variable}>{children}</body>
    </html>
  )
}