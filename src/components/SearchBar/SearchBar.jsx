import { useState, useEffect, useRef } from 'react'
import useDebounce from '../../hooks/useDebounce'
import './SearchBar.css'

function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')
  const debouncedValue = useDebounce(inputValue, 400)
  // Only fire onSearch after the user has interacted — skip the initial mount
  const hasInteracted = useRef(false)

  useEffect(() => {
    if (!hasInteracted.current) return
    onSearch(debouncedValue)
  }, [debouncedValue, onSearch])

  const handleChange = (e) => {
    hasInteracted.current = true
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    hasInteracted.current = true
    setInputValue('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search products…"
        value={inputValue}
        onChange={handleChange}
        aria-label="Search products"
      />
      {inputValue && (
        <button
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default SearchBar
