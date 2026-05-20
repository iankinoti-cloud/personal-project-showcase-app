import { Link } from 'react-router-dom'
import './AboutPage.css'

function AboutPage() {
  return (
    <div className="about-page">

      <div className="about-hero">
        <h1>About PixelGear</h1>
        <p>Your retro gaming hardware headquarters since 2025.</p>
      </div>

      <div className="about-grid">

        <div className="about-card">
          <div className="about-icon-wrap">[MISSION]</div>
          <h3 className="about-card-title">Our Mission</h3>
          <p className="about-card-body">To make classic gaming hardware accessible, affordable, and preserved for every generation of gamer.</p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrap">[CATALOGUE]</div>
          <h3 className="about-card-title">What We Sell</h3>
          <ul className="about-list">
            <li>Retro Consoles (SNES, N64, Sega, PS1)</li>
            <li>Handhelds (Game Boy, GBA, Neo Geo Pocket)</li>
            <li>Controllers and Arcade Sticks</li>
            <li>CRT Displays and Accessories</li>
            <li>DIY Kits and Raspberry Pi Bundles</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-icon-wrap">[QUALITY]</div>
          <h3 className="about-card-title">Quality Promise</h3>
          <p className="about-card-body">Every item is tested, cleaned, and graded before listing. Refurbished units carry our 30-day quality guarantee.</p>
        </div>

        <div className="about-card">
          <div className="about-icon-wrap">[TECH]</div>
          <h3 className="about-card-title">Admin Portal</h3>
          <p className="about-card-body">This portal uses React 18, React Router, Vite, and json-server for full CRUD, live search, and a responsive dark-mode design.</p>
        </div>

      </div>

      <div className="about-tech">
        <h2 className="about-stack-title">Tech Stack</h2>
        <div className="tech-pills">
          <span className="tech-pill">React 18</span>
          <span className="tech-pill">React Router v7</span>
          <span className="tech-pill">Vite</span>
          <span className="tech-pill">json-server</span>
          <span className="tech-pill">Vitest</span>
          <span className="tech-pill">React Testing Library</span>
          <span className="tech-pill">CSS</span>
        </div>
      </div>

      <div className="about-cta">
        <Link to="/products" className="btn btn-primary">Browse Catalogue</Link>
        <Link to="/products/new" className="btn btn-outline">Add Product</Link>
      </div>

    </div>
  )
}

export default AboutPage
