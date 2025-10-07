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
      'Vårt varmeste isolasjonsplagg, fylt med premium dun for maksimal varme på de kaldeste dagene.',
    href: '/produkter/utekos-dun' as Route,
    imageUrl: '/utekos-blue.webp',
    linkColor: 'text-rose-400'
  },
  {
    title: 'For uforutsigbart vær',
    description:
      'En robust og lettstelt favoritt som isolerer selv i fuktig vær. Perfekt for båt, bobil og et aktivt uteliv.',
    href: '/produkter/utekos-techdun' as Route,
    imageUrl: '/fiberdun.webp',
    linkColor: 'text-cyan-400'
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
    imageUrl: '/comfyrobe.webp',
    linkColor: 'text-amber-400' // Endret farge for bedre distinksjon
  },
  {
    title: 'Tilbehøret som fullfører kosen',
    description:
      'Små detaljer, stor forskjell. Hold varmen med våre buffer, og pakk smart med våre kompresjonsposer.',
    href: '/produkter' as Route,
    imageUrl: '/og-image-buff.webp',
    linkColor: 'text-slate-400' // Endret farge for bedre distinksjon
  }
]
