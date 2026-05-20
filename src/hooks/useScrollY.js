import { useState, useEffect } from 'react'

/**
 * Custom hook that returns the current window scrollY value.
 * Used to drive parallax transforms and scroll-aware UI effects.
 */
function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrollY
}

export default useScrollY
