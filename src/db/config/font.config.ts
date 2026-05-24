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

/**
 * Utekos Text — the brand body typeface (per AGENTS.md).
 * Regular (400) and Medium (500) are the only published cuts.
 * Used for supporting & body copy; headlines stay on Google Sans Bold.
 */
export const utekosText = localFont({
  src: [
    {
      path: './fonts/utekos-text-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/utekos-text-medium.woff2',
      weight: '500',
      style: 'normal'
    }
  ],
  variable: '--font-utekos-textd',
  preload: false,
  display: 'swap'
})
