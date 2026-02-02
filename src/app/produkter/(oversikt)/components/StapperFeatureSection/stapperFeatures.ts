import { iconMap, type IconName } from './iconMap'
import { IconRenderer } from './IconRenderer'

export const stapperFeatures: {
  icon: IconName
  title: string
  description: string
  colorClasses: string
}[] = [
  {
    icon: 'minimize-2',
    title: 'Maksimal plassbesparelse',
    description:
      'Reduserer volumet på klær og soveposer med over 50 %, og frigjør verdifull plass i bagasjen.',
    colorClasses: 'text-sky-400 border-sky-400/20 bg-sky-900/20'
  },
  {
    icon: 'feather',
    title: 'Ultralett design',
    description:
      'Veier kun ca. 100 gram. Du reduserer volum uten å legge til merkbart med vekt i oppakningen.',
    colorClasses: 'text-slate-300 border-slate-300/20 bg-slate-700/20'
  },
  {
    icon: 'shield-check',
    title: 'Slitesterkt materiale',
    description:
      'Laget for å tåle røff behandling på tur. Stram hardt og pakk tett, år etter år.',
    colorClasses: 'text-teal-400 border-teal-400/20 bg-teal-900/20'
  },
  {
    icon: 'settings-2',
    title: 'Enkel og jevn kompresjon',
    description:
      'Fire justerbare strammestropper lar deg enkelt komprimere innholdet jevnt og effektivt.',
    colorClasses: 'text-amber-400 border-amber-400/20 bg-amber-900/20'
  }
]
