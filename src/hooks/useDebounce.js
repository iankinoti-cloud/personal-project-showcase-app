import { useState, useEffect } from 'react'

/**
 * Custom hook that debounces a value.
 * Returns the debounced value after the specified delay (ms).
 */
function useDebounce(value, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
