import { Link } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'
import './ProductCard.css'

function ProductCard({ product }) {
  const [favorites, setFavorites] = useLocalStorage('pg_favorites', [])
  const isFav = favorites.includes(product.id)

  const toggleFav = (e) => {
    e.preventDefault()
    setFavorites((prev) =>
      isFav ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    )
  }

  const stockClass =
    product.stock === 0
      ? 'badge badge-out'
      : product.stock <= 5
      ? 'badge badge-low'
      : 'badge badge-ok'

  return (
    <Link to={`/products/${product.id}`} className="product-card" aria-label={product.name}>
      <div className="card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=No+Image' }}
        />
        <button
          className={`fav-btn ${isFav ? 'fav-active' : ''}`}
          onClick={toggleFav}
          aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
          title={isFav ? 'Remove from favourites' : 'Add to favourites'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
        <span className="category-pill">{product.category}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description.slice(0, 80)}…</p>

        <div className="card-meta">
          <span className="card-price">${product.price.toFixed(2)}</span>
          <span className="card-rating">⭐ {product.rating}</span>
        </div>

        <div className="card-footer">
          <span className={stockClass}>
            {product.stock === 0
              ? 'Out of Stock'
              : product.stock <= 5
              ? `Only ${product.stock} left`
              : `In Stock (${product.stock})`}
          </span>
          <span className="card-tags">
            {product.tags.slice(0, 2).map((t) => (
              <span key={t} className="tag">
                #{t}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
