export type Review = {
  id: number
  name: string
  location?: string
  role?: string
  title?: string
  quote: string
  rating: number
}

export const reviews: Review[] = [
  {
    id: 1,
    name: 'Marit, 62',
    location: 'Hemsedal',
    role: 'Hytteeier',
    title: 'Nå er det jeg som sitter lengst',
    quote:
      'Takk til dere. Nå er det jeg som vil sitte lengst ute om kveldene, og terrassen blir brukt mye mer enn før. Umulig å ikke elske dette produktet.',
    rating: 5
  },
  {
    id: 2,
    name: 'Elisabeth, 47',
    location: 'Tjøme',
    role: 'Livsnyter',
    title: 'Nytt yndlingsplagg',
    quote:
      'Genialt! Når man lærer seg å utnytte det eksisterende potensialet, så oppleves mulighetene nesten endeløse. Dette er mitt nye yndlingsplagg.',
    rating: 5
  },
  {
    id: 3,
    name: 'Knut-Egil, 58',
    location: 'Viken',
    role: 'Bobileier',
    title: 'Uvurderlig på bobilferie',
    quote:
      'Det beste kjøpet jeg gjorde i fjor. Å ha dette alternativet på bobilferie er faktisk uvurderlig. Anbefales på det varmeste!',
    rating: 5
  },
  {
    id: 4,
    name: 'Berit, 64',
    location: 'Narvik',
    title: 'Varm og fornøyd',
    quote: 'Veldig bra',
    rating: 4
  },
  {
    id: 5,
    name: 'Therese, 49',
    location: 'Narvik',
    title: 'Veldig komfortabel',
    quote:
      'Jeg har ikke prøvd den utendørs enda, men jeg kan nesten ikke vente! Veldig komfortabel å ha på og god passform.',
    rating: 5
  },
  {
    id: 6,
    name: 'Richard, 61',
    location: 'Narvik',
    title: 'Glad kone',
    quote: 'Kona ble kjempefornøyd.',
    rating: 4
  },
  {
    id: 7,
    name: 'Bente, 68',
    location: 'Lillehammer',
    title: 'Kjempegod service',
    quote:
      'Tusen takk for hurtig svar og kjempegod service. Veldig fornøyd med både produktet og opplevelsen.',
    rating: 5
  },
  {
    id: 8,
    name: 'Heidi',
    title: 'Utesesongen starter tidligere',
    quote:
      'Veldig fin passform og kvalitet! Blir deilig å ha ute på hytta og gjør at utesesongen på terrassen kan starte enda tidligere. Blir nok kjøpt inn noen flere.',
    rating: 5
  },
  {
    id: 9,
    name: 'Knut Arne',
    title: 'Varm fra hode til tå',
    quote:
      'Etter en hyggelig prat med kundeservice fikk vi tilpasset Utekosen perfekt. Varm og god, samtidig som den er veldig lett og heldekkende med hette. Holder deg varm fra hode til tå.',
    rating: 5
  },
  {
    id: 10,
    name: 'Mathias',
    title: 'Helt genialt',
    quote:
      'Helt genialt å dra frem i veldig mange situasjoner. Raskt og problemfritt, akkurat som lovet. Anbefales på det sterkeste!',
    rating: 5
  },
  {
    id: 11,
    name: 'Karin',
    title: 'Veldig fornøyd',
    quote:
      'Enkelt å bestille, rask levering og flott produkt. Veldig fornøyd med hele kjøpsopplevelsen.',
    rating: 5
  },
  {
    id: 12,
    name: 'Synnøve',
    title: 'Super passform',
    quote:
      'Super utekosdress. Helt fin passform og fulgte med dunkåpen jeg bestilte.',
    rating: 5
  }
]
