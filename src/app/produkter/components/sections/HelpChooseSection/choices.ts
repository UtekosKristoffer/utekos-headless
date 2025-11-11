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
    title: 'Vår varmeste og mest allsidige modell',
    description:
      'Optimalisert etter erfaringer og tilbakemeldinger. Gir maksimal komfort og bevegelsesfrihet. Perfekt for hytteliv, bobil og all utekos.',
    href: '/produkter/utekos-techdown' as Route,
    imageUrl: '/fiberdun.webp',
    linkColor: 'text-sky-800'
  },
  {
    title: 'For den ultimate varmen',
    description:
      'Vårt varmeste isolasjonsplagg, fylt med premium dun for maksimal varme på de kaldeste dagene.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/utekos-blue.webp',
    linkColor: 'text-rose-400'
  },
  {
    title: 'For allsidig, daglig bruk',
    description:
      'Din lette og pålitelige følgesvenn for alt fra bynære turer til kjølige kvelder på terrassen. Enkel, funksjonell og alltid klar.',
    href: '/produkter/utekos-mikrofiber' as Route,
    imageUrl: '/black_back_without95.webp',
    linkColor: 'text-emerald-400'
  },
  {
    title: 'For beskyttelse mot elementene',
    description:
      'Vanntett, vindtett og fôret med myk plysj. Holder deg garantert varm og tørr etter isbadet eller på en fuktig dag på campingen.',
    href: '/produkter/comfyrobe' as Route,
    imageUrl: '/comfyrobe/Jakke_Navy_1.png',
    linkColor: 'text-amber-400' // Endret farge for bedre distinksjon
  },
  {
    title: 'Tilbehøret som fullfører kosen',
    description:
      'Små detaljer, stor forskjell. Hold varmen med våre buffer, og pakk smart med våre kompresjonsposer.',
    href: '/produkter/utekos-buff' as Route,
    imageUrl: '/og-image-buff.webp',
    linkColor: 'text-slate-400' // Endret farge for bedre distinksjon
  }
]
