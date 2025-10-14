interface ProductMetadata {
  showActivity?: boolean
  baseViewers?: number
}

export const productMetadata: Record<string, ProductMetadata> = {
  // Bestselgere får høy base
  'utekos-dun': { showActivity: true, baseViewers: 7 },
  'utekos-mikrofiber': { showActivity: true, baseViewers: 6 },
  'utekos-techdawn': { showActivity: true, baseViewers: 9 },

  // Populære produkter får medium base
  'comfyrobe': { showActivity: true, baseViewers: 5 },

  // Kampanjeproduktet får litt lavere base, siden knappheten er hovedpoenget
  'utekos-special-edition': { showActivity: true, baseViewers: 3 },

  // Tilbehør får ikke sanntidsvisning
  'utekos-buff': { showActivity: true, baseViewers: 2 },
  'kompresjonsbag': { showActivity: true, baseViewers: 1 }
}
