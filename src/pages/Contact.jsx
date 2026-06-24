import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  const [coords, setCoords] = useState({ x: '50%', y: '-20%' })
  const [bgState, setBgState] = useState('default')
  const [isSpotlightVisible, setIsSpotlightVisible] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    subject: '',
    message: ''
  })

  // Validation errors
  const [errors, setErrors] = useState({})

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let frameId
    const handleMouseMove = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return
      if (frameId) cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        setCoords({ x: `${e.clientX}px`, y: `${e.clientY}px` })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY
      const detailEl = document.getElementById('contact-detail')
      const detailOffset = detailEl ? detailEl.offsetTop - (window.innerHeight * 0.4) : 400
      setBgState(scrollPos > detailOffset ? 'scrolled' : 'default')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SEO
  useEffect(() => {
    document.title = 'Contact Us | Pentalogic Consultancy'
    const metaDesc = document.querySelector('meta[name="description"]')
    const original = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Get in touch with Pentalogic Consultancy. Schedule a consultation, ask about our services, or reach our team.')
    }
    return () => {
      document.title = "Pentalogic Consultancy | Intelligence that sees first"
      if (metaDesc && original) metaDesc.setAttribute('content', original)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.'
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = 'Please enter a valid email address.'
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject.'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message body is required.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowModal(true)
      setFormData({
        fullName: '',
        businessEmail: '',
        subject: '',
        message: ''
      })
    }, 1200)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="contact-page-wrapper">
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
        className="contact-hero-section"
        onMouseEnter={() => setIsSpotlightVisible(true)}
        onMouseLeave={() => setIsSpotlightVisible(false)}
      >
        <div className="contact-hero-grid">
          <div className="contact-hero-content">
            <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
              Let's <span className="accent">talk.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Ready to start a conversation? Whether you need a consultation, have a question about our services, or want to explore a partnership — we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Detail Section */}
      <section className="contact-detail-section" id="contact-detail">
        <div className="contact-container">
          {/* Left: Touchpoints */}
          <div className="contact-touchpoints fade-up" style={{ animationDelay: '.3s' }}>
            <p className="section-label">Get in touch</p>
            <h2>Contact <span className="accent">information.</span></h2>

            <div className="touchpoints-grid">
              <div className="touchpoint-card">
                <div className="touchpoint-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h4>Phone</h4>
                <a href="tel:+263771881677" className="touchpoint-link">+263 77 188 1677</a>
                <p className="touchpoint-note">Mon–Fri, 08h00–17h00 CAT</p>
              </div>

              <div className="touchpoint-card">
                <div className="touchpoint-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h4>Email</h4>
                <a href="mailto:info@pentalogic.co.zw" className="touchpoint-link">info@pentalogic.co.zw</a>
                <p className="touchpoint-note">We respond within 24 hours</p>
              </div>

              <div className="touchpoint-card">
                <div className="touchpoint-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h4>Location</h4>
                <p className="touchpoint-value">630 Churchill Ave, Harare</p>
                <p className="touchpoint-note">Remote engagements worldwide</p>
              </div>

              <div className="touchpoint-card">
                <div className="touchpoint-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h4>Operating Hours</h4>
                <p className="touchpoint-value">Mon–Fri: 08h00 – 17h00</p>
                <p className="touchpoint-note">Weekend inquiries answered Monday</p>
              </div>
            </div>
          </div>

          {/* Right: Quote Form */}
          <div className="contact-form-wrapper fade-up" style={{ animationDelay: '.4s' }}>
            <p className="section-label">Start a conversation</p>
            <h2>Request a <span className="accent">consultation.</span></h2>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'input-error' : ''}
                />
                {errors.fullName && <span className="form-error">{errors.fullName}</span>}
              </div>

              <div className={`form-group ${errors.businessEmail ? 'has-error' : ''}`}>
                <label htmlFor="businessEmail">Business Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  placeholder="you@company.com"
                  value={formData.businessEmail}
                  onChange={handleChange}
                  className={errors.businessEmail ? 'input-error' : ''}
                />
                {errors.businessEmail && <span className="form-error">{errors.businessEmail}</span>}
              </div>

              <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'input-error' : ''}
                >
                  <option value="">Select a subject</option>
                  <option value="Data Strategy">Data Strategy</option>
                  <option value="Predictive Analytics">Predictive Analytics</option>
                  <option value="Data Systems">Data Systems</option>
                  <option value="Custom Software">Custom Software</option>
                  <option value="Partnership">Partnership Inquiry</option>
                  <option value="General">General Inquiry</option>
                </select>
                {errors.subject && <span className="form-error">{errors.subject}</span>}
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Tell us about your project or question..."
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'input-error' : ''}
                ></textarea>
                {errors.message && <span className="form-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="contact-cta-banner fade-up" style={{ animationDelay: '.5s' }}>
        <div className="banner-container">
          <h2>Prefer to browse first?</h2>
          <p>Explore our services and insights to learn more about how we can help your organisation.</p>
          <div className="banner-actions">
            <Link to="/services" className="btn btn-primary">View Services</Link>
            <Link to="/about" className="btn btn-secondary">About Us</Link>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h3>Message sent successfully!</h3>
            <p>Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.</p>
            <button className="btn btn-primary" onClick={closeModal}>Got it</button>
          </div>
        </div>
      )}
    </div>
  )
}
