import { Shield, Wind, Flame, type LucideIcon } from 'lucide-react'

export interface AnatomyLayerData {
  id: number
  layerLabel: string
  title: string
  subtitle: string
  description: string
  highlight: string
  icon: LucideIcon
  colors: {
    text: string
    subText: string
    icon: string
    border: string
    shadow: string
    bgGradient: string
  }
}

export const ANATOMY_LAYERS: AnatomyLayerData[] = [
  {
    id: 1,
    layerLabel: 'LAYER 01',
    title: 'HydroGuard™',
    subtitle: '8000mm Shell',
    description:
      'Dette er ikke bare stoff. Det er et skjold. HydroGuard™ 8K stopper regnet momentant, mens ripstop-vevingen tåler grener, svaberg og hundeklør.',
    highlight: 'HydroGuard™ 8K',
    icon: Shield,
    colors: {
      text: 'text-white',
      subText: 'text-slate-400',
      icon: 'text-sky-400',
      border: 'border-sky-400/20',
      shadow: 'rgba(56, 189, 248, 0.2)',
      bgGradient: 'bg-gradient-to-br from-slate-800 to-slate-950'
    }
  },
  {
    id: 2,
    layerLabel: 'LAYER 02',
    title: 'WindBarrier™',
    subtitle: 'Active Membrane',
    description:
      'Mellomlaget jobber hardest. Det slipper ut fuktigheten fra kroppen din, men stenger den iskalde vinden ute. Full balanse, null klamhet.',
    highlight: 'Intelligent Pusteevne',
    icon: Wind,
    colors: {
      text: 'text-slate-200',
      subText: 'text-slate-400',
      icon: 'text-sky-200',
      border: 'border-sky-200/20',
      shadow: 'rgba(186, 230, 253, 0.2)',
      bgGradient: 'bg-slate-800'
    }
  },
  {
    id: 3,
    layerLabel: 'LAYER 03',
    title: 'SherpaCore™',
    subtitle: 'Thermal Insulation',
    description:
      'Innerst mot huden ligger SherpaCore™. Det føles som myk ull, men tørker på minutter og isolerer selv om du nettopp kom opp av isvannet.',
    highlight: 'SherpaCore™',
    icon: Flame,
    colors: {
      text: 'text-amber-500',
      subText: 'text-amber-800/80',
      icon: 'text-amber-500',
      border: 'border-amber-500/20',
      shadow: 'rgba(245, 158, 11, 0.4)',
      bgGradient: 'bg-[#1e1b16]'
    }
  }
]

export const VARIANT_IDS = {
  S: 'gid://shopify/ProductVariant/43959919051000',
  M: 'gid://shopify/ProductVariant/43959919083768',
  L: 'gid://shopify/ProductVariant/43959919116536',
  STAPPER: 'gid://shopify/ProductVariant/42903954292984'
}
