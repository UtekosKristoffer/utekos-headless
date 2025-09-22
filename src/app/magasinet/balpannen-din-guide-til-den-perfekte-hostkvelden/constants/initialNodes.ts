import { Position, type Node } from '@xyflow/react'
import {
  ListChecks,
  MapPin,
  ShoppingBasket,
  Sparkles,
  UserCheck
} from 'lucide-react'

export const initialNodes: Node[] = [
  {
    id: 'center',
    // KORRIGERT: Justert y-posisjon for å passe den nye, høyere layouten
    position: { x: 50, y: 380 },
    data: { label: 'De 5 P-ene for Perfekt Bålkos' },
    type: 'default',
    className: '!border-neutral-700',
    style: {
      background: 'oklch(var(--sidebar-foreground))',
      color: 'oklch(var(--foreground))',
      border: '1px solid white',
      width: 220,
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      borderRadius: '8px',
      padding: '12px'
    }
  },
  {
    id: 'plassering',
    // KORRIGERT: Startpunkt flyttet mot venstre
    position: { x: 350, y: 0 },
    data: {
      icon: MapPin,
      label: '1. Plassering',
      description:
        'Velg et trygt underlag, god avstand til bygninger, og tenk på hvor vinden kommer fra.',
      iconColor: 'text-green-400',
      shadowColor: '#4ade80',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'preparasjoner',
    // KORRIGERT: Økt y-avstand for å unngå overlapping
    position: { x: 400, y: 190 },
    data: {
      icon: ListChecks,
      label: '2. Preparasjoner',
      description:
        'Ha tørr ved, opptenningsbriketter og slukkeutstyr (vann/sand) klart før du tenner på.',
      iconColor: 'text-cyan-400',
      shadowColor: '#22d3ee',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'proviantering',
    position: { x: 450, y: 380 }, // <-- Justert
    data: {
      icon: ShoppingBasket,
      label: '3. Proviantering',
      description:
        'Pølser, pinnebrød, marshmallows og varm drikke på termos. Forbered alt på forhånd.',
      iconColor: 'text-amber-400',
      shadowColor: '#facc15',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'personlig-komfort',
    position: { x: 500, y: 570 }, // <-- Justert
    data: {
      icon: UserCheck,
      label: '4. Personlig Komfort',
      description:
        'Sitteunderlag er bra, Utekos er best. Holder deg varm fra alle kanter, hele kvelden.',
      iconColor: 'text-rose-400',
      shadowColor: '#f472b6',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  },
  {
    id: 'prikken-over-i-en',
    position: { x: 550, y: 760 }, // <-- Justert
    data: {
      icon: Sparkles,
      label: '5. Prikken over i-en',
      description:
        'En lysslynge i et tre, en god spilleliste og gode venner. Den siste magien skaper du selv.',
      iconColor: 'text-violet-400',
      shadowColor: '#a78bfa',
      handle: { type: 'target', position: Position.Left }
    },
    type: 'custom'
  }
]
