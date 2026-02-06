import gsap from 'gsap'

export const createDesktopTimeline = (
  trigger: HTMLElement,
  cardsContainer: HTMLElement,
  cards: HTMLElement[],
  texts: HTMLElement[],
  setActiveLayer: (n: number) => void
) => {
  const [c1, c2, c3] = cards
  const [t1, t2, t3] = texts

  if (!c1 || !c2 || !c3 || !t1 || !t2 || !t3) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        const progress = self.progress
        if (progress < 0.4) setActiveLayer(1)
        else if (progress < 0.7) setActiveLayer(2)
        else setActiveLayer(3)
      }
    }
  })

  tl.to(
    cardsContainer,
    {
      rotationY: -10,
      rotationX: 5,
      x: -50,
      duration: 0.5,
      ease: 'power1.out'
    },
    0
  )

  const t1Exit = 0.8

  tl.to(
    c1,
    {
      x: 450, // Sender den langt ut
      z: 100,
      rotationY: -20,
      opacity: 0, // Helt usynlig
      scale: 0.8,
      duration: 0.8, // Raskere bevegelse
      ease: 'power2.inOut'
    },
    t1Exit
  )

  tl.to(t1, { autoAlpha: 0, x: -20, duration: 0.3 }, t1Exit)
  tl.to(t2, { autoAlpha: 1, x: 0, duration: 0.3 }, t1Exit + 0.3)

  const t2Exit = 2.0

  tl.to(
    c2,
    {
      x: 450,
      z: 100,
      rotationY: -20,
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.inOut'
    },
    t2Exit
  )

  tl.set(c1, { display: 'none' }, t2Exit)

  // Løft frem C3 (Hero)
  tl.to(
    c3,
    {
      scale: 1.15,
      z: 120,
      x: 0,
      duration: 0.8,
      boxShadow: '0 0 60px rgba(245, 158, 11, 0.6)',
      ease: 'back.out(1.2)'
    },
    t2Exit
  )

  tl.to(t2, { autoAlpha: 0, x: -20, duration: 0.3 }, t2Exit)
  tl.to(t3, { autoAlpha: 1, x: 0, duration: 0.3 }, t2Exit + 0.3)

  return tl
}
