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
  const words = title.split(' ')

  return (
    <div ref={ref} className='mb-16 text-center'>
      <h2
        ref={titleRef}
        className='text-balance overflow-hidden text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
        aria-label={title}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className='inline-block whitespace-nowrap'>
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className='gsap-heading-char inline-block origin-bottom'
              >
                {char}
              </span>
            ))}

            {wordIndex < words.length - 1 && (
              <span className='gsap-heading-char inline-block origin-bottom'>
                &nbsp;
              </span>
            )}
          </span>
        ))}
      </h2>
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
