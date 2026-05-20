import { useState } from 'react'
import './ProductForm.css'

const CATEGORIES = ['Consoles', 'Handhelds', 'Controllers', 'Displays', 'DIY & Kits']

const EMPTY = {
  name: '',
  price: '',
  category: 'Consoles',
  stock: '',
  rating: '',
  image: '',
  description: '',
  tags: '',
  featured: false,
}

function ProductForm({ initialValues = {}, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState({ ...EMPTY, ...initialValues })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      rating: parseFloat(form.rating),
      tags: typeof form.tags === 'string'
        ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : form.tags,
    }

    if (!payload.name || isNaN(payload.price) || isNaN(payload.stock)) {
      setError('Name, price, and stock are required.')
      return
    }

    try {
      setSubmitting(true)
      await onSubmit(payload)
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      {error && <p className="form-error">{error}</p>}

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="pf-name">Name *</label>
          <input
            id="pf-name"
            className="form-input"
            type="text"
            value={form.name}
            onChange={set('name')}
            required
            placeholder="e.g. Super Nintendo Classic"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pf-category">Category *</label>
          <select
            id="pf-category"
            className="form-input"
            value={form.category}
            onChange={set('category')}
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pf-price">Price (USD) *</label>
          <input
            id="pf-price"
            className="form-input"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={set('price')}
            required
            placeholder="e.g. 79.99"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pf-stock">Stock *</label>
          <input
            id="pf-stock"
            className="form-input"
            type="number"
            min="0"
            value={form.stock}
            onChange={set('stock')}
            required
            placeholder="e.g. 10"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pf-rating">Rating (0–5)</label>
          <input
            id="pf-rating"
            className="form-input"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={set('rating')}
            placeholder="e.g. 4.7"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="pf-image">Image URL</label>
          <input
            id="pf-image"
            className="form-input"
            type="url"
            value={form.image}
            onChange={set('image')}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="form-group form-group--full">
        <label className="form-label" htmlFor="pf-desc">Description</label>
        <textarea
          id="pf-desc"
          className="form-input form-textarea"
          value={form.description}
          onChange={set('description')}
          rows={3}
          placeholder="Describe the product..."
        />
      </div>

      <div className="form-group form-group--full">
        <label className="form-label" htmlFor="pf-tags">Tags (comma-separated)</label>
        <input
          id="pf-tags"
          className="form-input"
          type="text"
          value={typeof form.tags === 'string' ? form.tags : form.tags?.join(', ')}
          onChange={set('tags')}
          placeholder="retro, nintendo, rare"
        />
      </div>

      <div className="form-group form-group--check">
        <label className="check-label">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={set('featured')}
          />
          <span>Mark as Featured</span>
        </label>
      </div>

      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ProductForm
