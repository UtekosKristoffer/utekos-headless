import { Inter } from 'next/font/google'
import './globals.css'

// Initialiser Inter-fonten for latinske tegnsett
const inter = Inter({ subsets: ['latin'] })

// Metadata forblir det samme
export const metadata = {
  title: 'Utekos Headless',
  description: 'Bygget med Next.js og Shopify',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        * Vi bruker className fra 'inter'-objektet for å automatisk
        * sette fonten for hele applikasjonen.
      */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}