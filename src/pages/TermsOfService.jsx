import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TermsOfService.css'

export default function TermsOfService() {
  const [bgState, setBgState] = useState('default')

  useEffect(() => {
    document.title = "Terms of Service | Pentalogic Consultancy"
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', "Read Pentalogic Consultancy's Terms of Service to understand the rules and guidelines for using our website and services.")
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
    <div className="terms-wrapper">
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
              Terms of <span class="accent">Service.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Rules and guidelines for using our website and engaging with our consultancy services.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Detail */}
      <section className="legal-detail">
        <span className="last-updated">Last updated: 16 June 2026</span>

        <div className="terms-content">
          <p>
            Welcome to Pentalogic Consultancy. By accessing our website, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2>1. Use of the Website</h2>
          <p>
            The content of this website is for your general information and use only. It is subject to change without notice.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics.
          </p>

          <h2>3. Disclaimer</h2>
          <p>
            Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website.
          </p>
        </div>

        <Link to="/" className="terms-back-btn">
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
