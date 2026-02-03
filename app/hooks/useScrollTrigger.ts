'use client'

import { useEffect, useState, RefObject } from 'react'

export function useScrollTrigger<T extends Element = HTMLElement>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentElement = ref.current

    if (!currentElement) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing
          observer.unobserve(currentElement)
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    observer.observe(currentElement)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isVisible
}
