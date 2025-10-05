import { Sparkles } from 'lucide-react'

export function ProductsPageHeader() {
  return (
    <header className='relative mb-16 overflow-hidden text-center'>
      {/* Very subtle ambient glow */}
      <div className='absolute inset-0 -z-10 opacity-30'>
        <div
          className='absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 blur-3xl'
          style={{
            background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
          }}
        />
      </div>

      <div
        className='animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full border border-sky-800/30 bg-sky-900/10 px-4 py-2'
        style={{ animationDuration: '0.6s' }}
      >
        <Sparkles className='h-4 w-4 text-sky-800' />
        <span className='text-sm font-medium text-sky-800'>
          Utforsk kolleksjonen
        </span>
      </div>

      <h1
        className='animate-fade-in-up text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
        style={
          {
            '--animation-delay': '0.1s',
            'animationDuration': '0.6s'
          } as React.CSSProperties
        }
      >
        Kolleksjonen for kompromissløs komfort
      </h1>

      <p
        className='animate-fade-in-up mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground lg:text-xl'
        style={
          {
            '--animation-delay': '0.2s',
            'animationDuration': '0.6s'
          } as React.CSSProperties
        }
      >
        Hvert plagg er skapt for ett formål: å la deg forlenge de gode
        øyeblikkene ute. Utforsk vår kolleksjon og finn den perfekte
        følgesvennen for din utekos.
      </p>
    </header>
  )
}
