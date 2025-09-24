import type { Route } from 'next'
interface ProductChoice {
  title: string
  description: string
  href: Route
  imageUrl: string
  linkColor: string
}
export const choices: ProductChoice[] = [
  {
    title: 'For den ultimate varmen',
    description:
      'Vårt varmeste alternativ, perfekt for de kaldeste dagene på hytten eller i fjellet.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/og-image-hytte-host.webp',
    linkColor: 'text-rose-400'
  },
  {
    title: 'For allsidig, daglig bruk',
    description:
      'Lett, praktisk og perfekt for bobillivet, båten og de kjølige sommerkveldene.',
    href: '/produkter/utekos-mikrofiber' as Route,
    imageUrl: '/og-image-bobil-host.webp',
    linkColor: 'text-cyan-400'
  },
  {
    title: 'Tilbehøret som fullfører kosen',
    description:
      'Små detaljer, stor forskjell. Hold varmen fra topp til tå med våre luer og buffer.',
    href: '/produkter' as Route,
    imageUrl: '/og-image-buff.webp',
    linkColor: 'text-emerald-400'
  }
]
