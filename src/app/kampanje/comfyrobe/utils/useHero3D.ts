import gsap from 'gsap'
import type { MouseEvent, RefObject } from 'react'

export function useHero3D(imageContainerRef: RefObject<HTMLElement | null>) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || !imageContainerRef.current) return

    const { clientX, clientY, currentTarget } = e
    const { width, height, left, top } = currentTarget.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    gsap.to(imageContainerRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      x: x * 15,
      y: y * 15,
      duration: 1,
      ease: 'power2.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (window.innerWidth < 1024 || !imageContainerRef.current) return

    gsap.to(imageContainerRef.current, {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  return { handleMouseMove, handleMouseLeave }
}
