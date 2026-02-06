import gsap from 'gsap'

export const createMobileTimeline = (
  trigger: HTMLElement,
  cards: HTMLElement[],
  texts: HTMLElement[],
  setActiveLayer: (n: number) => void
) => {
  const [c1, c2, c3] = cards
  const [t1, t2, t3] = texts

  if (!c1 || !c2 || !c3 || !t1 || !t2 || !t3) return

  // Reset states
  gsap.set(cards, {
    scale: i => 1 - i * 0.05,
    y: i => i * 10
  })
  gsap.set(texts, { autoAlpha: 0, display: 'none', position: 'relative' })
  gsap.set(t1, { autoAlpha: 1, display: 'block' })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top top',
      end: '+=200%',
      scrub: 0.2,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => {
        const p = self.progress
        if (p < 0.4) setActiveLayer(1)
        else if (p < 0.7) setActiveLayer(2)
        else setActiveLayer(3)
      }
    }
  })

  tl.to(c1, {
    y: -500,
    rotation: -15,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in'
  })
  tl.to(c2, { scale: 1, y: 0, duration: 0.3 }, '<0.1')
  tl.to(t1, { autoAlpha: 0, display: 'none', duration: 0.1 }, 0.1)
  tl.to(t2, { autoAlpha: 1, display: 'block', duration: 0.1 }, 0.2)

  tl.to(
    c2,
    {
      y: -500,
      rotation: 15,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in'
    },
    '+=0.3'
  )

  tl.to(c3, { scale: 1, y: 0, duration: 0.3 }, '<0.1')

  tl.to(t2, { autoAlpha: 0, display: 'none', duration: 0.1 }, '<')
  tl.to(t3, { autoAlpha: 1, display: 'block', duration: 0.1 }, '<0.1')

  tl.to(c3, { boxShadow: '0 0 40px rgba(245, 158, 11, 0.5)', duration: 0.3 })

  return tl
}
