import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard/ProductCard'
import './ProductsPage.css'

const CATEGORIES = ['All', 'Consoles', 'Handhelds', 'Controllers', 'Displays', 'DIY & Kits']

function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')

  const query = (searchParams.get('q') || '').toLowerCase()

  const filtered = useMemo(() => {
    if (!products) return []
    return products
      .filter((p) => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory
        const matchQ =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.includes(query)) ||
          p.category.toLowerCase().includes(query)
        return matchCat && matchQ
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'stock') return b.stock - a.stock
        return a.name.localeCompare(b.name)
      })
  }, [products, activeCategory, query, sortBy])

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="page-title">Product Catalogue</h1>
          {query && (
            <p className="search-result-info">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
        <Link to="/products/new" className="btn btn-primary">+ Add Product</Link>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products"
        >
          <option value="name">Sort: Name A–Z</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Top Rated</option>
          <option value="stock">Most Stock</option>
        </select>
      </div>

      {loading && <p className="status-msg">Loading products...</p>}
      {error && <p className="status-msg error">{error} - make sure json-server is running on port 3001.</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="status-msg">No products found{query ? ` for "${query}"` : ''}.</p>
      )}

      {!loading && !error && (
        <p className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
      )}

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
