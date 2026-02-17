import type { Feature } from './components/FeatureCard'

export const newProductFeatures: Feature[] = [
  {
    icon: 'cloud-rain',
    title: 'Allværsisolasjon',
    description:
      'Holder deg garantert varm, selv i fuktig og uforutsigbart vær.',
    glowColor: '#0ea5e9'
  },
  {
    icon: 'feather',
    title: 'Dunfølelse uten dun',
    description: 'Luksuriøs, lett og luftig komfort uten animalske materialer.',
    glowColor: '#06b6d4'
  },
  {
    icon: 'shield-check',
    title: 'Skapt for å brukes',
    description: 'Et robust og lettstelt plagg for ekte, hverdagslig utekos.',
    glowColor: '#0891b2'
  },
  {
    icon: 'gift', // Nytt ikon for gaven
    title: 'Gratis Utekos Buff™',
    description: 'Få med vår allsidige buff på kjøpet (verdi 249,-).',
    glowColor: '#f59e0b' // En varm farge for å skille seg ut
  }
]
