interface ProductMetadata {
  showActivity?: boolean
  baseViewers?: number
}

export const productMetadata: Record<string, ProductMetadata> = {
  'utekos-dun': { showActivity: true, baseViewers: 7 },
  'utekos-mikrofiber': { showActivity: true, baseViewers: 6 },
  'utekos-techdawn': { showActivity: true, baseViewers: 9 },
  'comfyrobe': { showActivity: true, baseViewers: 5 },
  'utekos-special-edition': { showActivity: true, baseViewers: 5 },

  // Tilbehør får ikke sanntidsvisning
  'utekos-buff': { showActivity: true, baseViewers: 2 },
  'kompresjonsbag': { showActivity: true, baseViewers: 2 }
}
