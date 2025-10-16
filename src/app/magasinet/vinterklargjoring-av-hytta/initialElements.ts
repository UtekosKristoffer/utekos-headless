//Path: src/app/magasinet/vinterklargjoring-av-hytta/initialElements.ts

'use client'

import {
  Armchair,
  Droplets,
  Plug,
  Rat,
  Refrigerator,
  Shirt,
  ShowerHead,
  UserCheck,
  Building2
} from 'lucide-react'

// --- Typer og hjelpere ---
export const iconMap = {
  'roof': Building2,
  'shower-head': ShowerHead,
  'armchair': Armchair,
  'rat': Rat,
  'refrigerator': Refrigerator,
  'shirt': Shirt,
  'droplets': Droplets,
  'plug': Plug,
  'user-check': UserCheck
}
export type IconName = keyof typeof iconMap

export const initialNodes = [
  { id: 'ute', data: { label: 'UTE' }, position: { x: 360, y: 0 } },
  { id: 'inne', data: { label: 'INNE' }, position: { x: 360, y: 250 } },
  { id: 'systemer', data: { label: 'SYSTEMER' }, position: { x: 360, y: 500 } },
  {
    id: 'tak',
    data: {
      icon: 'roof' as IconName,
      label: 'Tak og takrenner',
      description: 'Rensk for løv og sjekk for skader for å unngå lekkasjer.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  {
    id: 'vannkraner',
    data: {
      icon: 'shower-head' as IconName,
      label: 'Vannkraner og slanger',
      description: 'Steng utekranen og tøm slanger for å unngå frostspreng.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  {
    id: 'mobler',
    data: {
      icon: 'armchair' as IconName,
      label: 'Møbler og løsøre',
      description:
        'Sett inn eller dekk til møbler. Sikre alt som kan tas av vinden.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    }
  },
  {
    id: 'mus',
    data: {
      icon: 'rat' as IconName,
      label: 'Mus og skadedyr',
      description: 'Tett åpninger og fjern mat som kan tiltrekke seg gjester.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  {
    id: 'kjoleskap',
    data: {
      icon: 'refrigerator' as IconName,
      label: 'Kjøleskap og mat',
      description: 'Tøm, vask ut og la døren stå på gløtt for å unngå mugg.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  {
    id: 'tekstiler',
    data: {
      icon: 'shirt' as IconName,
      label: 'Tekstiler og verdi',
      description: 'Pakk sengetøy i plastkasser. Ta med verdisaker hjem.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    }
  },
  {
    id: 'vann',
    data: {
      icon: 'droplets' as IconName,
      label: 'Vann og avløp',
      description:
        'Alt vann må ut! Steng hovedkranen og tøm alle rør og tanker.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    }
  },
  {
    id: 'strom',
    data: {
      icon: 'plug' as IconName,
      label: 'Strøm og oppvarming',
      description: 'Skru av alt unødvendig. Sett på lav vedlikeholdsvarme.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    }
  },
  {
    id: 'personlig-komfort',
    data: {
      icon: 'user-check' as IconName,
      label: 'Personlig komfort',
      description: 'Legg igjen en Utekos for umiddelbar varme ved ankomst.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6'
    }
  }
]

export const categories = {
  UTE: ['tak', 'vannkraner', 'mobler'],
  INNE: ['mus', 'kjoleskap', 'tekstiler'],
  SYSTEMER: ['vann', 'strom', 'personlig-komfort']
}
