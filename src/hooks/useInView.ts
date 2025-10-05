import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  triggerOnce?: boolean
}
export function useInView<T extends Element>({
  threshold = 0.3,
  triggerOnce = true
}: UseInViewOptions = {}): [(node: T | null) => void, boolean] {
  const [ref, setRef] = useState<T | null>(null)
  const [isInView, setIsInView] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!ref) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce && observerRef.current) {
            observerRef.current.unobserve(entry.target)
          }
        }
      },
      { threshold }
    )

    observerRef.current.observe(ref)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ref, threshold, triggerOnce])

  return [setRef, isInView]
}
