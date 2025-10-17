import { Sparkles } from 'lucide-react'

export function ProductsPageHeader() {
  return (
    <header className='relative mb-16 overflow-hidden text-center'>
      {/* Layered ambient glow - much softer */}
      <div className='absolute inset-0 -z-10'>
        {/* Primary glow */}
        <div
          className='absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 opacity-20 blur-[120px]'
          style={{
            background:
              'radial-gradient(ellipse at center, #0ea5e9 0%, #0284c7 30%, transparent 70%)'
          }}
        />
        {/* Secondary glow for depth */}
        <div
          className='absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 opacity-15 blur-[100px]'
          style={{
            background:
              'radial-gradient(ellipse at center, #38bdf8 0%, transparent 60%)'
          }}
        />
        {/* Accent glow */}
        <div
          className='absolute left-1/3 top-20 h-[300px] w-[500px] -translate-x-1/2 opacity-10 blur-[80px]'
          style={{
            background: 'radial-gradient(circle, #7dd3fc 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Badge with soft gradient */}
      <div
        className='animate-fade-in-up mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 relative group'
        style={{ animationDuration: '0.6s' }}
      >
        {/* Gradient background */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 backdrop-blur-sm' />

        {/* Border gradient */}
        <div
          className='absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 via-blue-500/30 to-sky-500/20 opacity-50'
          style={{
            padding: '1px',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Glow on hover */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-sky-400/0 via-blue-400/20 to-sky-400/0 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500' />

        <div className='relative flex items-center gap-2'>
          <Sparkles className='h-4 w-4 text-sky-400' />
          <span className='text-sm font-medium bg-gradient-to-r from-sky-300 via-blue-300 to-sky-300 bg-clip-text text-transparent'>
            Utforsk kolleksjonen
          </span>
        </div>
      </div>

      {/* Heading */}
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

      {/* Description */}
      <p
        className='animate-fade-in-up mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-accent/80 lg:text-xl'
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

export default ProductsPageHeader
