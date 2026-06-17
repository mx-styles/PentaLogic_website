import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid var(--accent-border)', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>Pentalogic</Link>
        <Link to="/" style={{ color: 'var(--white)', textDecoration: 'none' }}>Home</Link>
        <Link to="/services" style={{ color: 'var(--white)', textDecoration: 'none' }}>Services</Link>
        <Link to="/about" style={{ color: 'var(--white)', textDecoration: 'none' }}>About</Link>
        <Link to="/blog" style={{ color: 'var(--white)', textDecoration: 'none' }}>Insights</Link>
        <Link to="/contact" style={{ color: 'var(--white)', textDecoration: 'none' }}>Contact</Link>
      </div>
    </nav>
  )
}
