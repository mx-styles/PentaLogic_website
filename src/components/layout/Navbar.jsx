import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={`nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-dot"></span>
          Pentalogic
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Insights
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Desktop CTA */}
        <button className="nav-cta" onClick={() => { closeMenu(); navigate('/contact'); }}>
          Request a quote
        </button>

        {/* Hamburger Menu Button */}
        <button 
          className={`nav__toggle ${isMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
          <span className="nav__toggle-bar"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`nav-overlay ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-overlay-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              Insights
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
        <button className="nav-overlay-cta" onClick={() => { closeMenu(); navigate('/contact'); }}>
          Request a quote
        </button>
      </div>
    </header>
  )
}
