import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ServicesOverview.css'

export default function ServicesOverview() {
  const [coords, setCoords] = useState({ x: '50%', y: '-20%' })
  const [bgState, setBgState] = useState('default')
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      setCoords({ x: `${e.clientX}px`, y: `${e.clientY}px` })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const winHeight = window.innerHeight

      const detailEl = document.getElementById('services-detail')
      const detailOffset = detailEl ? detailEl.offsetTop - (winHeight * 0.4) : 400

      if (scrollPos > detailOffset) {
        setBgState('scrolled')
      } else {
        setBgState('default')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div className="services-overview-wrapper">
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
      <div 
        className="grid-spotlight" 
        style={{ 
          '--mx': coords.x, 
          '--my': coords.y,
          opacity: (isSpotlightVisible && bgState === 'default') ? 1 : 0
        }}
        aria-hidden="true"
      ></div>
      <div className="vignette" aria-hidden="true"></div>

      {/* Hero Section */}
      <section 
        className="hero-section" 
        id="hero"
        onMouseEnter={() => setIsSpotlightVisible(true)}
        onMouseLeave={() => setIsSpotlightVisible(false)}
      >
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
              Our <span className="accent">services</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              From strategy to execution — we deliver end-to-end data and technology solutions that drive real business outcomes.
            </p>
          </div>

          <div className="hero-visual fade-up" style={{ animationDelay: '.25s' }} aria-hidden="true">
            <div className="hero-visual-ring"></div>
            <div className="hero-chart">
              <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
                <rect className="chart-panel" x="8" y="8" width="384" height="264" rx="12"/>
                <g stroke="rgba(2,245,161,0.12)" strokeWidth="1">
                  <line x1="48" y1="48" x2="352" y2="48" />
                  <line x1="48" y1="96" x2="352" y2="96" />
                  <line x1="48" y1="144" x2="352" y2="144" />
                  <line x1="48" y1="192" x2="352" y2="192" />
                  <line x1="48" y1="228" x2="352" y2="228" />
                </g>
                <g fill="var(--accent)">
                  <rect className="bar-strategy" x="72" y="156" width="32" height="68" rx="8" opacity="0.88" />
                  <rect className="bar-analytics" x="140" y="118" width="32" height="106" rx="8" opacity="0.92" />
                  <rect className="bar-systems" x="208" y="92" width="32" height="132" rx="8" opacity="0.96" />
                  <rect className="bar-software" x="276" y="68" width="32" height="156" rx="8" opacity="1" />
                </g>
                <line x1="48" y1="228" x2="352" y2="228" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <text x="72" y="249" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="10">Strategy</text>
                <text x="140" y="249" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="10">Analytics</text>
                <text x="208" y="249" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="10">Systems</text>
                <text x="276" y="249" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="10">Software</text>
                <text x="48" y="34" fill="var(--accent)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="500">Operational efficiency</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail List */}
      <section className="services-detail" id="services-detail">
        <div className="services-grid">
          {/* 1. Data Strategy */}
          <article 
            className="service-card fade-up" 
            style={{ animationDelay: '.15s' }}
            onMouseMove={handleCardMouseMove}
          >
            <div className="spotlight-glow" aria-hidden="true"></div>
            <span className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </span>
            <h3>Data Strategy</h3>
            <p className="description">
              Turn raw data into a competitive advantage. We define the roadmap to capture, store, and leverage your data assets for maximum business impact.
            </p>
            <ul className="offerings">
              <li>Data maturity assessments & gap analysis</li>
              <li>Data governance & architecture design</li>
              <li>Roadmap planning & implementation strategy</li>
            </ul>
            <Link to="/services/data-strategy" className="service-link">Explore Data Strategy</Link>
          </article>

          {/* 2. Predictive Analytics */}
          <article 
            className="service-card fade-up" 
            style={{ animationDelay: '.2s' }}
            onMouseMove={handleCardMouseMove}
          >
            <div className="spotlight-glow" aria-hidden="true"></div>
            <span className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                <polyline points="16 7 22 7 22 13"/>
              </svg>
            </span>
            <h3>Predictive Analytics</h3>
            <p className="description">
              Anticipate the future with confidence. We build advanced AI and machine learning models that predict behavior, optimise operations, and reduce risk.
            </p>
            <ul className="offerings">
              <li>Custom ML model development & deployment</li>
              <li>Customer churn, demand, and risk forecasting</li>
              <li>Real-time anomaly detection & alerting</li>
            </ul>
            <Link to="/services/predictive-analytics" className="service-link">Explore Predictive Analytics</Link>
          </article>

          {/* 3. Data Systems */}
          <article 
            className="service-card fade-up" 
            style={{ animationDelay: '.25s' }}
            onMouseMove={handleCardMouseMove}
          >
            <div className="spotlight-glow" aria-hidden="true"></div>
            <span className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
                <path d="M3 12a9 3 0 0 0 18 0"/>
              </svg>
            </span>
            <h3>Data Systems</h3>
            <p className="description">
              Build the backbone of your data-driven future. We design and implement scalable, secure data pipelines that ensure your data is always ready and reliable.
            </p>
            <ul className="offerings">
              <li>Data pipeline & ETL/ELT architecture</li>
              <li>Cloud data warehousing (Snowflake, BigQuery, etc.)</li>
              <li>Data integration & API orchestration</li>
            </ul>
            <Link to="/services/data-systems" className="service-link">Explore Data Systems</Link>
          </article>

          {/* 4. Custom Software */}
          <article 
            className="service-card fade-up" 
            style={{ animationDelay: '.3s' }}
            onMouseMove={handleCardMouseMove}
          >
            <div className="spotlight-glow" aria-hidden="true"></div>
            <span className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
                <polyline points="8 9 10 11 8 13"/>
                <polyline points="16 9 14 11 16 13"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
              </svg>
            </span>
            <h3>Custom Software</h3>
            <p className="description">
              Built for your unique challenges. From MVPs to enterprise platforms, we engineer digital products that solve specific problems and scale seamlessly.
            </p>
            <ul className="offerings">
              <li>Full-stack web & mobile application development</li>
              <li>API-first architecture & microservices</li>
              <li>Legacy system modernisation & migration</li>
            </ul>
            <Link to="/services/custom-software" className="service-link">Explore Custom Software</Link>
          </article>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="consultation-banner fade-up" style={{ animationDelay: '.35s' }}>
        <div className="banner-container">
          <h2>Ready to transform your data operations?</h2>
          <p>Get in touch with our team of experts and discover how Pentalogic can help you turn signals into foresight.</p>
          <Link to="/contact" className="btn btn-primary">Book a consultation</Link>
        </div>
      </section>
    </div>
  )
}
