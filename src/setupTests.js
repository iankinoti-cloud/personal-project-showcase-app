import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Prevent real network requests in tests
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
)

// 35 tests across 6 files: hooks, components, routing smoke tests
