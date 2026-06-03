import localFont from 'next/font/local'

export const utekosText = localFont({
  src: '../../app/fonts/UtekosTextRegular.woff2',
  weight: '400',
  style: 'normal',
  display: 'optional',
  variable: '--font-utekos-text',
  preload: false,
  fallback: ['sans-serif', 'system-ui', 'Helvetica']
})
export const utekosTextMedium = localFont({
  src: '../../app/fonts/UtekosTextMedium.woff2',
  weight: '500',
  display: 'optional',
  style: 'normal',
  variable: '--font-utekos-text-medium',
  preload: false,
  fallback: ['sans-serif', 'system-ui', 'Helvetica']
})

export const utekosTitle = localFont({
  src: '../../app/fonts/UtekosTextTitle.woff2',
  weight: '500',
  display: 'optional',
  style: 'normal',
  variable: '--font-utekos-title',
  preload: false,
  fallback: ['sans-serif', 'system-ui', 'Helvetica']
})
