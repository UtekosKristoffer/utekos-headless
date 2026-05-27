import { TerrasseArticle } from '../articles/[slug]/5-enkle-tips-for-a-forlenge-terrassesongen'
import { BalpanneArticle } from '../articles/[slug]/balpannen-din-guide-til-den-perfekte-hostkvelden'
import { BeredskapEgenomsorgArticle } from '../articles/[slug]/beredskap-egenomsorg'
import { BobilHostruterArticle } from '../articles/[slug]/bobil-i-hostferien'
import { VintercampingArticle } from '../articles/[slug]/den-ultimate-guiden-til-komfortabel-vintercamping'
import { HvaErUtekosArticle } from '../articles/[slug]/hva-er-utekos'
import { HyttekosArticle } from '../articles/[slug]/slik-skaper-du-den-perfekte-stemningen-pa-hytten'
import { TechDownArticle } from '../articles/[slug]/utekos-techdown-lansering'
import { BatpussArticle } from '../articles/[slug]/varm-og-klar-for-batpussen'
import { VinterklargjoringArticle } from '../articles/[slug]/vinterklargjoring-av-hytta'

import type { MagazineArticle } from '../types'

export const magazineArticles = [
  {
    slug: 'beredskap-egenomsorg',
    title: 'Beredskapsuken 2025: Hvordan Utekos oppgraderer din egenberedskap',
    excerpt: 'Ditt ess i ermet for å bevare tryggheten og varmen.',
    imageUrl: 'https://utekos.no/utekos-beredskap-2.png',
    imageAlt: 'Utekos i en beredskapssituasjon med varme og trygghet i fokus',
    category: 'Tips og råd',
    publishedAt: '2025-10-30T00:00:00+01:00',
    updatedAt: '2025-10-30T00:00:00+01:00',
    Article: BeredskapEgenomsorgArticle
  },
  {
    slug: 'utekos-techdown-lansering',
    title: 'Utekos TechDown™ - Plagget som redefinerer personlig komfort',
    excerpt:
      'LANSERING: Det nye plagget som redefinerer personlig komfort. Dunlignende letthet med bekymringsfri ytelse.',
    imageUrl: 'https://utekos.no/fiberdun/patch.jpg',
    imageAlt: 'Utekos TechDown brukt i et stemningsfullt miljø',
    category: 'Tips og råd',
    publishedAt: '2025-10-27T00:00:00+01:00',
    updatedAt: '2025-10-27T00:00:00+01:00',
    Article: TechDownArticle
  },
  {
    slug: 'hva-er-utekos',
    title: 'Historien og filosofien bak Utekos: En investering i din egen hygge',
    excerpt:
      'Utekos er mer enn bare et klesmerke. Det er en filosofi, en livsstil, og en forpliktelse til å bringe komfort og glede til dine utendørsopplevelser.',
    imageUrl: 'https://utekos.no/magasinet/bat.png',
    imageAlt: 'Et stemningsfullt bilde som illustrerer Utekos-filosofien',
    category: 'Om Utekos',
    publishedAt: '2025-10-17T00:00:00+02:00',
    updatedAt: '2025-10-17T00:00:00+02:00',
    Article: HvaErUtekosArticle
  },
  {
    slug: 'balpannen-din-guide-til-den-perfekte-hostkvelden',
    title: 'Bålpannen: Din guide til den perfekte høstkvelden',
    excerpt:
      'Lær de 5 P-ene for perfekt bålkos. Vår komplette guide hjelper deg å skape en uforglemmelig og komfortabel kveld rundt bålpannen.',
    imageUrl: 'https://utekos.no/magasinet/prikken-over-ien.png',
    imageAlt: 'En varm og sosial høstkveld rundt bålpannen',
    category: 'Tips og råd',
    publishedAt: '2025-09-22T00:00:00+02:00',
    updatedAt: '2025-09-22T00:00:00+02:00',
    Article: BalpanneArticle
  },
  {
    slug: 'vinterklargjoring-av-hytta-en-sjekkliste-for-livsnyteren',
    title: 'Vinterklargjøring av hytten: En sjekkliste for livsnyteren',
    excerpt:
      'Gjør vinterstengingen til en del av kosen. Vår visuelle sjekkliste hjelper deg å klargjøre hytta for en trygg vinter og nye minner.',
    imageUrl: 'https://utekos.no/og-image-hytte-host.webp',
    imageAlt: 'En høstklar hytte som er forberedt for vinteren',
    category: 'Hytteliv',
    publishedAt: '2025-09-21T00:00:00+02:00',
    updatedAt: '2025-09-21T00:00:00+02:00',
    Article: VinterklargjoringArticle
  },
  {
    slug: '5-enkle-tips-for-a-forlenge-terrassesongen',
    title: '5 enkle tips som forlenger terrassesesongen med måneder',
    excerpt:
      'Ikke la kjølige kvelder jage deg inn. Med noen smarte grep kan du forvandle uteplassen din til en oase som varer fra tidlig vår til sen høst.',
    imageUrl: 'https://utekos.no/og-image-terrassen.webp',
    imageAlt: 'En terrasse som inviterer til bruk langt utover sommeren',
    category: 'Terrasseliv',
    publishedAt: '2025-09-20T00:00:00+02:00',
    updatedAt: '2025-09-20T00:00:00+02:00',
    Article: TerrasseArticle
  },
  {
    slug: 'slik-skaper-du-den-perfekte-stemningen-pa-hytta',
    title: 'Slik skaper du den perfekte stemningen på hytten',
    excerpt:
      'Utover peis og fyr i ovnen, hva er hemmelighetene bak ekte hyttekos? Utforsk våre beste tips for lys, lyd, tekstur og komfort.',
    imageUrl: 'https://utekos.no/og-image-hytte.webp',
    imageAlt: 'Et varmt og stemningsfullt hytteinteriør',
    category: 'Hytteliv',
    publishedAt: '2025-09-18T00:00:00+02:00',
    updatedAt: '2025-09-18T00:00:00+02:00',
    Article: HyttekosArticle
  },
  {
    slug: 'den-ultimate-guiden-til-komfortabel-vintercamping',
    title: 'Den ultimate guiden til komfortabel vintercamping',
    excerpt:
      'Vintercamping kan være magisk hvis du er godt forberedt. Vi gir deg sjekklisten du trenger for en varm og uforglemmelig tur med bobilen.',
    imageUrl: 'https://utekos.no/magasinet/vintercamp.png',
    imageAlt: 'Bobil i vinterlandskap med varmt lys fra innsiden',
    category: 'Bobilliv',
    publishedAt: '2025-09-15T00:00:00+02:00',
    updatedAt: '2025-09-15T00:00:00+02:00',
    Article: VintercampingArticle
  },
  {
    slug: 'bobil-i-hostferien-de-vakreste-rutene-for-a-oppleve-hostfargene',
    title: 'Bobil i høstferien: De vakreste rutene for å oppleve høstfargene',
    excerpt:
      'Opplev Norges spektakulære høstfarger fra første rad. Vi gir deg to forslag til uforglemmelige ruter med bobilen.',
    imageUrl: 'https://utekos.no/og-image-bobil-host.webp',
    imageAlt: 'Bobilreise gjennom norske høstfarger',
    category: 'Bobilliv',
    publishedAt: '2025-09-22T00:00:00+02:00',
    updatedAt: '2025-09-22T00:00:00+02:00',
    Article: BobilHostruterArticle
  },
  {
    slug: 'varm-og-klar-for-batpussen',
    title: 'Vårpussen av båten: Slik holder du varmen',
    excerpt:
      'Vårpussen er et sikkert vårtegn, men kan være en kald fornøyelse. Les våre tips for en mer komfortabel start på båtsesongen.',
    imageUrl: 'https://utekos.no/kate-erling-gress-vann.webp',
    imageAlt: 'Vårpuss av båt ved vannkanten',
    category: 'Båtliv',
    publishedAt: '2025-04-12T00:00:00+02:00',
    updatedAt: '2025-04-12T00:00:00+02:00',
    Article: BatpussArticle
  }
] satisfies MagazineArticle[]
