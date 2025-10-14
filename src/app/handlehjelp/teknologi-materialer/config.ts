// Path: src/app/handlehjelp/teknologi-materialer/config.ts

// Vi definerer typen for en enkelt teknologi
export type Technology = {
  readonly icon: string
  readonly title: string
  readonly iconColor: string
  readonly content: string
  readonly products: readonly string[]
}

// Vi definerer en ny type for en gruppe teknologier
export type TechnologyGroup = {
  readonly groupTitle: string
  readonly technologies: readonly Technology[]
}

// Vi bygger dataen basert på den nye gruppestrukturen
export const technologyGroups: readonly TechnologyGroup[] = [
  {
    groupTitle: 'Utekos TechDawn™',
    technologies: [
      {
        icon: 'gem',
        title: 'Luméa™ – Premium ytterstoff',
        iconColor: 'text-sky-400',
        content:
          'Vårt mest eksklusive og slitesterke nylonstoff, utviklet spesielt for TechDawn™. Luméa™ har en elegant, matt finish som føles myk, samtidig som den lette og pustende konstruksjonen tåler røff bruk. Det er selve definisjonen på teknisk eleganse.',
        products: ['Utekos TechDawn™']
      },
      {
        icon: 'cloud',
        title: 'CloudWeave™ – Innovativ isolasjon',
        iconColor: 'text-sky-400',
        content:
          'Kjernen i TechDawn™. En avansert, syntetisk isolasjon som etterligner den lette, luftige og luksuriøse følelsen av dun. Den store fordelen er at den, i motsetning til dun, beholder sin fulle isolasjonsevne selv om den blir fuktig.',
        products: ['Utekos TechDawn™']
      }
    ]
  },
  {
    groupTitle: 'Utekos Dun™',
    technologies: [
      {
        icon: 'thermometer',
        title: 'Fillpower 650 Andedun – Uovertruffen varme',
        iconColor: 'text-orange-400',
        content:
          'Kjernen i vår varmeste modell. Fillpower måler spensten og isolasjonsevnen i dun. 650 regnes som premium kvalitet, og gir en perfekt balanse mellom enestående varme og lav vekt, noe som skaper den unike, omsluttende følelsen av ekte dun.',
        products: ['Utekos Dun™']
      },
      {
        icon: 'shield',
        title: 'Slitesterk DWR Nylon – Robust beskyttelse',
        iconColor: 'text-orange-400',
        content:
          'Et lett, men robust ytterstoff med en DWR-behandling (Durable Water Repellent). Dette gjør at stoffet tåler lett regn og snø, og gir et ekstra lag med trygghet rundt bålpannen takket være flammehemmende egenskaper.',
        products: ['Utekos Dun™']
      }
    ]
  },
  {
    groupTitle: 'Utekos Mikrofiber™',
    technologies: [
      {
        icon: 'feather',
        title: 'Hurtigtørkende Mikrofiber – Lett og praktisk',
        iconColor: 'text-cyan-400',
        content:
          'En lett, slitesterk og praktisk syntetisk isolasjon. Fibrene fanger effektivt luft for å gi god varme, og har den store fordelen at de tørker svært raskt. Ideelt for allsidig bruk i det skiftende norske klimaet.',
        products: ['Utekos Mikrofiber™']
      }
    ]
  },
  {
    groupTitle: 'Felles for alle modeller',
    technologies: [
      {
        icon: 'layers',
        title: 'Nylon Taffeta – Komfort på Innsiden',
        iconColor: 'text-violet-400',
        content:
          'Innerstoffet er avgjørende for den totale komfortopplevelsen. Vi bruker Nylon Taffeta i alle våre modeller fordi det er glatt, lett og føles behagelig mot huden. Det glir lett over andre kleslag og sørger for minimal friksjon når du beveger deg.',
        products: ['Utekos Dun™', 'Utekos Mikrofiber™', 'Utekos TechDawn™']
      }
    ]
  }
]
