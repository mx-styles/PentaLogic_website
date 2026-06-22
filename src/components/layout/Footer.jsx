import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span class="logo-dot"></span>
            Pentalogic
          </Link>
          <p>Intelligence that sees first. Data, analytics, technology, and predictive intelligence consultancy.</p>
        </div>

        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><Link to="/services/data-strategy">Data Strategy</Link></li>
            <li><Link to="/services/predictive-analytics">Predictive Analytics</Link></li>
            <li><Link to="/services/data-systems">Data Systems</Link></li>
            <li><Link to="/services/custom-software">Custom Software</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Resources</h5>
          <ul>
            <li><Link to="/blog">Insights</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Legal</h5>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><a href="#cookies">Cookies</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Pentalogic Consultancy. All rights reserved.</span>
        <div className="legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
