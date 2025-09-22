import { iconMap } from './@constants/iconMap'
export interface HyttekosElement {
  icon: keyof typeof iconMap // Typen er nå en av nøklene i iconMap
  title: string
  description: string
  color: string
  iconColor: string
}
