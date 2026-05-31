// Path: src/app/skreddersy-varmen/components/LandingPurchaseFallback.tsx

export function LandingPurchaseFallback() {
  return (
    <div className='w-full bg-overcast px-6 py-16 text-background'>
      <div className='mx-auto max-w-3xl rounded-sm border border-background/12 bg-cloud-dancer p-6 text-center shadow-sm'>
        <p className='font-google-sans text-xl font-bold'>Henter produktvalg</p>
        <p className='mt-2 text-sm leading-relaxed text-background/75'>
          Siden er klar, og kjøpsvalgene lastes inn.
        </p>
      </div>
    </div>
  )
}
