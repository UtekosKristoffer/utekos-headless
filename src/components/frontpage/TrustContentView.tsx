import { forwardRef } from 'react'

interface TrustContentViewProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>
  textRef: React.RefObject<HTMLParagraphElement | null>
  card1Ref: React.RefObject<HTMLDivElement | null>
  card2Ref: React.RefObject<HTMLDivElement | null>
  // Vi importerer InfoCardStackView her for å bruke den inni
  InfoCardsComponent: React.ComponentType<any>
}

export const TrustContentView = forwardRef<
  HTMLDivElement,
  TrustContentViewProps
>(({ headingRef, textRef, card1Ref, card2Ref, InfoCardsComponent }, ref) => {
  return (
    <div
      ref={ref}
      className='flex flex-col justify-between bg-sidebar-foreground p-8 lg:p-12'
    >
      <div>
        {/* Maskert Overskrift for Reveal Effekt */}
        <h2
          ref={headingRef}
          className='text-3xl font-bold tracking-tight text-foreground'
        >
          <span className='block overflow-hidden'>
            <span className='gsap-reveal-line block'>En opplevelse</span>
          </span>
          <span className='block overflow-hidden'>
            <span className='gsap-reveal-line block'>bygget på tillit</span>
          </span>
        </h2>

        <p
          ref={textRef}
          className='mb-2 mt-4 text-lg text-muted-foreground opacity-0'
        >
          Fra du besøker siden vår til du nyter kveldssolen i ditt Utekos-plagg
          – vi er dedikerte til å levere en trygg og førsteklasses opplevelse i
          alle ledd.
        </p>
      </div>

      <div className='mt-12 lg:mt-0'>
        {/* Rendrer kortene med refs sendt fra parent */}
        <InfoCardsComponent card1Ref={card1Ref} card2Ref={card2Ref} />
      </div>
    </div>
  )
})

TrustContentView.displayName = 'TrustContentView'
