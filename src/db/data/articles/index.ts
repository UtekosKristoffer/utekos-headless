// Src/lib/data/articles.ts

export interface Article {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  date: string
}

// All artikkeldata bor nå her
export const mockArticles: Article[] = [
  {
    slug: 'balpannen-din-guide-til-den-perfekte-hostkvelden',
    title: 'Bålpannen: Din guide til den perfekte høstkvelden',
    excerpt:
      'Lær de 5 P-ene for perfekt bålkos. Vår komplette guide hjelper deg å skape en uforglemmelig og komfortabel kveld rundt bålpannen.',
    imageUrl: '/og-image-balpanne.webp',
    category: 'Tips & Råd',
    date: '22. september 2025'
  },
  {
    slug: 'vinterklargjoring-av-hytta-en-sjekkliste-for-livsnyteren',
    title: 'Vinterklargjøring av hytta: En sjekkliste for livsnyteren',
    excerpt:
      'Gjør vinterstengingen til en del av kosen. Vår visuelle sjekkliste hjelper deg å klargjøre hytta for en trygg vinter og nye minner.',
    imageUrl: '/og-image-hytte-host.webp',
    category: 'Hytteliv',
    date: '21. september 2025'
  },
  {
    slug: '5-enkle-tips-for-a-forlenge-terrassesongen',
    title: '5 enkle tips som forlenger terrassesesongen med måneder',
    excerpt:
      'Ikke la kjølige kvelder jage deg inn. Med noen smarte grep kan du forvandle uteplassen din til en oase som varer fra tidlig vår til sen høst.',
    imageUrl: '/og-image-terrassen.webp',
    category: 'Terrasseliv',
    date: '20. september 2025'
  },
  {
    slug: 'slik-skaper-du-den-perfekte-stemningen-pa-hytta',
    title: 'Slik skaper du den perfekte stemningen på hytta',
    excerpt:
      'Utover peis og fyr i ovnen, hva er hemmelighetene bak ekte hyttekos? Utforsk våre beste tips for lys, lyd, tekstur og komfort.',
    imageUrl: '/og-image-hytte.webp',
    category: 'Hytteliv',
    date: '18. september 2025'
  },
  {
    slug: 'den-ultimate-guiden-til-komfortabel-vintercamping',
    title: 'Den ultimate guiden til komfortabel vintercamping',
    excerpt:
      'Vintercamping kan være magisk hvis du er godt forberedt. Vi gir deg sjekklisten du trenger for en varm og uforglemmelig tur med bobilen.',
    imageUrl: '/og-image-bobil.webp',
    category: 'Bobilliv',
    date: '15. september 2025'
  },
  {
    slug: 'varm-og-klar-for-batpussen',
    title: 'Vårpussen av båten: Slik holder du varmen',
    excerpt:
      'Vårpussen er et sikkert vårtegn, men kan være en kald fornøyelse. Les våre tips for en mer komfortabel start på båtsesongen.',
    imageUrl: '/og-image-batliv.webp',
    category: 'Båtliv',
    date: '12. april 2025'
  }
]
