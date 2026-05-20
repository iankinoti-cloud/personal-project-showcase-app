import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { useProducts } from '../context/ProductsContext'
import ProductCard from '../components/ProductCard/ProductCard'
import useScrollY from '../hooks/useScrollY'
import './HomePage.css'

function HomePage() {
  const { products, loading, error } = useProducts()
  const scrollY = useScrollY()

  const featured = useMemo(
    () => (products ? products.filter((p) => p.featured) : []),
    [products]
  )

  const stats = useMemo(() => {
    if (!products) return null
    return {
      total: products.length,
      categories: [...new Set(products.map((p) => p.category))].length,
      lowStock: products.filter((p) => p.stock <= 5).length,
    }
  }, [products])

  const parallaxOffset = scrollY * 0.38

  return (
    <div className="home-page">

      {/* Hero with parallax background layer */}
      <section className="hero">
        <div
          className="hero-bg"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          aria-hidden="true"
        />
        <div className="hero-content">
          <h1 className="hero-title pixel">PixelGear Admin</h1>
          <p className="hero-subtitle">Manage consoles, handhelds, controllers, and rare collectibles all in one place.</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Browse Catalogue</Link>
            <Link to="/products/new" className="btn btn-outline">+ Add Product</Link>
          </div>
        </div>
        <div className="hero-tags">
          <span className="hero-tag">Retro Gaming</span>
          <span className="hero-tag">Refurbished</span>
          <span className="hero-tag">In-Stock</span>
          <span className="hero-tag">Curated</span>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="stats-strip">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Products</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.categories}</span>
            <span className="stat-label">Categories</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.lowStock}</span>
            <span className="stat-label">Low Stock</span>
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Listings</h2>
          <Link to="/products" className="see-all-link">See all</Link>
        </div>

        {loading && <p className="status-msg">Loading products...</p>}
        {error && <p className="status-msg error">Could not load products. Is json-server running?</p>}
        {!loading && !error && featured.length === 0 && (
          <p className="status-msg">No featured products yet. Add some and mark them as featured.</p>
        )}

        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default HomePage
