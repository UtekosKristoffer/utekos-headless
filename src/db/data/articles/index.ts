// Src/db/data/articles.ts

export interface Article {
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  category: string
  date: string
}
export const mockArticles: Article[] = [
  {
    slug: 'utekos-techdawn-lansering',
    title: 'Utekos TechDawn™ - Plagget som redefinerer personlig komfort.',
    excerpt:
      'LANSERING: Det nye plagget som redefinerer personlig komfort. Dunlignende letthet med bekymringsfri ytelse.',
    imageUrl: '/fiberdun/patch.jpg',
    category: 'Tips og råd',
    date: '14. oktober 2025'
  },
  {
    slug: 'hva-er-utekos',
    title:
      'Historien og filosofien bak Utekos: En investering i din egen hygge',
    excerpt:
      'Utekos er mer enn bare et klesmerke. Det er en filosofi, en livsstil, og en forpliktelse til å bringe komfort og glede til dine utendørsopplevelser.',
    imageUrl: '/magasinet/bat.png',
    category: 'Om Utekos',
    date: '17. oktober 2025'
  },
  {
    slug: 'balpannen-din-guide-til-den-perfekte-hostkvelden',
    title: 'Bålpannen: Din guide til den perfekte høstkvelden',
    excerpt:
      'Lær de 5 P-ene for perfekt bålkos. Vår komplette guide hjelper deg å skape en uforglemmelig og komfortabel kveld rundt bålpannen.',
    imageUrl: '/magasinet/prikken-over-ien.png',
    category: 'Tips og råd',
    date: '22. september 2025'
  },
  {
    slug: 'vinterklargjoring-av-hytta-en-sjekkliste-for-livsnyteren',
    title: 'Vinterklargjøring av hytten: En sjekkliste for livsnyteren',
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
    title: 'Slik skaper du den perfekte stemningen på hytten',
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
    imageUrl: '/magasinet/vintercamp.png',
    category: 'Bobilliv',
    date: '15. september 2025'
  },
  {
    slug: 'bobil-i-hostferien-de-vakreste-rutene-for-a-oppleve-hostfargene',
    title: 'Bobil i høstferien: De vakreste rutene for å oppleve høstfargene',
    excerpt:
      'Opplev Norges spektakulære høstfarger fra første rad. Vi gir deg to forslag til uforglemmelige ruter med bobilen.',
    imageUrl: '/og-image-bobil-host.webp',
    category: 'Bobilliv',
    date: '22. september 2025'
  },
  {
    slug: 'varm-og-klar-for-batpussen',
    title: 'Vårpussen av båten: Slik holder du varmen',
    excerpt:
      'Vårpussen er et sikkert vårtegn, men kan være en kald fornøyelse. Les våre tips for en mer komfortabel start på båtsesongen.',
    imageUrl: '/kate-erling-gress-vann.webp',
    category: 'Båtliv',
    date: '12. april 2025'
  }
]

/**
 * Konverterer en norsk datostreng (f.eks. "22. september 2025")
 * til et standard ISO 8601 format (f.eks. "2025-09-22T00:00:00.000Z").
 * @param dateString Den norske datostrengen.
 * @returns En ISO-formatert dato-streng.
 */
function parseNorwegianDate(dateString: string): string {
  const monthMap: { [key: string]: number } = {
    januar: 0,
    februar: 1,
    mars: 2,
    april: 3,
    mai: 4,
    juni: 5,
    juli: 6,
    august: 7,
    september: 8,
    oktober: 9,
    november: 10,
    desember: 11
  }

  const parts = dateString.replace('.', '').split(' ')

  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    console.warn(
      `Ugyldig datoformat funnet: "${dateString}". Bruker dagens dato som fallback.`
    )
    return new Date().toISOString()
  }
  const day = parseInt(parts[0], 10)
  const monthName = parts[1].toLowerCase()
  const month = monthMap[monthName]
  const year = parseInt(parts[2], 10)

  if (!isNaN(day) && month !== undefined && !isNaN(year)) {
    return new Date(Date.UTC(year, month, day)).toISOString()
  }

  // Returnerer dagens dato som en siste fallback hvis parsing feiler
  console.warn(
    `Klarte ikke å parse dato: "${dateString}". Bruker dagens dato som fallback.`
  )
  return new Date().toISOString()
}

/**
 * EKSPORTERT HOVEDFUNKSJON:
 * Henter og formaterer alle publiserte magasinartikler.
 * Dette er den ENESTE funksjonen sitemap.ts trenger å importere.
 */
export async function getMagazineArticles(): Promise<
  { slug: string; updatedAt: string; imageUrl: string }[]
> {
  return mockArticles.map(article => ({
    slug: article.slug,
    updatedAt: parseNorwegianDate(article.date),
    imageUrl: article.imageUrl
  }))
}
