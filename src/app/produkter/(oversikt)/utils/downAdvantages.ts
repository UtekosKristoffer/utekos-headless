import type { IconName } from './iconMap'

export const downAdvantages: {
  icon: IconName
  title: string
  description: string
  color: string
}[] = [
  {
    icon: 'thermometer-sun',
    title: 'Uslåelig varme-til-vekt',
    description: 'Gir maksimal varme med minimal vekt og pakkvolum.',
    color: 'text-orange-400'
  },
  {
    icon: 'mountain',
    title: 'Ekstrem komprimerbarhet',
    description:
      'Kan pakkes ned til en utrolig liten størrelse i tørre forhold.',
    color: 'text-slate-300'
  },
  {
    icon: 'award',
    title: 'Luksuriøs følelse',
    description: 'Den lette, luftige og naturlige følelsen av premium dun.',
    color: 'text-purple-300'
  }
]
