import { Link } from 'react-router-dom'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-sub">The page you are looking for does not exist or has been moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/products" className="btn btn-outline">Browse Products</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
