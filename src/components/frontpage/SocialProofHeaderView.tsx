import { forwardRef, type ReactNode } from 'react'

interface SocialProofHeaderViewProps {
  title: string
  description: ReactNode
  titleRef: React.RefObject<HTMLHeadingElement | null>
  textRef: React.RefObject<HTMLParagraphElement | null>
}

export const SocialProofHeaderView = forwardRef<
  HTMLDivElement,
  SocialProofHeaderViewProps
>(({ title, description, titleRef, textRef }, ref) => {
  const letters = title.split('')

  return (
    <div ref={ref} className='mb-16 text-center'>
      <h2
        ref={titleRef}
        className='overflow-hidden text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
        aria-label={title}
      >
        {letters.map((char, i) => (
          <span
            key={i}
            className='gsap-heading-char inline-block origin-bottom'
            style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          >
            {char}
          </span>
        ))}
      </h2>

      {/* Her rendrer vi nå ReactNode (div/p/span) i stedet for bare tekst */}
      <div
        ref={textRef}
        className='mx-auto mt-4 max-w-3xl text-lg text-accent/80 opacity-0 will-change-transform'
      >
        {description}
      </div>
    </div>
  )
})

SocialProofHeaderView.displayName = 'SocialProofHeaderView'
