import { loadGsap } from './loadGsap'

type GsapInstance = Awaited<ReturnType<typeof loadGsap>>
type ScrollTriggerInstance =
  (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']

let scrollTriggerPromise: Promise<{
  gsap: GsapInstance
  ScrollTrigger: ScrollTriggerInstance
}> | null = null

export function loadScrollTrigger(): Promise<{
  gsap: GsapInstance
  ScrollTrigger: ScrollTriggerInstance
}> {
  scrollTriggerPromise ??= Promise.all([
    loadGsap(),
    import('gsap/ScrollTrigger')
  ]).then(([gsap, module]) => {
    gsap.registerPlugin(module.ScrollTrigger)

    return {
      gsap,
      ScrollTrigger: module.ScrollTrigger
    }
  })

  return scrollTriggerPromise
}
