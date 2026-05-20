import localFont from 'next/font/local'

import { Geist_Mono as GeistMono } from 'next/font/google'

export const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: false,
  display: 'swap'
})

export const brandSansFontFamily = localFont({
  src: [
    {
      path: './fonts/google-sans-latin.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/google-sans-latin.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/google-sans-latin.woff2',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-google-sans',
  preload: false,
  display: 'swap'
})
