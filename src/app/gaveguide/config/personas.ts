import type { Route } from 'next'
interface Persona {
  title: string
  description: string
  href: Route
  imageUrl: string
}

export const personas: Persona[] = [
  {
    title: 'Til Hytteeieren',
    description:
      'For de som verdsetter peiskos, men drømmer om å ta med varmen ut på terrassen for å se stjernene.',
    href: '/produkter/utekos-dun' as Route, // <--- Her er endringen
    imageUrl: '/og-image-hytte-host.webp'
  },
  {
    title: 'Til Bobilisten',
    description:
      'Den perfekte følgesvennen for kjølige morgener på en ny, spennende destinasjon. Utvider campingsesongen.',
    href: '/produkter/utekos-mikrofiber' as Route, // <--- Her er endringen
    imageUrl: '/og-image-bobil-host.webp'
  },
  {
    title: 'Til Båteieren',
    description:
      'For de sene kveldene for anker, eller når en uventet bris gjør seg gjeldende på dekk. En favoritt i gjestehavna.',
    href: '/produkter/utekos-dun' as Route, // <--- Her er endringen
    imageUrl: '/og-image-batliv.webp'
  },
  {
    title: 'Til den som har alt',
    description:
      'Gi en gave de garantert ikke har, men som de umiddelbart vil elske. Gaven av ren, kompromissløs komfort.',
    href: '/produkter' as Route, // <--- Her er endringen
    imageUrl: '/og-image-terrassen.webp'
  }
]
