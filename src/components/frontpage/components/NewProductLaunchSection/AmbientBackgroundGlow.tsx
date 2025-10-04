export function AmbientBackgroundGlow() {
  return (
    <div className='absolute inset-0 -z-10 overflow-hidden'>
      <div
        className='absolute left-1/4 top-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)'
        }}
      />
      <div
        className='absolute right-1/4 bottom-1/4 h-[600px] w-[600px] opacity-15 blur-3xl'
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)'
        }}
      />
    </div>
  )
}
