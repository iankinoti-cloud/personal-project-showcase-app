import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders the search input', () => {
    render(<SearchBar onSearch={vi.fn()} />)
    expect(screen.getByLabelText('Search products')).toBeInTheDocument()
  })

  it('does not render the clear button when input is empty', () => {
    render(<SearchBar onSearch={vi.fn()} />)
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
  })

  it('shows the clear button after typing', () => {
    render(<SearchBar onSearch={vi.fn()} />)
    fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'sega' } })
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument()
  })

  it('calls onSearch with the typed value after debounce', () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'nintendo' } })
    act(() => { vi.advanceTimersByTime(400) })
    expect(onSearch).toHaveBeenCalledWith('nintendo')
    vi.useRealTimers()
  })

  it('clears the input when the clear button is clicked', () => {
    render(<SearchBar onSearch={vi.fn()} />)
    const input = screen.getByLabelText('Search products')
    fireEvent.change(input, { target: { value: 'atari' } })
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }))
    expect(input).toHaveValue('')
  })

  it('calls onSearch with empty string after clearing', () => {
    vi.useFakeTimers()
    const onSearch = vi.fn()
    render(<SearchBar onSearch={onSearch} />)
    const input = screen.getByLabelText('Search products')
    // Type something and let the debounce fire so debouncedValue becomes 'sega'
    fireEvent.change(input, { target: { value: 'sega' } })
    act(() => { vi.advanceTimersByTime(400) })
    expect(onSearch).toHaveBeenCalledWith('sega')
    // Now clear — debouncedValue changes from 'sega' → '' triggering onSearch('')
    fireEvent.click(screen.getByRole('button', { name: /clear search/i }))
    act(() => { vi.advanceTimersByTime(400) })
    expect(onSearch).toHaveBeenLastCalledWith('')
    vi.useRealTimers()
  })
})
