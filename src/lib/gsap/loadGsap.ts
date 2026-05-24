type GsapModule = typeof import('gsap')
type GsapInstance = GsapModule['default']

let gsapPromise: Promise<GsapInstance> | null = null

export function loadGsap(): Promise<GsapInstance> {
  gsapPromise ??= import('gsap').then(module => module.default)

  return gsapPromise
}
