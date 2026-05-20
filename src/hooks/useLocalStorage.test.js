import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => { localStorage.clear() })

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', 42))
    expect(result.current[0]).toBe(42)
  })

  it('persists a value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', []))
    act(() => { result.current[1](['a', 'b']) })
    expect(result.current[0]).toEqual(['a', 'b'])
    expect(JSON.parse(localStorage.getItem('test_key'))).toEqual(['a', 'b'])
  })

  it('reads an existing value from localStorage', () => {
    localStorage.setItem('test_key', JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage('test_key', 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('test_key', [1]))
    act(() => { result.current[1]((prev) => [...prev, 2]) })
    expect(result.current[0]).toEqual([1, 2])
  })
})
