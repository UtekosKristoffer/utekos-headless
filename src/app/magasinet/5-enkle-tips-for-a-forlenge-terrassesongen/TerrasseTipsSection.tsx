import { cn } from '@/lib/utils/className'
import { Coffee, Layers, Lightbulb, Thermometer, Wind } from 'lucide-react'
import { AnimatedBlock } from '@/components/AnimatedBlock'

// --- Typer og hjelpere ---
const iconMap = {
  layers: Layers,
  lightbulb: Lightbulb,
  wind: Wind,
  thermometer: Thermometer,
  coffee: Coffee
}
type IconName = keyof typeof iconMap

function IconRenderer({
  name,
  className
}: {
  name: IconName
  className?: string
}) {
  const Icon = iconMap[name]
  return Icon ? <Icon className={cn('h-6 w-6', className)} /> : null
}

const tips: {
  Icon: IconName
  title: string
  description: string
  glowColor: string
  iconColor: string
}[] = [
  {
    Icon: 'layers',
    title: '1. Tekstiler og pledd',
    description:
      'Myke ullpledd, puter og saueskinn isolerer og skaper en umiddelbar følelse av lunhet.',
    glowColor: '#fb923c',
    iconColor: 'text-orange-400'
  },
  {
    Icon: 'lightbulb',
    title: '2. Riktig belysning',
    description:
      'Varme, dempede lyskilder som lysslynger og lykter skaper en intim og trygg atmosfære.',
    glowColor: '#facc15',
    iconColor: 'text-amber-400'
  },
  {
    Icon: 'wind',
    title: '3. Lun levegg',
    description:
      'En enkel levegg eller noen store planter kan stoppe den kjølige trekken og skape en lun krok.',
    glowColor: '#22d3ee',
    iconColor: 'text-cyan-400'
  },
  {
    Icon: 'thermometer',
    title: '4. Varme fra Utekos',
    description:
      'Den mest effektive måten å holde seg varm på. En personlig varmekilde som fungerer umiddelbart.',
    glowColor: '#f472b6',
    iconColor: 'text-rose-400'
  },
  {
    Icon: 'coffee',
    title: '5. Varme drikker',
    description:
      'En kopp te, kakao eller kaffe varmer fra innsiden og er en essensiell del av kosen.',
    glowColor: '#4ade80',
    iconColor: 'text-emerald-400'
  }
]

interface TipCardProps {
  Icon: IconName
  title: string
  description: string
  glowColor: string
  iconColor: string
}

function TipCard({
  Icon,
  title,
  description,
  glowColor,
  iconColor
}: TipCardProps) {
  return (
    <div className='group relative h-full overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-8 transition-transform duration-300 hover:-translate-y-1'>
      {/* Aurora gradient effect */}
      <div
        className='animate-aurora absolute -inset-x-2 -inset-y-16 opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-40'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${glowColor} 100%)`
        }}
      />

      <div className='relative z-10 flex h-full flex-col'>
        <div className='flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-700 bg-background transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-600'>
          <IconRenderer name={Icon} className={iconColor} />
        </div>
        <h3 className='mt-6 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-opacity-90'>
          {title}
        </h3>
        <p className='mt-2 text-muted-foreground'>{description}</p>
      </div>

      {/* Subtle border glow on hover */}
      <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: glowColor }}
        />
      </div>
    </div>
  )
}

export function TerrasseTipsSection() {
  return (
    <section className='mx-auto max-w-[95%] py-16 sm:py-24 md:max-w-7xl'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <AnimatedBlock className='will-animate-fade-in-up mb-16 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
            5 Enkle Tips for å Forlenge Terrassesongen
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-lg text-muted-foreground'>
            Med noen enkle grep kan du nyte terrassen din langt utover sommeren.
          </p>
        </AnimatedBlock>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5'>
          {tips.map((tip, i) => (
            <AnimatedBlock
              key={tip.title}
              className='will-animate-fade-in-up h-full'
              delay={`${i * 0.15}s`}
              threshold={0.3}
            >
              <TipCard {...tip} />
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </section>
  )
}
