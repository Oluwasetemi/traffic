'use client'

import { useEffect, useState, RefObject } from 'react'

export function useScrollTrigger(
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold: 0.1,
        ...options,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isVisible
}
