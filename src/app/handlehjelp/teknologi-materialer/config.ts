// Path: src/app/handlehjelp/teknologi-materialer/config.ts

export const technologies = [
  // --- Utekos TechDawn™ ---
  {
    icon: 'gem',
    title: 'Luméa™ – Premium Ytterstoff',
    iconColor: 'text-sky-400',
    content:
      'Vårt mest eksklusive og slitesterke nylonstoff, utviklet spesielt for TechDawn™. Luméa™ har en elegant, matt finish som føles myk, samtidig som den lette og pustende konstruksjonen tåler røff bruk. Det er selve definisjonen på teknisk eleganse.',
    products: ['Utekos TechDawn™']
  },
  {
    icon: 'cloud',
    title: 'CloudWeave™ – Innovativ Isolasjon',
    iconColor: 'text-sky-400',
    content:
      'Kjernen i TechDawn™. En avansert, syntetisk isolasjon som etterligner den lette, luftige og luksuriøse følelsen av dun. Den store fordelen er at den, i motsetning til dun, beholder sin fulle isolasjonsevne selv om den blir fuktig.',
    products: ['Utekos TechDawn™']
  },

  // --- Utekos Dun™ ---
  {
    icon: 'thermometer',
    title: 'Fillpower 650 Andedun – Uovertruffen Varme',
    iconColor: 'text-orange-400',
    content:
      'Kjernen i vår varmeste modell. Fillpower måler spensten og isolasjonsevnen i dun. 650 regnes som premium kvalitet, og gir en perfekt balanse mellom enestående varme og lav vekt, noe som skaper den unike, omsluttende følelsen av ekte dun.',
    products: ['Utekos Dun™']
  },
  {
    icon: 'shield',
    title: 'Slitesterk DWR Nylon – Robust Beskyttelse',
    iconColor: 'text-orange-400',
    content:
      'Et lett, men robust ytterstoff med en DWR-behandling (Durable Water Repellent). Dette gjør at stoffet tåler lett regn og snø, og gir et ekstra lag med trygghet rundt bålpannen takket være flammehemmende egenskaper.',
    products: ['Utekos Dun™']
  },

  // --- Utekos Mikrofiber™ ---
  {
    icon: 'feather',
    title: 'Hurtigtørkende Mikrofiber – Lett og Praktisk',
    iconColor: 'text-cyan-400',
    content:
      'En lett, slitesterk og praktisk syntetisk isolasjon. Fibrene fanger effektivt luft for å gi god varme, og har den store fordelen at de tørker svært raskt. Ideelt for allsidig bruk i det skiftende norske klimaet.',
    products: ['Utekos Mikrofiber™']
  },
  {
    icon: 'shirt',
    title: 'Nylon Taffeta – Komfort på Innsiden',
    iconColor: 'text-violet-400',
    content:
      'Innerstoffet er avgjørende for den totale komfortopplevelsen. Vi bruker Nylon Taffeta i alle våre modeller fordi det er glatt, lett og føles behagelig mot huden. Det glir lett over andre kleslag og sørger for minimal friksjon når du beveger deg.',
    products: ['Utekos Dun™', 'Utekos Mikrofiber™', 'Utekos TechDawn™']
  }
] as const
