import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductForm from './ProductForm'

const defaultProps = {
  onSubmit: vi.fn(),
  submitLabel: 'Save Product',
}

describe('ProductForm', () => {
  it('renders all required fields', () => {
    render(<ProductForm {...defaultProps} />)
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^stock/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
  })

  it('renders the submit button with the correct label', () => {
    render(<ProductForm {...defaultProps} submitLabel="Add Item" />)
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument()
  })

  it('shows Saving... on the submit button while an async submit is in progress', async () => {
    // onSubmit returns a Promise that never resolves — keeps submitting=true
    const onSubmit = vi.fn(() => new Promise(() => {}))
    render(<ProductForm onSubmit={onSubmit} submitLabel="Save Product" />)

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'SNES' } })
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '50' } })
    fireEvent.change(screen.getByLabelText(/^stock/i), { target: { value: '5' } })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save product/i }))
    })

    expect(screen.getByRole('button', { name: /saving/i })).toBeDisabled()
  })

  it('populates fields with initialValues', () => {
    render(
      <ProductForm
        {...defaultProps}
        initialValues={{ name: 'Game Boy Color', price: 49.99, stock: 5, category: 'Handhelds', description: 'A portable gem.' }}
      />
    )
    expect(screen.getByDisplayValue('Game Boy Color')).toBeInTheDocument()
    expect(screen.getByDisplayValue('49.99')).toBeInTheDocument()
    expect(screen.getByDisplayValue('5')).toBeInTheDocument()
  })

  it('calls onSubmit with form values on submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<ProductForm onSubmit={onSubmit} submitLabel="Save Product" />)

    fireEvent.change(screen.getByLabelText(/^name/i), { target: { value: 'NES Classic' } })
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '59.99' } })
    fireEvent.change(screen.getByLabelText(/^stock/i), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'A great retro console.' } })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save product/i }))
    })

    await waitFor(() => { expect(onSubmit).toHaveBeenCalledOnce() })

    const [payload] = onSubmit.mock.calls[0]
    expect(payload.name).toBe('NES Classic')
    expect(Number(payload.price)).toBe(59.99)
    expect(Number(payload.stock)).toBe(7)
  })

  it('shows a validation error when required fields are empty', async () => {
    render(<ProductForm {...defaultProps} />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /save product/i }))
    })
    await waitFor(() => {
      expect(screen.getByText(/name, price, and stock are required/i)).toBeInTheDocument()
    })
  })
})
