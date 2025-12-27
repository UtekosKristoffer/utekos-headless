// components/skeletons/PricingSkeleton.tsx
export const PricingSkeleton = () => (
  <div className='flex flex-col items-center gap-2'>
    {/* Pris-blokk som matcher høyden til fonten */}
    <div className='h-10 w-32 bg-stone-200/50 animate-pulse rounded-md' />

    {/* Delbetaling-blokk */}
    <div className='h-4 w-48 bg-stone-100 animate-pulse rounded-md' />
  </div>
)
