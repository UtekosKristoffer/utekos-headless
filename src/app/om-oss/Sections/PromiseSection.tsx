import { Handshake } from 'lucide-react'

// Steg 1: Definer de ulike formene data kan ha
type TitleNodeData = {
  label: string
}

type TextNodeData = {
  text: string
  color: string
}

// Steg 2: Definer de ulike nodetypene som en "diskriminert union"
type PromiseNode =
  | {
      id: string
      type: 'promiseTitle'
      data: TitleNodeData
      position: { x: number; y: number }
      width: number
      height: number
    }
  | {
      id: string
      type: 'promiseText'
      data: TextNodeData
      position: { x: number; y: number }
      width: number
      height: number
    }
function TitleNode({ data }: { data: { label: string } }) {
  return (
    <div className='flex flex-col items-center gap-4 text-center'>
      <h2 className='text-4xl font-bold tracking-tight text-foreground'>
        {data.label}
      </h2>
      <div className='relative'>
        <div
          className='absolute inset-0 rounded-full opacity-40 blur-xl'
          style={{ background: '#f59e0b' }}
        />
        <div className='group relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/40 bg-amber-400/10 text-amber-400 transition-all duration-300 hover:scale-110 hover:border-amber-400/60'>
          <Handshake className='h-10 w-10' />
        </div>
      </div>
    </div>
  )
}

// TextNode er oppdatert med flexbox for sentrering
function TextNode({ data }: { data: { text: string; color: string } }) {
  return (
    <div className='group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-sidebar-foreground p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700'>
      <div
        className='absolute -inset-x-2 -inset-y-12 blur-2xl transition-opacity duration-300 opacity-15 group-hover:opacity-25'
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, transparent 30%, ${data.color} 100%)`
        }}
      />
      <p className='relative z-10 text-base leading-relaxed text-muted-foreground'>
        {data.text}
      </p>
      <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        <div
          className='absolute inset-0 rounded-xl blur-sm opacity-20'
          style={{ background: data.color }}
        />
      </div>
    </div>
  )
}

// Steg 3: Bruk den nye union-typen på data-arrayet
const nodes: PromiseNode[] = [
  {
    id: '1',
    type: 'promiseTitle',
    data: { label: 'Vårt løfte' },
    position: { x: 170, y: 0 },
    width: 280,
    height: 180
  },
  {
    id: '2',
    type: 'promiseText',
    data: {
      text: 'Vårt løfte er en dypere form for komfort. Nøye utvalgte materialer gir en umiddelbar følelse av varme og velvære, slik at du kan nyte øyeblikket lenger.',
      color: '#60a5fa'
    },
    position: { x: 0, y: 340 },
    width: 300,
    height: 180
  },
  {
    id: '3',
    type: 'promiseText',
    data: {
      text: 'Se på det som en varig investering i din egen hygge.',
      color: '#f472b6'
    },
    position: { x: 320, y: 340 },
    width: 300,
    height: 180
  }
]

const edges = [
  { id: 'e1-2', sourceId: '1', targetId: '2', data: { color: '#60a5fa' } },
  { id: 'e1-3', sourceId: '1', targetId: '3', data: { color: '#f472b6' } }
]

export function PromiseSection() {
  return (
    <section className='relative mx-auto overflow-hidden py-24 sm:py-32'>
      {/* Bakgrunns-glød */}
      <div className='absolute inset-0 -z-10 opacity-20'>
        <div
          className='absolute left-1/3 top-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)'
          }}
        />
        <div
          className='absolute right-1/3 bottom-1/4 h-[500px] w-[500px] blur-3xl'
          style={{
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)'
          }}
        />
      </div>

      <div className='container mx-auto max-w-7xl px-4'>
        {/*
         * ENDRING 1:
         * Flexbox-egenskaper er fjernet. Containeren trenger kun å være 'relative'.
         * Høyden er fortsatt responsiv for å se bra ut på alle skjermer.
         */}
        <div className='relative h-[500px] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[hsl(0,0%,4%,1)] p-4 shadow-2xl md:h-[650px]'>
          <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent' />

          {/*
           * ENDRING 2 (Kjernen i løsningen):
           * Lerretet er nå absolutt posisjonert og tvunget til midten FØR det skaleres.
           * - 'absolute top-1/2 left-1/2': Posisjonerer lerretets øvre venstre hjørne i midten.
           * - '-translate-x-1/2 -translate-y-1/2': Drar lerretet tilbake med 50% av sin egen bredde og høyde, som gir perfekt sentrering.
           * - Responsive 'scale-*'-klasser skalerer deretter det allerede sentrerte elementet.
           */}
          <div
            className='absolute top-1/2 left-1/2 h-[520px] w-[620px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 scale-[0.55] sm:scale-75 md:scale-100'
            style={{ transformOrigin: 'center center' }}
          >
            {/* SVG for linjer */}
            <svg className='absolute inset-0 h-full w-full' aria-hidden='true'>
              <defs>
                <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
                  <feGaussianBlur stdDeviation='3.5' result='coloredBlur' />
                </filter>
              </defs>
              {edges.map(edge => {
                const sourceNode = nodes.find(n => n.id === edge.sourceId)!
                const targetNode = nodes.find(n => n.id === edge.targetId)!
                const sourceX = sourceNode.position.x + sourceNode.width / 2
                const sourceY = sourceNode.position.y + 132
                const targetX = targetNode.position.x + targetNode.width / 2
                const targetY = targetNode.position.y
                const midY = sourceY + (targetY - sourceY) * 0.5
                const pathD = `M ${sourceX},${sourceY} Q ${sourceX},${midY} ${
                  (sourceX + targetX) / 2
                },${midY} T ${targetX},${targetY}`

                return (
                  <g key={edge.id} style={{ opacity: 0.6 }}>
                    <path
                      d={pathD}
                      stroke={edge.data.color}
                      strokeWidth={2}
                      fill='none'
                    />
                    <circle
                      cx={targetX}
                      cy={targetY}
                      r={10}
                      fill={edge.data.color}
                      filter='url(#glow)'
                    />
                  </g>
                )
              })}
            </svg>

            {/* Noder */}
            {nodes.map(node => (
              <div
                key={node.id}
                className='absolute flex items-center justify-center'
                style={{
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  width: `${node.width}px`,
                  height: `${node.height}px`
                }}
              >
                {node.type === 'promiseTitle' && <TitleNode data={node.data} />}
                {node.type === 'promiseText' && <TextNode data={node.data} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
