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
    title: 'Vår varmeste og mest allsidige',
    description:
      'Optimalisert etter erfaringer og tilbakemeldinger. Gir maksimal komfort og bevegelsesfrihet. Perfekt for hytteliv, bobil og all utekos.',
    href: '/produkter/utekos-techdown' as Route,
    imageUrl: '/fiberdun.webp',
    linkColor: 'text-sky-800'
  },
  {
    title: 'For den ultimate varmen',
    description:
      'Vårt bestselgende isolasjonsplagg, fylt med kvalitetsdun for funksjonell varme på de kaldeste dagene.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/utekos-blue.webp',
    linkColor: 'text-sky-800'
  },
  {
    title: 'For allsidig, daglig bruk',
    description:
      'Din lette og pålitelige følgesvenn for alt fra bynære turer til kjølige kvelder på terrassen. Enkel, funksjonell og alltid klar.',
    href: '/produkter/utekos-mikrofiber' as Route,
    imageUrl: '/black_back_without95.webp',
    linkColor: 'text-sky-800'
  },
  {
    title: 'For beskyttelse mot elementene',
    description:
      'Vanntett, vindtett og fôret med myk plysj. Holder deg garantert varm og tørr etter isbadet eller på en fuktig dag på campingen.',
    href: '/produkter/comfyrobe' as Route,
    imageUrl: '/comfyrobe/Jakke_Navy_1.png',
    linkColor: 'text-sky-800' // Endret farge for bedre distinksjon
  },
  {
    title: 'Tilbehøret som fullfører kosen',
    description:
      'Små detaljer, stor forskjell. Pakk smart med våre kompresjonsposer.',
    href: '/produkter/utekos-stapper' as Route,
    imageUrl: '/kompresjonsbag.webp',
    linkColor: 'text-sky-800' // Endret farge for bedre distinksjon
  }
]
