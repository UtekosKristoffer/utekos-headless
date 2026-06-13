export function SocialProofHeaderView({
  id,
  title,
  description
}: {
  id: string
  title: string
  description: React.ReactNode
}) {
  const words = title.split(' ')

  return (
    <div id={id} className='mb-16 text-center'>
      <h2 data-social-proof-title='' className='overflow-hidden text-foreground' aria-label={title}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className='inline-block whitespace-nowrap'>
            {word.split('').map((char, charIndex) => (
              <span key={charIndex} className='gsap-heading-char inline-block origin-bottom'>
                {char}
              </span>
            ))}

            {wordIndex < words.length - 1 && (
              <span className='gsap-heading-char inline-block origin-bottom'>&nbsp;</span>
            )}
          </span>
        ))}
      </h2>
      <div
        data-social-proof-text=''
        className='mx-auto mt-4 max-w-3xl text-lg text-accent/80 opacity-0 will-change-transform'
      >
        {description}
      </div>
    </div>
  )
}
