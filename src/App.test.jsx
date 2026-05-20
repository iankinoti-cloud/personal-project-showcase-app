import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import ProductsContext from './context/ProductsContext'

// Minimal context value so pages that call useProducts() don't crash
const mockContextValue = {
  products: [],
  loading: false,
  error: null,
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  refresh: vi.fn(),
}

function renderAt(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ProductsContext.Provider value={mockContextValue}>
        <App />
      </ProductsContext.Provider>
    </MemoryRouter>
  )
}

describe('App routing', () => {
  it('renders HomePage at "/"', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /PixelGear Admin/i })).toBeInTheDocument()
  })

  it('renders ProductsPage at "/products"', () => {
    renderAt('/products')
    expect(screen.getByText(/catalogue/i)).toBeInTheDocument()
  })

  it('renders NewProductPage at "/products/new"', () => {
    renderAt('/products/new')
    expect(screen.getByText(/add new product/i)).toBeInTheDocument()
  })

  it('renders AboutPage at "/about"', () => {
    renderAt('/about')
    expect(screen.getByText(/about pixelgear/i)).toBeInTheDocument()
  })

  it('renders NotFoundPage for unknown routes', () => {
    renderAt('/does-not-exist')
    expect(screen.getByText(/404/i)).toBeInTheDocument()
  })
})
