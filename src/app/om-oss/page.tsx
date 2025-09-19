// Path: app/om-oss/page.tsx
import { AboutSwiper } from '@/components/about/AboutSwiper' // Importer klientkomponenten
import { Award, Coffee, Leaf, Mountain } from 'lucide-react'

const corePhilosophies = [
  {
    icon: Coffee,
    title: 'Designet for hygge',
    text: 'Vi vet at en sommerkveld kan bli kjølig og en høstdag krever ekstra varme. Derfor er produktene våre designet her, med en dyp forståelse for den norske livsstilen og behovet for å forlenge de sosiale, gode øyeblikkene utendørs.'
  },
  {
    icon: Award,
    title: 'Kompromissløs komfort',
    text: 'Kvalitet handler om hvordan plagget føles mot huden og varmen det gir kroppen. Vi velger materialer som er myke, funksjonelle og behagelige, slik at du kan slappe av og nyte stunden.'
  },
  {
    icon: Mountain,
    title: 'Mer Utekos',
    text: 'Utekos handler for oss om å verdsette de rolige øyeblikkene. En kaffekopp på en kjølig morgen, en god samtale rundt bålpannen, eller en solnedgang fra terrassen. Vi skaper produkter som er designet for å gjøre disse stundene enda bedre og mer komfortable.'
  },
  {
    icon: Leaf,
    title: 'Bærekraft i fokus',
    text: 'Bærekraft betyr produkter som er laget for å vare. I en verden av rask mote, fokuserer vi på tidløs design og solid håndverk som tåler å bli brukt – igjen og igjen. Et Utekos-plagg er et bevisst valg for deg, og et mer ansvarlig valg for naturen vi alle setter pris på.'
  }
]

export default function AboutPage() {
  return (
    <main>
      {/* 1. Hero-seksjon */}
      <section className='py-24 text-center sm:py-32'>
        <div className='container'>
          <h1 className='text-5xl font-bold tracking-tight sm:text-6xl'>
            Utekos™
          </h1>
          <p className='mt-6 text-lg leading-8 text-muted-foreground'>
            Forlenger de gode øyeblikkene utendørs.
          </p>
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-16'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {corePhilosophies.map(item => (
            <div key={item.title} className='text-center'>
              <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
                <item.icon className='h-6 w-6 text-primary-foreground' />
              </div>
              <h3 className='mt-6 text-xl font-semibold'>{item.title}</h3>
              <p className='mt-2 text-muted-foreground'>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='container mx-auto max-w-6xl px-4 py-16'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>Mer Utekos</h2>
          <p className='mt-4 text-lg leading-8 text-muted-foreground'>
            Kvalitet og design som tåler elementene.
          </p>
        </div>
        <div className='mt-12'>
          <AboutSwiper />
        </div>
      </section>

      <section className='py-24 sm:py-32'>
        <div className='container mx-auto max-w-3xl px-4 text-center'>
          <div className='rounded-lg border border-neutral-800 bg-[hsl(0,0%,4%,1)] p-12'>
            <h2 className='text-3xl font-bold tracking-tight'>Vårt løfte</h2>
            <p className='mt-6 text-lg leading-8 text-muted-foreground'>
              Vårt løfte er en dypere form for komfort. Nøye utvalgte materialer
              gir en umiddelbar følelse av varme og velvære, slik at du kan nyte
              øyeblikket lenger. Se på det som en varig investering i din egen
              hygge.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
