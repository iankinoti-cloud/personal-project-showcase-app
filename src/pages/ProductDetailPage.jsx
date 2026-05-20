import { useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useProducts } from '../context/ProductsContext'
import ProductForm from '../components/ProductForm/ProductForm'
import './ProductDetailPage.css'

const API = 'http://localhost:3001'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateProduct, deleteProduct } = useProducts()

  const [refreshKey, setRefreshKey] = useState(0)
  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  const { data: product, loading, error } = useFetch(`${API}/products/${id}`, [refreshKey])

  const [editMode, setEditMode] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleUpdate = async (payload) => {
    await updateProduct(id, payload)
    refresh()
    setEditMode(false)
  }

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setDeleting(true)
    await deleteProduct(id)
    navigate('/products')
  }

  if (loading) return <p className="status-msg">Loading product...</p>
  if (error || !product) return (
    <div className="detail-error">
      <p className="status-msg error">Product not found or API unavailable.</p>
      <Link to="/products" className="btn btn-outline">Back to Catalogue</Link>
    </div>
  )

  const stockClass =
    product.stock === 0 ? 'badge badge-out' :
    product.stock <= 5  ? 'badge badge-low' : 'badge badge-ok'

  return (
    <div className="detail-page">
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span className="crumb-sep">/</span>
        <Link to="/products">Products</Link>
        <span className="crumb-sep">/</span>
        <span className="crumb-current">{product.name}</span>
      </nav>

      {editMode ? (
        <div className="detail-edit-panel">
          <h2 className="panel-title">Edit Product</h2>
          <ProductForm
            initialValues={{
              ...product,
              tags: Array.isArray(product.tags) ? product.tags.join(', ') : product.tags,
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditMode(false)}
            submitLabel="Save Changes"
          />
        </div>
      ) : (
        <div className="detail-layout">
          <div className="detail-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="detail-image"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=No+Image' }}
            />
            {product.featured && <span className="featured-ribbon">Featured</span>}
          </div>

          <div className="detail-info">
            <div className="detail-cats">
              <span className="category-pill">{product.category}</span>
              {product.tags?.map((t) => <span key={t} className="tag">#{t}</span>)}
            </div>

            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-meta-row">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              <span className="detail-rating">&#9733; {product.rating}</span>
              <span className={stockClass}>
                {product.stock === 0 ? 'Out of Stock' :
                 product.stock <= 5  ? `Only ${product.stock} left` :
                 `In Stock (${product.stock})`}
              </span>
            </div>

            <p className="detail-desc">{product.description}</p>

            <p className="detail-meta-small">
              Added: {new Date(product.createdAt).toLocaleDateString('en-GB', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </p>

            <div className="detail-actions">
              <button className="btn btn-outline" onClick={() => setEditMode(true)}>
                Edit Product
              </button>
              <button
                className={`btn ${confirmDelete ? 'btn-danger-solid' : 'btn-danger'}`}
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : confirmDelete ? 'Confirm Delete' : 'Delete'}
              </button>
              {confirmDelete && (
                <button className="btn btn-outline" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage
