import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './Layout.css'

function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2025 PixelGear Admin — Retro Gaming Headquarters</p>
      </footer>
    </div>
  )
}

export default Layout

// Layout provides the shared chrome: sticky Navbar + routed main content + footer
