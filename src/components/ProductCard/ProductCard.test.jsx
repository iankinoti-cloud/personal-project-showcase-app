import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const mockProduct = {
  id: 'test-1',
  name: 'SNES Classic Mini',
  price: 79.99,
  category: 'Consoles',
  stock: 10,
  rating: 4.8,
  image: 'https://placehold.co/400x300',
  description: 'The classic Super Nintendo Entertainment System in miniature form.',
  tags: ['nintendo', 'retro'],
  featured: false,
}

function renderCard(product = mockProduct) {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  )
}

describe('ProductCard', () => {
  it('renders the product name', () => {
    renderCard()
    expect(screen.getByText('SNES Classic Mini')).toBeInTheDocument()
  })

  it('renders the formatted price', () => {
    renderCard()
    expect(screen.getByText('$79.99')).toBeInTheDocument()
  })

  it('renders the category pill', () => {
    renderCard()
    expect(screen.getByText('Consoles')).toBeInTheDocument()
  })

  it('renders the rating', () => {
    renderCard()
    expect(screen.getByText(/4\.8/)).toBeInTheDocument()
  })

  it('shows In Stock badge when stock > 5', () => {
    renderCard()
    expect(screen.getByText(/in stock/i)).toBeInTheDocument()
  })

  it('shows Only N left badge when stock <= 5', () => {
    renderCard({ ...mockProduct, stock: 3 })
    expect(screen.getByText(/only 3 left/i)).toBeInTheDocument()
  })

  it('shows Out of Stock badge when stock is 0', () => {
    renderCard({ ...mockProduct, stock: 0 })
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument()
  })

  it('renders a link to the product detail page', () => {
    renderCard()
    const link = screen.getByRole('link', { name: /snes classic mini/i })
    expect(link).toHaveAttribute('href', '/products/test-1')
  })

  it('renders the favourite button', () => {
    renderCard()
    expect(screen.getByRole('button', { name: /favourites/i })).toBeInTheDocument()
  })

  it('truncates the description to 80 characters', () => {
    renderCard()
    const desc = screen.getByText(/the classic super nintendo/i)
    expect(desc.textContent.length).toBeLessThanOrEqual(85)
  })
})
