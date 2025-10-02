import {
  Check,
  Droplets,
  Feather,
  Thermometer,
  WashingMachine
} from 'lucide-react'

export const comparisonData = [
  {
    feature: 'Varme (tørt vær)',
    icon: Thermometer,
    dun: 'Uovertruffen',
    mikrofiber: 'Meget god',
    fiberdun: 'Utmerket',
    iconColor: 'text-orange-400'
  },
  {
    feature: 'Varme (fuktig vær)',
    icon: Droplets,
    dun: 'God',
    mikrofiber: 'Overlegen',
    fiberdun: 'Overlegen',
    iconColor: 'text-cyan-400'
  },
  {
    feature: 'Vekt',
    icon: Feather,
    dun: 'Ekstra lett (~1000g)',
    mikrofiber: 'Ultralett (~800g)',
    fiberdun: 'Robust (~1300g)',
    iconColor: 'text-violet-400'
  },
  {
    feature: 'Vedlikehold',
    icon: WashingMachine,
    dun: 'Krever skånsom vask',
    mikrofiber: 'Svært enkel (Maskinvask)',
    fiberdun: 'Svært enkel (Maskinvask)',
    iconColor: 'text-emerald-400'
  },
  {
    feature: 'Isolert hette',
    icon: Check,
    dun: true,
    mikrofiber: true,
    fiberdun: true,
    iconColor: 'text-muted-foreground'
  },
  {
    feature: 'Fleece-lommer',
    icon: Check,
    dun: true,
    mikrofiber: true,
    fiberdun: true,
    iconColor: 'text-muted-foreground'
  }
]
