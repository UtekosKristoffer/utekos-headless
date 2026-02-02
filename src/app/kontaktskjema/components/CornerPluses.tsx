// Path: src/app/kontaktskjema/sections/CornerPluses.tsx
export function CornerPluses() {
  return (
    <>
      {/* Plus-ikon øverst venstre */}
      <div
        className='pointer-events-none absolute left-0 top-0 z-10'
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden='true'
      >
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
          <line
            x1='16'
            y1='0'
            x2='16'
            y2='32'
            stroke='rgb(255 255 255 / 0.2)'
            strokeWidth='1'
          />
          <line
            x1='0'
            y1='16'
            x2='32'
            y2='16'
            stroke='rgb(255 255 255 / 0.2)'
            strokeWidth='1'
          />
        </svg>
      </div>

      {/* Plus-ikon nederst høyre */}
      <div
        className='pointer-events-none absolute bottom-0 right-0 z-10'
        style={{ transform: 'translate(50%, 50%)' }}
        aria-hidden='true'
      >
        <svg width='32' height='32' viewBox='0 0 32 32' fill='none'>
          <line
            x1='16'
            y1='0'
            x2='16'
            y2='32'
            stroke='rgb(255 255 255 / 0.2)'
            strokeWidth='1'
          />
          <line
            x1='0'
            y1='16'
            x2='32'
            y2='16'
            stroke='rgb(255 255 255 / 0.2)'
            strokeWidth='1'
          />
        </svg>
      </div>
    </>
  )
}
