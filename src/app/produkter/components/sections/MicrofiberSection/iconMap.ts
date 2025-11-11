import {
  CloudDrizzle,
  Feather,
  Sparkles,
  ThermometerSun,
  Mountain,
  WashingMachine,
  Award,
  type LucideProps
} from 'lucide-react'

export type IconName = keyof typeof iconMap
export const iconMap = {
  'cloud-drizzle': CloudDrizzle,
  'washing-machine': WashingMachine,
  'feather': Feather,
  'thermometer-sun': ThermometerSun,
  'mountain': Mountain,
  'award': Award
}
