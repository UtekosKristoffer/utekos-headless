// Path: src/app/handlehjelp/vask-og-vedlikehold/constants/index.ts
import type { FAQ } from '../types'

export const PRODUCT_CARE_FAQS: FAQ[] = [
  {
    question: 'Hvor ofte bør jeg vaske Utekos-plagget mitt?',
    answer:
      'Vask sjeldnere enn du tror. Lufting mellom hver bruk er som regel nok. Vask når plagget faktisk er skittent – hyppig vask sliter mer på fibrene enn vanlig bruk.'
  },
  {
    question: 'Kan jeg bruke vanlig vaskemiddel på Utekos Dun?',
    answer:
      'Bruk helst et mildt vaskemiddel uten optisk hvitt, eller et eget dun-vaskemiddel. Vanlige vaskemidler kan tørke ut dunets naturlige fettlag og redusere isolasjonsevnen over tid.'
  },
  {
    question: 'Hva gjør jeg hvis vann ikke lenger preller av ytterstoffet?',
    answer:
      'DWR-behandlingen kan friskes opp. Vask plagget rent, tørk det helt, og påfør en impregneringsspray jevnt over ytterstoffet. Varm aktivering i tørketrommel på lav varme låser behandlingen.'
  },
  {
    question: 'Kan dunet klumpe seg under vask?',
    answer:
      'Ja, hvis plagget ikke tørkes ordentlig. Bruk tørketrommel på lav varme med tørkeballer, og avbryt syklusen for å riste ut klumper underveis. Plagget skal være helt gjennomtørt før det legges bort.'
  },
  {
    question: 'Hvordan oppbevarer jeg plagget mellom sesonger?',
    answer:
      'Heng plagget på en stødig henger i et tørt og luftig skap. Unngå kompresjonsposer og plastomslag over lengre tid – dunet trenger luft for å bevare spensten.'
  }
]

export const MICROFIBER_DO_ITEMS = [
  'Vask på skånsomt program, maks 30 °C',
  'Bruk mildt vaskemiddel',
  'Heng til lufttørk på stødig henger',
  'Lukk glidelåser før vask'
] as const

export const MICROFIBER_DONT_ITEMS = [
  'Blekemidler og tøymykner',
  'Kjemisk rens og stryking',
  'Tørketrommel',
  'Direkte sollys over lang tid'
] as const

export const DOWN_DO_ITEMS = [
  'Vask på skånsomt program, maks 30 °C',
  'Bruk mildt vaskemiddel – gjerne et eget dun-vaskemiddel',
  'Lukk glidelåser og fest borrelås før vask',
  'Vreng plagget for å skåne ytterstoffet'
] as const

export const DOWN_DONT_ITEMS = [
  'Blekemidler og tøymykner',
  'Kjemisk rens (dry clean)',
  'Stryking direkte på ytterstoffet',
  'Komprimert oppbevaring over tid'
] as const
