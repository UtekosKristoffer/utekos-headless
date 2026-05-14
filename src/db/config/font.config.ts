import {
  Geist,
  Geist_Mono as GeistMono,
  Google_Sans as GoogleSans
} from 'next/font/google'

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap'
})

export const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap'
})

export const brandSansFontFamily = GoogleSans({
  variable: '--font-brand-sans',
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
})
