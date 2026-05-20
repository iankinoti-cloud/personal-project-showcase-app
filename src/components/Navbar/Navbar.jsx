import { NavLink, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleSearch = useCallback((query) => {
    if (query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/products')
    }
  }, [navigate])

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="brand-link">
          <span className="brand-name">PixelGear</span>
          <span className="brand-badge">Admin</span>
        </NavLink>
      </div>

      <nav className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Products
        </NavLink>
        <NavLink to="/products/new" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          + Add
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          About
        </NavLink>
      </nav>

      <SearchBar onSearch={handleSearch} />
    </header>
  )
}

export default Navbar
