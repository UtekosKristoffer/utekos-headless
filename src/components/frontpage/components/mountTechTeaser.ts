import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function mountTechTeaser(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger)
  const ctx = gsap.context(() => {
    const content = root.querySelectorAll<HTMLElement>('.gsap-content')
    const cardVisual = root.querySelector<HTMLElement>('.gsap-card-visual')
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    timeline.fromTo(
      content,
      { y: 30, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    )

    if (cardVisual) {
      timeline.fromTo(
        cardVisual,
        { x: 30, autoAlpha: 0, rotationY: 10 },
        { x: 0, autoAlpha: 1, rotationY: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )
    }
  }, root)

  const canHover = window.matchMedia('(hover: hover)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  if (!canHover || !finePointer) {
    return () => ctx.revert()
  }

  const card = root.querySelector<HTMLElement>('[data-tech-card]')
  const tiltLayer = root.querySelector<HTMLElement>('[data-tilt-layer]')
  const inner = root.querySelector<HTMLElement>('[data-inner-parallax]')

  if (!card || !tiltLayer || !inner) {
    return () => ctx.revert()
  }

  const rotX = gsap.quickTo(tiltLayer, 'rotationX', {
    duration: 0.35,
    ease: 'power2.out'
  })
  const rotY = gsap.quickTo(tiltLayer, 'rotationY', {
    duration: 0.35,
    ease: 'power2.out'
  })
  const parX = gsap.quickTo(inner, 'x', { duration: 0.35, ease: 'power2.out' })
  const parY = gsap.quickTo(inner, 'y', { duration: 0.35, ease: 'power2.out' })

  let rect: DOMRect | null = null

  const onEnter = () => {
    rect = card.getBoundingClientRect()
  }

  const onMove = (e: MouseEvent) => {
    if (!rect) rect = card.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    rotY(x * 10)
    rotX(-y * 10)

    parX(x * 20)
    parY(y * 20)
  }

  const onLeave = () => {
    rotX(0)
    rotY(0)
    parX(0)
    parY(0)
    rect = null
  }

  const onResize = () => {
    rect = null
  }

  card.addEventListener('mouseenter', onEnter, { passive: true })
  card.addEventListener('mousemove', onMove, { passive: true })
  card.addEventListener('mouseleave', onLeave, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })

  return () => {
    window.removeEventListener('resize', onResize)
    card.removeEventListener('mouseenter', onEnter)
    card.removeEventListener('mousemove', onMove)
    card.removeEventListener('mouseleave', onLeave)
    ctx.revert()
  }
}
