import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  const [bgState, setBgState] = useState('default')

  useEffect(() => {
    document.title = "Privacy Policy | Pentalogic Consultancy"
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', "Read Pentalogic Consultancy's Privacy Policy to understand how we collect, use, store, and protect your personal information.")
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY
      if (scrollPos > 80) {
        setBgState('scrolled')
      } else {
        setBgState('default')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      document.title = "Pentalogic Consultancy | Intelligence that sees first"
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="privacy-wrapper">
      {/* Background layers */}
      <div className="bg-layers" aria-hidden="true">
        <div 
          className="bg-layer bg-layer--default" 
          style={{ opacity: bgState === 'default' ? 1 : 0 }}
        >
          <div className="bg-ghost">
            <img src="/assets/images/hero-headset.png" alt="" />
          </div>
        </div>
        <div 
          className="bg-layer bg-layer--scroll" 
          style={{ opacity: bgState === 'scrolled' ? 1 : 0 }}
        >
          <div className="bg-full">
            <img src="/assets/images/hero-headset.png" alt="" />
          </div>
        </div>
      </div>
      <div className="grid-overlay" aria-hidden="true"></div>
      <div className="vignette" aria-hidden="true"></div>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
              Privacy <span className="accent">Policy.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Transparency is at the core of our intelligence. Learn how we handle your data with the highest standards of care.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Detail */}
      <section className="legal-detail">
        <span className="last-updated">Last updated: 22 June 2026</span>

        <div className="privacy-content">
          <p className="lead">
            Pentalogic Consultancy ("Pentalogic", "we", "us", or "our") is dedicated to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
          </p>

          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and share personal information when you visit our website or interact with our services. We comply with applicable data protection laws, including the Protection of Personal Information Act (POPIA) in South Africa and international best practices.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect following categories of information:</p>
          <ul>
            <li><strong>Contact Information:</strong> Name, professional title, email address, and phone number when you enquire about our services.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, location data, and operating system collected via cookies and server logs.</li>
            <li><strong>Usage Information:</strong> Information about how you navigate and interact with our website to improve user experience.</li>
          </ul>

          <h2>3. Cookies and Tracking</h2>
          <p>
            We use cookies to analyze web traffic and optimize your experience. Our cookie matrix includes:
          </p>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Purpose</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Essential</td>
                  <td>Core site functionality and security</td>
                  <td>Strictly Necessary</td>
                </tr>
                <tr>
                  <td>Analytics</td>
                  <td>Understanding visitor behavior and site performance</td>
                  <td>Performance</td>
                </tr>
                <tr>
                  <td>Functional</td>
                  <td>Remembering user preferences</td>
                  <td>Preferences</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. How We Use Data</h2>
          <p>We use your information strictly for professional purposes, including:</p>
          <ul>
            <li>Providing and managing consultancy services.</li>
            <li>Responding to requests and communications.</li>
            <li>Maintaining and improving our technical infrastructure.</li>
            <li>Complying with legal and regulatory obligations.</li>
          </ul>

          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or request the deletion of your personal information. If you are located in South Africa, you have specific rights under POPIA ensuring transparency and control over your data.
          </p>

          <h2>6. Data Security</h2>
          <p>
            We implement industry-standard encryption and security protocols to prevent unauthorized access, alteration, or disclosure of your data. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            For any privacy-related inquiries or to exercise your data rights, please contact our Data Protection Lead at:
            <br />
            <strong>Email:</strong> privacy@pentalogic.co.za
          </p>
        </div>

        <Link to="/" className="privacy-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>
      </section>
    </div>
  )
}
