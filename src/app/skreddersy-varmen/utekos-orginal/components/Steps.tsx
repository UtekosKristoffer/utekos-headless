import { Maximize2, Move, User } from 'lucide-react'
import KateLinnKikkertImage from '@public/kate-linn-kikkert-4-5.png'
import TechDownFrontImage from '@public/fiberdun/techdawn-front.png'
import ClassicGeminiCouple45 from '@public/classic-gemeni-4-5.png'

export const Steps = [
  {
    id: 'fullengde',
    stepNumber: '01',
    modeName: 'Fullengdemodus',
    title: 'Maksimal isolasjon',
    description:
      'Utgangspunktet for selve utekosen. Pakk deg inn i en isolerende kokong for komplett komfort. Perfekt i hytteveggen, utenfor bobilen eller lange kvelder på terrassen hvor roen senker seg.',
    icon: <Maximize2 className='w-5 h-5' />,
    image: ClassicGeminiCouple45,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center 30%'
  },
  {
    id: 'oppjustert',
    stepNumber: '02',
    modeName: 'Oppjustert modus',
    title: 'Umiddelbar mobilitet',
    description:
      'Nyter du total omfavnelse av Utekos, men må plutselig en rask tur på kjøkkenet eller svare på telefonen som ringer fra andre siden av huset? Heis opp plagget til ønsket lengde, stram med den utvendige snoren i livet og vær mobil på få sekunder. Beveg deg uten snublefare og subbefritt - uten å miste varmen.',
    icon: <Move className='w-5 h-5' />,
    image: TechDownFrontImage,
    isProduct: true,
    desktopObjectFit: 'contain',
    desktopObjectPosition: 'center center'
  },
  {
    id: 'parkas',
    stepNumber: '03',
    modeName: 'Parkasmodus',
    title: 'Selvformet eleganse',
    description:
      'Planlagt bevegelse over tid. Forvandle Utekos til en selvformet parkas. Full bevegelsesfrihet med et elegant snitt.',
    icon: <User className='w-5 h-5' />,
    image: KateLinnKikkertImage,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center center'
  }
]
