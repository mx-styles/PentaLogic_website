import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import servicesData from '../data/servicesData.json'
import './ServiceTemplate.css'

export default function ServiceTemplate() {
  const { serviceId } = useParams()
  const [coords, setCoords] = useState({ x: '50%', y: '-20%' })
  const [bgState, setBgState] = useState('default')
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false)

  const service = servicesData[serviceId]

  useEffect(() => {
    if (!service) return

    // Update document title dynamically for SEO
    document.title = `${service.title} | Pentalogic Consultancy`

    // Update meta description tag dynamically for SEO
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = service.description
  }, [serviceId, service])

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

      const detailEl = document.getElementById('service-detail-section')
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
  }, [serviceId])

  if (!service) {
    return (
      <div className="service-error-wrapper">
        <div className="service-error-container">
          <h2>Service Category Not Found</h2>
          <p>The page you are trying to reach does not exist or has been relocated.</p>
          <Link to="/services" className="btn btn-primary">Return to Services</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="service-template-wrapper">
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
          <div className="hero-content-block">
            <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
              {service.title}<span className="accent">.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              {service.tagline}
            </p>
            <div className="cta-row fade-up" style={{ animationDelay: '.3s' }}>
              <a href="#service-detail-section" className="btn btn-primary" onClick={(e) => {
                e.preventDefault()
                document.getElementById('service-detail-section')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Explore capabilities
              </a>
              <Link to="/services" className="btn btn-secondary">
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Overview & Capabilities */}
      <section className="service-template-detail" id="service-detail-section">
        <div className="section-container">
          <p className="section-label">Service Overview</p>
          <h2 dangerouslySetInnerHTML={{ __html: service.overviewTitle }}></h2>
          <p className="about-lead">
            {service.overviewLead}
          </p>

          <div className="about-grid">
            <div className="about-copy">
              {service.overviewCopy.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="about-pillars">
              <article className="about-pillar">
                <h3>{service.pillarTitle}</h3>
                <ul className="deliverables-list">
                  {service.pillarItems.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          {/* Impact Outcomes Grid */}
          <div className="about-values">
            {service.outcomes.map((outcome, index) => (
              <div key={index} className="about-value">
                <span className="about-value-num" aria-hidden="true">{outcome.icon}</span>
                <p className="about-value-label">{outcome.title}</p>
                <p className="about-value-desc">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Bottom CTA Banner */}
      <section className="consultation-banner fade-up" style={{ animationDelay: '.35s' }}>
        <div className="banner-container">
          <h2>{service.cta.title}</h2>
          <p>{service.cta.prompt}</p>
          <Link to={service.cta.link} className="btn btn-primary">{service.cta.buttonText}</Link>
        </div>
      </section>
    </div>
  )
}
