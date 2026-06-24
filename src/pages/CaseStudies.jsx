import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CaseStudies.css'

const CASE_STUDIES = [
  {
    title: 'B2B Retail Stream Ingestion Re-engineering',
    sector: 'Retail Analytics',
    challenge: 'Legacy batch infrastructure struggled with real-time multi-million transaction streams, causing query timeouts and client dashboard lag.',
    solution: 'Re-engineered data systems to leverage distributed message queues and column-oriented caching, replacing daily batch updates with high-throughput stream processing.',
    metricNum: '+320%',
    metricLabel: 'Ingestion Velocity'
  },
  {
    title: 'Real-Time Portfolio Churn Risk Prediction',
    sector: 'Financial Services',
    challenge: 'A tier-1 investment firm suffered high client churn due to latency in detecting risk patterns and manually routing cases to relationship managers.',
    solution: 'Wired dynamic churn detection algorithms into transaction stream queues, automatically surfacing alert payloads and routing managers within 15 minutes.',
    metricNum: '-42%',
    metricLabel: 'Client Attrition'
  },
  {
    title: 'Supply Chain Dispatch Route Optimization',
    sector: 'Logistics',
    challenge: 'Manual fleet loading and rigid routing caused excessive fuel overhead, empty carrier mileage, and dispatcher resource bottlenecks.',
    solution: 'Engineered a custom fleet management application integrating route optimization algorithms and live carrier telemetry, eliminating empty haul segments.',
    metricNum: '-$1.2M',
    metricLabel: 'Fuel Overhead Saved'
  }
]

export default function CaseStudies() {
  const [bgState, setBgState] = useState('default')

  useEffect(() => {
    document.title = "Case Studies | Pentalogic Consultancy"
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', "Review Pentalogic's client case studies, solved challenges, custom implementations, and operational business outcomes.")
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

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div className="case-studies-wrapper">
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
              Proven <span className="accent">impact.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Real outcomes, structured engineering, and custom data platforms built to solve operational bottlenecks at scale.
            </p>
          </div>

          <div className="hero-visual fade-up" style={{ animationDelay: '.25s' }}>
            <div className="hero-visual-ring" aria-hidden="true"></div>
            <div className="hero-chart" role="img" aria-label="Operational metrics dashboard visual">
              <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect className="dashboard-bg" x="8" y="8" width="384" height="264" rx="12" />
                <circle className="dashboard-ring" cx="120" cy="140" r="70" strokeDasharray="300 100" transform="rotate(-210 120 140)" />
                <circle className="dashboard-dial" cx="120" cy="140" r="70" />
                <g className="dashboard-needle" transform="translate(120, 140) rotate(-30)">
                  <line x1="0" y1="0" x2="0" y2="-60" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="6" fill="var(--white)" />
                </g>
                <text x="66" y="235" fill="var(--accent)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="600">OPERATIONAL EFF</text>
                <g transform="translate(260, 60)">
                  <line className="dashboard-grid" x1="0" y1="0" x2="100" y2="0" />
                  <line className="dashboard-grid" x1="0" y1="40" x2="100" y2="40" />
                  <line className="dashboard-grid" x1="0" y1="80" x2="100" y2="80" />
                  <line className="dashboard-grid" x1="0" y1="120" x2="100" y2="120" />
                  <rect className="bar-inactive" x="10" y="0" width="20" height="120" rx="2" />
                  <rect className="bar-active bar-1" x="10" y="40" width="20" height="80" rx="2" />
                  <rect className="bar-inactive" x="40" y="0" width="20" height="120" rx="2" />
                  <rect className="bar-active bar-2" x="40" y="15" width="20" height="105" rx="2" />
                  <rect className="bar-inactive" x="70" y="0" width="20" height="120" rx="2" />
                  <rect className="bar-active bar-3" x="70" y="65" width="20" height="55" rx="2" />
                </g>
                <text x="260" y="200" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="9">EFFICIENCY GAINS</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Cards Grid */}
      <section className="case-studies-detail">
        <div className="about-section">
          <p className="section-label">Case Studies</p>
          <h2>Proven Operations <span className="highlight">in Action</span></h2>
          <p className="case-studies-lead">
            We don't believe in vanity metrics or empty slide decks. We measure our success by the concrete scalability gains, cost reductions, and structural delivery outcomes of our implementations.
          </p>

          <div className="case-studies-grid">
            {CASE_STUDIES.map((study, index) => (
              <div 
                key={index} 
                className="case-study-card"
                onMouseMove={handleMouseMove}
              >
                <div className="spotlight-glow" aria-hidden="true"></div>
                <div className="card-header-row">
                  <span className="sector-tag">{study.sector}</span>
                </div>
                <h3>{study.title}</h3>
                <div className="case-study-sections">
                  <div className="case-section">
                    <h4>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div className="case-section">
                    <h4>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                </div>
                <div className="metric-box">
                  <span className="metric-num">{study.metricNum}</span>
                  <span className="metric-label">{study.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Banner */}
          <div className="consultation-banner">
            <div className="consultation-content">
              <h3>Have a complex data or engineering bottleneck?</h3>
              <p>Let's map out a solution tailored to your operational models. Our senior architects own engagements end-to-end.</p>
            </div>
            <div className="consultation-action">
              <Link to="/contact" className="btn-primary">
                Schedule a briefing
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
