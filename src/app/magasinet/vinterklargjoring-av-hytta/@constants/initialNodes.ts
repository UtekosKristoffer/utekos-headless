import { HomeModernIcon as Roof } from '@heroicons/react/24/outline'
import { type Node } from '@xyflow/react'
import {
  Armchair,
  Droplets,
  Plug,
  Rat,
  Refrigerator,
  Shirt,
  ShowerHead,
  UserCheck
} from 'lucide-react'
export const initialNodes: Node[] = [
  // KORRIGERT: Lagt til styling for bakgrunn, farge, kant og radius
  {
    id: 'ute',
    position: { x: 0, y: 0 },
    data: { label: 'UTE' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'tak',
    position: { x: 0, y: 120 },
    data: {
      icon: Roof,
      label: 'Tak & Takrenner',
      description:
        'Rensk for løv og sjekk for skader for å unngå lekkasjer og isdannelse.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },
  {
    id: 'vannkraner',
    position: { x: 0, y: 310 },
    data: {
      icon: ShowerHead,
      label: 'Vannkraner & Slanger',
      description:
        'Steng utekranen fra innsiden og tøm alle hageslanger for vann for å unngå frostspreng.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },
  {
    id: 'mobler',
    position: { x: 0, y: 500 },
    data: {
      icon: Armchair,
      label: 'Møbler & Løsøre',
      description:
        'Sett inn eller dekk til utemøbler. Sikre alt som kan bli tatt av høst- og vinterstormene.',
      iconColor: 'text-slate-400',
      shadowColor: '#94a3b8'
    },
    type: 'custom'
  },

  {
    id: 'inne',
    position: { x: 350, y: 0 },
    data: { label: 'INNE' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'mus',
    position: { x: 350, y: 120 },
    data: {
      icon: Rat,
      label: 'Mus & Skadedyr',
      description:
        'Tett alle små åpninger og fjern mat som kan tiltrekke seg ubudne gjester.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },
  {
    id: 'kjoleskap',
    position: { x: 350, y: 310 },
    data: {
      icon: Refrigerator,
      label: 'Kjøleskap & Mat',
      description:
        'Tøm, vask ut og la døren stå på gløtt for å unngå mugg og dårlig lukt.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },
  {
    id: 'tekstiler',
    position: { x: 350, y: 500 },
    data: {
      icon: Shirt,
      label: 'Tekstiler & Verdi',
      description:
        'Pakk sengetøy og håndklær i plastkasser. Ta med verdisaker hjem.',
      iconColor: 'text-amber-500',
      shadowColor: '#f59e0b'
    },
    type: 'custom'
  },

  {
    id: 'systemer',
    position: { x: 700, y: 0 },
    data: { label: 'SYSTEMER' },
    type: 'default',
    style: {
      width: 280,
      textAlign: 'center',
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid neutral-800',
      borderRadius: '8px'
    }
  },
  {
    id: 'vann',
    position: { x: 700, y: 120 },
    data: {
      icon: Droplets,
      label: 'Vann & Avløp',
      description:
        'Hovedregelen: Alt vann må ut! Steng hovedkranen og tøm rør, tanker og vannlåser.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    },
    type: 'custom'
  },
  {
    id: 'strom',
    position: { x: 700, y: 310 },
    data: {
      icon: Plug,
      label: 'Strøm & Oppvarming',
      description:
        'Skru av alt unødvendig. Sett på en lav vedlikeholdsvarme for å holde hytta tørr.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee'
    },
    type: 'custom'
  },
  {
    id: 'personlig-komfort',
    position: { x: 700, y: 500 },
    data: {
      icon: UserCheck,
      label: 'Personlig Komfort',
      description:
        'Legg igjen en Utekos. Da har du garantert øyeblikkelig varme ved ankomst til en kald hytte.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6'
    },
    type: 'custom'
  }
]
