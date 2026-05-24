import { loadGsap } from './loadGsap'

type GsapDevToolsInstance = ReturnType<
  (typeof import('gsap/GSDevTools'))['GSDevTools']['create']
>
type GsapAnimation = gsap.core.Animation

function shouldEnableGsapDevTools(): boolean {
  if (process.env.NODE_ENV !== 'development') {
    return false
  }

  if (typeof window === 'undefined') {
    return false
  }

  const params = new URLSearchParams(window.location.search)
  if (params.get('gsdevtools') === '1') {
    return true
  }

  try {
    return window.localStorage.getItem('utekos:gsdevtools') === '1'
  } catch {
    return false
  }
}

export async function createGsapDevTools({
  animation,
  id
}: {
  animation?: GsapAnimation
  id: string
}): Promise<GsapDevToolsInstance | null> {
  if (!shouldEnableGsapDevTools()) {
    return null
  }

  const [gsap, module] = await Promise.all([
    loadGsap(),
    import('gsap/GSDevTools')
  ])
  gsap.registerPlugin(module.GSDevTools)

  const config = {
    id,
    minimal: true,
    persist: false
  }

  return module.GSDevTools.create(animation ? { ...config, animation } : config)
}
