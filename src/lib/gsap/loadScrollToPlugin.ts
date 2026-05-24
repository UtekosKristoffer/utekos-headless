import { loadGsap } from './loadGsap'

type GsapInstance = Awaited<ReturnType<typeof loadGsap>>
type ScrollToPluginInstance =
  (typeof import('gsap/ScrollToPlugin'))['ScrollToPlugin']

let scrollToPluginPromise: Promise<{
  gsap: GsapInstance
  ScrollToPlugin: ScrollToPluginInstance
}> | null = null

export function loadScrollToPlugin(): Promise<{
  gsap: GsapInstance
  ScrollToPlugin: ScrollToPluginInstance
}> {
  scrollToPluginPromise ??= Promise.all([
    loadGsap(),
    import('gsap/ScrollToPlugin')
  ]).then(([gsap, module]) => {
    gsap.registerPlugin(module.ScrollToPlugin)
    module.ScrollToPlugin.config({ autoKill: true })

    return {
      gsap,
      ScrollToPlugin: module.ScrollToPlugin
    }
  })

  return scrollToPluginPromise
}
