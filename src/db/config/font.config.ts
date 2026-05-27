import localFont from 'next/font/local'

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
  preload: false,
  display: 'swap'
})
