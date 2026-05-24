'use client'

import { useEffect, useRef } from 'react'

const animatedSelectors = '.gsap-image-col, .gsap-item, .gsap-feature'

type GsapContext = {
  revert: () => void
}

export function useNewProductLaunchAnimations() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: GsapContext | null = null
    let cancelled = false

    const revealStaticContent = () => {
      const container = containerRef.current
      if (!container) return

      const animatedElements = Array.from(
        container.querySelectorAll<HTMLElement>(animatedSelectors)
      )

      animatedElements.forEach(element => {
        element.style.opacity = '1'
        element.style.visibility = 'visible'
        element.style.transform = 'none'
        element.style.filter = 'none'
      })
    }

    const run = async () => {
      const container = containerRef.current
      if (!container) return

      let gsap: (typeof import('gsap'))['default']
      let ScrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']

      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ])

        gsap = gsapModule.default
        ScrollTrigger = scrollTriggerModule.ScrollTrigger
      } catch {
        if (!cancelled) revealStaticContent()
        return
      }

      if (cancelled || !containerRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(container)

        const stage = container.querySelector<HTMLElement>(
          '[data-launch-stage]'
        )

        const imageCol = q('.gsap-image-col') as HTMLElement[]
        const items = q('.gsap-item') as HTMLElement[]
        const features = q('.gsap-feature') as HTMLElement[]

        const badges = items.slice(0, 2)
        const kicker = items[2] ? [items[2]] : []
        const title = items[3] ? [items[3]] : []
        const commerce = items.slice(4)

        const animatedElements = [
          ...imageCol,
          ...badges,
          ...kicker,
          ...title,
          ...features,
          ...commerce
        ]

        if (!stage || !animatedElements.length) {
          revealStaticContent()
          return
        }

        const prefersReducedMotion =
          typeof window !== 'undefined'
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
          gsap.set(animatedElements, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateZ: 0,
            clearProps: 'transform,filter'
          })

          return
        }

        ScrollTrigger.saveStyles(animatedElements)

        const setInitialState = (isDesktop: boolean) => {
          gsap.set(animatedElements, {
            autoAlpha: 0,
            willChange: 'transform, opacity'
          })

          gsap.set(imageCol, {
            x: isDesktop ? -30 : 0,
            y: isDesktop ? 54 : 30,
            scale: isDesktop ? 0.97 : 0.985,
            rotateZ: isDesktop ? -0.6 : 0
          })

          gsap.set(badges, {
            y: -14,
            scale: 0.95
          })

          gsap.set(kicker, {
            y: 20
          })

          gsap.set(title, {
            y: isDesktop ? 42 : 28,
            scale: 0.98
          })

          gsap.set(features, {
            x: isDesktop ? 22 : 0,
            y: isDesktop ? 34 : 24,
            scale: 0.985
          })

          gsap.set(commerce, {
            y: isDesktop ? 22 : 18,
            scale: 0.99
          })
        }

        const buildTimeline = (
          timeline: ReturnType<typeof gsap.timeline>,
          isDesktop: boolean
        ) => {
          timeline
            .addLabel('start', 0)

            .to(
              imageCol,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateZ: 0,
                duration: isDesktop ? 1.05 : 0.68,
                ease: isDesktop ? 'none' : 'power4.out'
              },
              'start'
            )

            .to(
              badges,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: isDesktop ? 0.56 : 0.44,
                stagger: isDesktop ? 0.08 : 0.06,
                ease: isDesktop ? 'none' : 'back.out(1.08)'
              },
              isDesktop ? 'start+=0.12' : 'start+=0.04'
            )

            .to(
              kicker,
              {
                autoAlpha: 1,
                y: 0,
                duration: isDesktop ? 0.5 : 0.42,
                ease: isDesktop ? 'none' : 'power3.out'
              },
              isDesktop ? 'start+=0.22' : 'start+=0.1'
            )

            .to(
              title,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: isDesktop ? 0.68 : 0.56,
                ease: isDesktop ? 'none' : 'power4.out'
              },
              isDesktop ? 'start+=0.32' : 'start+=0.16'
            )

            .to(
              features,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                duration: isDesktop ? 0.72 : 0.5,
                stagger: isDesktop ? 0.12 : 0.08,
                ease: isDesktop ? 'none' : 'power3.out'
              },
              isDesktop ? 'start+=0.58' : 'start+=0.34'
            )

            .to(
              commerce,
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: isDesktop ? 0.58 : 0.46,
                ease: isDesktop ? 'none' : 'power3.out'
              },
              isDesktop ? 'start+=1.05' : 'start+=0.68'
            )

            .to({}, { duration: isDesktop ? 0.18 : 0.12 })
        }

        const mm = gsap.matchMedia()

        mm.add('(min-width: 1280px) and (min-height: 820px)', () => {
          setInitialState(true)

          const revealTimeline = gsap.timeline({
            defaults: {
              ease: 'power3.out'
            },
            scrollTrigger: {
              trigger: stage,
              start: 'top 98%',
              end: 'top -90%',
              scrub: true,
              invalidateOnRefresh: true,
              markers: false
            },
            onComplete: () => {
              gsap.set(animatedElements, {
                willChange: 'auto'
              })
            }
          })

          buildTimeline(revealTimeline, true)

          const pinTrigger = ScrollTrigger.create({
            trigger: stage,
            pin: true,

            // Catch the section before it reaches the header so the pin feels intentional.
            start: 'top 30%',

            // Release shortly after the final reveal so the section never sits idle.
            end: () => `+=${Math.max(window.innerHeight * 0.98, 700)}`,

            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false
          })

          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })

          return () => {
            revealTimeline.kill()
            pinTrigger.kill()
          }
        })

        mm.add(
          '(min-width: 1024px) and (max-width: 1279px), (min-width: 1280px) and (max-height: 819px)',
          () => {
            setInitialState(true)

            const revealTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: stage,
                start: 'top 98%',
                end: 'bottom 24%',
                scrub: true,
                invalidateOnRefresh: true,
                markers: false
              },
              onComplete: () => {
                gsap.set(animatedElements, {
                  willChange: 'auto'
                })
              }
            })

            buildTimeline(revealTimeline, true)

            const pinTrigger = ScrollTrigger.create({
              trigger: stage,
              pin: true,
              start: 'bottom bottom',
              end: () => `+=${Math.max(window.innerHeight * 0.34, 260)}`,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: false
            })

            requestAnimationFrame(() => {
              ScrollTrigger.refresh()
            })

            return () => {
              revealTimeline.kill()
              pinTrigger.kill()
            }
          }
        )

        mm.add('(max-width: 1023px)', () => {
          setInitialState(false)

          const revealGroups = [
            { targets: imageCol, start: 'top 98%', end: 'top 72%' },
            { targets: badges, start: 'top 94%', end: 'top 74%' },
            { targets: kicker, start: 'top 90%', end: 'top 70%' },
            { targets: title, start: 'top 90%', end: 'top 68%' },
            ...features.map(feature => ({
              targets: [feature],
              start: 'top 88%',
              end: 'top 66%'
            })),
            { targets: commerce, start: 'top 90%', end: 'top 70%' }
          ]

          const tweens = revealGroups
            .map(({ targets: group, start, end }) => {
              const trigger = group[0]
              if (!trigger) return null

              return gsap.to(group, {
                autoAlpha: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotateZ: 0,
                duration: 0.58,
                ease: 'power3.out',
                stagger: group.length > 1 ? 0.06 : 0,
                scrollTrigger: {
                  trigger,
                  start,
                  end,
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                  markers: false
                },
                onComplete: () => {
                  gsap.set(group, {
                    willChange: 'auto'
                  })
                }
              })
            })
            .filter(tween => tween !== null)

          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })

          return () => {
            tweens.forEach(tween => {
              tween.kill()
            })
          }
        })

        return () => {
          mm.revert()
        }
      }, container)
    }

    void run()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return containerRef
}
