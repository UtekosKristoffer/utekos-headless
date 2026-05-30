import localFont from 'next/font/local'
import { Geist } from 'next/font/google'

export const utekosText = localFont({
  src: '../../app/fonts/UtekosText-Regular.woff',
  weight: '400',
  style: 'normal',
  variable: '--font-utekos-text',
  fallback: ['var(--geist-sans)', 'sans-serif', 'system-ui', 'Helvetica']
})
export const utekosTextMedium = localFont({
  src: '../../app/fonts/UtekosText-Medium.woff2',
  weight: '500',
  style: 'normal',
  variable: '--font-utekos-text-medium',
  fallback: ['var(--geist-sans)', 'sans-serif', 'system-ui', 'Helvetica']
})

export const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700'],
  fallback: ['var(--geist-sans)', 'sans-serif', 'system-ui', 'Helvetica']
})
