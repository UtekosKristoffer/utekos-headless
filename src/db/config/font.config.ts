import localFont from 'next/font/local'

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
  variable: '--font-utekos-text',
  preload: true,
  display: 'swap'
})
