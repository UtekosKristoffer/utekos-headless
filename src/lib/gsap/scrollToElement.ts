import { loadScrollToPlugin } from './loadScrollToPlugin'

interface ScrollToElementOptions {
  duration?: number
  offsetY?: number
  reducedMotion?: boolean | null
}

function shouldReduceMotion(reducedMotion?: boolean | null): boolean {
  if (typeof reducedMotion === 'boolean') {
    return reducedMotion
  }

  if (typeof window === 'undefined') {
    return true
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export async function scrollToElement(
  targetId: string,
  { duration = 0.85, offsetY = 80, reducedMotion }: ScrollToElementOptions = {}
): Promise<void> {
  if (typeof window === 'undefined') {
    return
  }

  const target = document.getElementById(targetId)
  if (!target) {
    return
  }

  if (shouldReduceMotion(reducedMotion)) {
    target.scrollIntoView({ behavior: 'auto', block: 'start' })
    return
  }

  const { gsap } = await loadScrollToPlugin()

  gsap.to(window, {
    duration,
    ease: 'power2.out',
    overwrite: 'auto',
    scrollTo: {
      y: target,
      offsetY,
      autoKill: true
    }
  })
}
