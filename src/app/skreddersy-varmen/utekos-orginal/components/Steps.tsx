import { Maximize2, Move, User } from 'lucide-react'
import TechHalfImage from '@public/1080/tech-halv-1080.png'
import ClassicCoupleImage from '@public/webp/classic-couple-1080.webp'
import TechDownKateKikkertImage from '@public/kikkert-kate-2160.webp'

export const Steps = [
  {
    id: 'fullengde',
    stepNumber: '01',
    modeName: 'Fullengdemodus',
    title: 'Maksimal isolasjon',
    description:
      'Utgangspunktet for selve utekosen. Pakk deg inn i en isolerende kokong for komplett komfort. Perfekt i hytteveggen, utenfor bobilen eller lange kvelder på terrassen hvor roen senker seg.',
    icon: <Maximize2 className='size-5' />,
    image: ClassicCoupleImage,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center center'
  },
  {
    id: 'oppjustert',
    stepNumber: '02',
    modeName: 'Oppjustert modus',
    title: 'Umiddelbar mobilitet',
    description:
      'Nyter du total omfavnelse av Utekos, men må plutselig en rask tur på kjøkkenet eller svare på telefonen som ringer fra andre siden av huset? Heis opp plagget til ønsket lengde, stram med den utvendige snoren i livet og vær mobil på få sekunder. Beveg deg uten snublefare og subbefritt - uten å miste varmen.',
    icon: <Move className='size-5' />,
    image: TechHalfImage,
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
    icon: <User className='size-5' />,
    image: TechDownKateKikkertImage,
    isProduct: false,
    desktopObjectFit: 'cover',
    desktopObjectPosition: 'center center'
  }
]
