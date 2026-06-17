import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const [coords, setCoords] = useState({ x: '50%', y: '-20%' })
  const [bgState, setBgState] = useState('default')
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Disable cursor tracking on touch viewports for performance
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

      const aboutEl = document.getElementById('about')
      const aboutOffset = aboutEl ? aboutEl.offsetTop - (winHeight * 0.4) : 500

      if (scrollPos > aboutOffset) {
        setBgState('at-about')
      } else if (scrollPos > 80) {
        setBgState('scrolled')
      } else {
        setBgState('default')
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run immediately on mount
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToContact = (e) => {
    e.preventDefault()
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="home-wrapper">
      {/* Background layers */}
      <div className="bg-layers" aria-hidden="true">
        <div 
          className="bg-layer bg-layer--default" 
          style={{ opacity: bgState === 'default' ? 1 : 0 }}
        >
          <div className="bg-ghost">
            <img src="assets/images/hero-headset.png" alt="" />
          </div>
        </div>
        <div 
          className="bg-layer bg-layer--scroll" 
          style={{ opacity: bgState === 'scrolled' ? 1 : 0 }}
        >
          <div className="bg-full">
            <img src="assets/images/hero-headset.png" alt="" />
          </div>
        </div>
        <div 
          className="bg-layer bg-layer--about" 
          style={{ opacity: bgState === 'at-about' ? 1 : 0 }}
        >
          <div className="bg-about">
            <img src="assets/images/about-bg.png" alt="" />
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
          <div className="hero-content-block">
            <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
              Navigating the digital landscape for <span className="highlight">success.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Our team of experts excels in data strategy, predictive analytics, technology systems, and custom software — crafting tailored solutions for your business.
            </p>
            <div className="cta-row fade-up" style={{ animationDelay: '.3s' }}>
              <a href="#contact" className="btn btn-primary" onClick={scrollToContact}>
                Book a consultation
              </a>
              <Link to="/services" className="btn btn-secondary">
                Explore our work
              </Link>
            </div>
            <div className="signal fade-up" style={{ animationDelay: '.4s' }}>
              <span className="bars">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              Dive deep into our operations
            </div>
          </div>

          <div className="hero-visual fade-up" style={{ animationDelay: '.25s' }} aria-hidden="true">
            <div className="hero-visual-ring"></div>
            <div className="hero-chart">
              <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg">
                <rect className="chart-panel" x="8" y="8" width="384" height="264" rx="12" />
                <g stroke="rgba(2,245,161,0.12)" strokeWidth="1">
                  <line x1="48" y1="48" x2="48" y2="228" />
                  <line x1="48" y1="228" x2="352" y2="228" />
                  <line x1="48" y1="188" x2="352" y2="188" strokeDasharray="4 6" />
                  <line x1="48" y1="148" x2="352" y2="148" stroke-dasharray="4 6" />
                  <line x1="48" y1="108" x2="352" y2="108" stroke-dasharray="4 6" />
                  <line x1="48" y1="68" x2="352" y2="68" stroke-dasharray="4 6" />
                </g>
                <path 
                  className="chart-area" 
                  d="M48,228 L88,202 L128,208 L168,172 L208,178 L248,128 L288,102 L328,116 L352,62 L352,228 Z" 
                  fill="var(--accent-soft)"
                />
                <path 
                  className="chart-line" 
                  d="M48,228 L88,202 L128,208 L168,172 L208,178 L248,128 L288,102 L328,116 L352,62" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <g fill="var(--accent)">
                  <circle cx="88" cy="202" r="3.5" opacity="0.7" />
                  <circle cx="168" cy="172" r="3.5" opacity="0.7" />
                  <circle cx="248" cy="128" r="3.5" opacity="0.7" />
                  <circle cx="328" cy="116" r="3.5" opacity="0.7" />
                  <circle className="chart-dot--active" cx="352" cy="62" r="5" />
                </g>
                <text x="352" y="44" textAnchor="end" fill="var(--accent)" fontFamily="IBM Plex Mono, monospace" fontSize="11" fontWeight="500">+24.8%</text>
                <text x="48" y="252" fill="var(--muted-2)" fontFamily="IBM Plex Mono, monospace" fontSize="9" letterSpacing="0.8">SIGNAL TREND</text>
              </svg>
            </div>
          </div>
        </div>

        <div 
          className="scroll-hint" 
          id="scrollHint"
          style={{ 
            opacity: bgState === 'default' ? 1 : 0,
            pointerEvents: bgState === 'default' ? 'auto' : 'none'
          }}
        >
          <span>Scroll</span>
          <span className="arrow">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </span>
        </div>
      </section>

      {/* Intro Section */}
      <section className="scroll-section">
        <div className="section-container">
          <h2>Intelligence that <span className="accent">sees first.</span></h2>
          <p>
            Pentalogic is a data, analytics, technology, and predictive intelligence consultancy. We help organisations navigate complexity — turning raw signals into strategic advantage before the market moves.
          </p>
        </div>
      </section>

      {/* About Section Snippet */}
      <section className="about-section" id="about">
        <div className="section-container">
          <p className="section-label">About Pentalogic</p>
          <h2>We find clarity in complexity — and act on it <span className="highlight">early.</span></h2>
          <p className="about-lead">
            Founded on the belief that the best decisions come from seeing patterns others miss, Pentalogic partners with organisations ready to move beyond reactive reporting toward genuine predictive capability.
          </p>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                Our team brings together specialists in data strategy, predictive analytics, technology systems, and custom software. We don't deliver off-the-shelf solutions — we embed with your business to understand its signals, its constraints, and its ambitions.
              </p>
              <p>
                From designing resilient data architectures to building models that forecast what comes next, every engagement is shaped around one goal: giving you the intelligence to decide with confidence, long before the market forces your hand.
              </p>
            </div>

            <div className="about-pillars">
              <article className="about-pillar">
                <span className="about-pillar-label">Mission</span>
                <h3>Turn signals into advantage</h3>
                <p>Help organisations move from data accumulation to actionable foresight — before competitors catch up.</p>
              </article>
              <article className="about-pillar">
                <span className="about-pillar-label">Vision</span>
                <h3>Intelligence that sees first</h3>
                <p>A world where every business decision is informed by clarity, not guesswork — powered by predictive insight.</p>
              </article>
              <article className="about-pillar">
                <span className="about-pillar-label">Approach</span>
                <h3>Embedded, not outsourced</h3>
                <p>We work alongside your teams, transferring capability as we deliver — so the value outlasts the project.</p>
              </article>
            </div>
          </div>

          <div className="about-values">
            <div className="about-value">
              <span className="about-value-num">4</span>
              <p className="about-value-label">Core disciplines</p>
              <p className="about-value-desc">Data strategy, predictive analytics, data systems, and custom software under one roof.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num">360°</span>
              <p className="about-value-label">End-to-end scope</p>
              <p className="about-value-desc">From raw data pipelines to deployed models and the software that surfaces them.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num">1st</span>
              <p className="about-value-label">Mover mindset</p>
              <p className="about-value-desc">We optimise for early signal detection — not retrospective dashboards.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num">∞</span>
              <p className="about-value-label">Lasting capability</p>
              <p className="about-value-desc">Knowledge transfer built into every engagement, so your team grows with every project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="section-container">
          <p className="section-label">What we do</p>
          <h2>Where data meets <span className="accent">intelligence.</span></h2>
          <p className="services-lead">
            We don't just analyse your data – we turn it into a strategic advantage.
          </p>

          <div className="services-grid">
            <article className="service-card">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </span>
              <h3>Data Strategy</h3>
              <p>Navigate complexity with confidence. Turn raw data into a clear roadmap to capture, store, and leverage your assets for maximum impact.</p>
              <Link to="/services/data-strategy" className="service-link">Learn More</Link>
            </article>

            <article className="service-card">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </span>
              <h3>Predictive Analytics</h3>
              <p>Anticipate the future, today. Unlock foresight with advanced AI and machine learning to predict behavior, optimise operations, and reduce risk.</p>
              <Link to="/services/predictive-analytics" className="service-link">Learn More</Link>
            </article>

            <article className="service-card">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                  <path d="M3 12a9 3 0 0 0 18 0" />
                </svg>
              </span>
              <h3>Data Systems</h3>
              <p>The backbone of your data‑driven future. Design and implement scalable, secure data pipelines that ensure your data is always ready and reliable.</p>
              <Link to="/services/data-systems" className="service-link">Learn More</Link>
            </article>

            <article className="service-card">
              <span className="service-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <polyline points="8 9 10 11 8 13" />
                  <polyline points="16 9 14 11 16 13" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                </svg>
              </span>
              <h3>Custom Software</h3>
              <p>Built for your unique challenges. From MVPs to enterprise platforms, engineer custom digital products that solve specific problems and scale seamlessly.</p>
              <Link to="/services/custom-software" className="service-link">Learn More</Link>
            </article>
          </div>
        </div>
      </section>

      {/* Lead Capture / Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <p className="section-label">Get in touch</p>
          <h2>Ready to see <span className="accent">first?</span></h2>
          <p className="contact-lead">
            Let's talk about your data, your challenges, and the future you want to build.
          </p>

          <div className="contact-grid">
            {/* Intake Form */}
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Form submitted successfully!'); }}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input type="text" id="name" placeholder="Jane Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" placeholder="jane@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell us about your project..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send message</button>
            </form>

            {/* Details */}
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div className="info">
                  <span class="label">Email</span>
                  <a href="mailto:hello@pentalogic.com" className="value">hello@pentalogic.com</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="info">
                  <span class="label">Phone</span>
                  <a href="tel:+441234567890" className="value">+44 1234 567 890</a>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div className="info">
                  <span class="label">Office</span>
                  <span className="value">One Canada Square, London E14 5AB</span>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="info">
                  <span class="label">Hours</span>
                  <span className="value">Mon – Fri, 09:00 – 18:00 GMT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
