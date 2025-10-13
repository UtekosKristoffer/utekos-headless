// Path: src/app/handlehjelp/sammenlign-modeller/config.ts

export const comparisonData = [
  {
    feature: 'Varme (tørt vær)',
    icon: 'thermometer', // Endret fra komponent til streng
    dun: 'Uovertruffen',
    mikrofiber: 'Meget god',
    techdawn: 'Utmerket',
    iconColor: 'text-orange-400'
  },
  {
    feature: 'Varme (fuktig vær)',
    icon: 'droplets', // Endret fra komponent til streng
    dun: 'God',
    mikrofiber: 'Overlegen',
    techdawn: 'Overlegen',
    iconColor: 'text-cyan-400'
  },
  {
    feature: 'Vekt',
    icon: 'feather', // Endret fra komponent til streng
    dun: 'Ekstra lett (~1000g)',
    mikrofiber: 'Ultralett (~800g)',
    techdawn: 'Robust (~1300g)',
    iconColor: 'text-violet-400'
  },
  {
    feature: 'Vedlikehold',
    icon: 'washing-machine', // Endret fra komponent til streng
    dun: 'Krever skånsom vask',
    mikrofiber: 'Svært enkel (Maskinvask)',
    techdawn: 'Svært enkel (Maskinvask)',
    iconColor: 'text-emerald-400'
  },
  {
    feature: 'Isolert hette',
    icon: 'check', // Endret fra komponent til streng
    dun: true,
    mikrofiber: true,
    techdawn: true,
    iconColor: 'text-muted-foreground'
  },
  {
    feature: 'Fleece-lommer',
    icon: 'check', // Endret fra komponent til streng
    dun: true,
    mikrofiber: true,
    techdawn: true,
    iconColor: 'text-muted-foreground'
  }
]
