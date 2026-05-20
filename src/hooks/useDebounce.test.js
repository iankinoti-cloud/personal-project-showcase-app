import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import useDebounce from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 400))
    expect(result.current).toBe('hello')
  })

  it('does NOT update before the delay', () => {
    let value = 'a'
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 400), {
      initialProps: { v: 'a' },
    })
    rerender({ v: 'ab' })
    act(() => { vi.advanceTimersByTime(200) })
    expect(result.current).toBe('a')
  })

  it('updates after the delay has elapsed', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 400), {
      initialProps: { v: 'a' },
    })
    rerender({ v: 'ab' })
    act(() => { vi.advanceTimersByTime(400) })
    expect(result.current).toBe('ab')
  })

  it('resets the timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 400), {
      initialProps: { v: 'a' },
    })
    rerender({ v: 'ab' })
    act(() => { vi.advanceTimersByTime(200) })
    rerender({ v: 'abc' })
    act(() => { vi.advanceTimersByTime(200) })
    // Only 200ms since last change — still at old value
    expect(result.current).toBe('a')
    act(() => { vi.advanceTimersByTime(200) })
    // Now 400ms since last change
    expect(result.current).toBe('abc')
  })
})
