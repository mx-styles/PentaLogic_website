import React, { useState, useEffect, useRef } from 'react'
import './About.css'

const TEAM = [
  {
    first: 'Priya',
    last: 'Anand',
    role: 'Founder & Lead Strategist',
    bio: 'Fifteen years inside data platforms taught her that strategy without infrastructure is just a slide deck. Leads every engagement from kickoff to handover.',
    img: '/assets/images/profile1.png',
    linkedin: '#',
    email: '#'
  },
  {
    first: 'Marcus',
    last: 'Webb',
    role: 'Head of Predictive Analytics',
    bio: 'Builds the forecasting models that turn historical noise into decisions your team can actually act on.',
    img: '/assets/images/profile2.png',
    linkedin: '#',
    email: '#'
  },
  {
    first: 'Sofia',
    last: 'Lindqvist',
    role: 'Head of Data Systems',
    bio: 'Designs the pipelines and architecture that keep data moving — reliably, securely, at scale.',
    img: '/assets/images/profile3.png',
    linkedin: '#',
    email: '#'
  },
  {
    first: 'Daniel',
    last: 'Osei',
    role: 'Principal Software Engineer',
    bio: 'Ships the custom tools and internal platforms that make the strategy usable day to day.',
    img: '/assets/images/profile4.png',
    linkedin: '#',
    email: '#'
  },
  {
    first: 'Lena',
    last: 'Ferreira',
    role: 'Head of Insights & Research',
    bio: "Turns engagement findings into the published research and case studies that keep clients ahead of what's coming next.",
    img: '/assets/images/profile5.png',
    linkedin: '#',
    email: '#'
  }
]

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [photoSlotA, setPhotoSlotA] = useState(TEAM[0].img)
  const [photoSlotB, setPhotoSlotB] = useState(TEAM[0].img)
  const [activePhotoSlot, setActivePhotoSlot] = useState('A')
  const [isSwapping, setIsSwapping] = useState(false)
  const [pulseMarker, setPulseMarker] = useState(false)

  const pentagonSpinRef = useRef(null)
  const rotationRef = useRef(0)
  const activeIndexRef = useRef(0)
  const isPausedRef = useRef(false)
  const hoveringRef = useRef(false)
  const focusedRef = useRef(false)
  const manualHoldRef = useRef(false)
  const manualHoldTimeoutRef = useRef(null)

  const ANGLE_STEP = 360 / TEAM.length; // 72 deg for 5 members
  const REVOLUTION_SECONDS = 30; // one full slow turn
  const DEG_PER_MS = 360 / (REVOLUTION_SECONDS * 1000)

  // Sync body class for background layering and page title/meta description for SEO
  useEffect(() => {
    document.body.classList.add('at-about')
    document.title = "About Us | Pentalogic Consultancy"
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', "Learn about Pentalogic — our story, mission, vision, core values, and the team dedicated to helping organisations make the most of their data.")
    }

    return () => {
      document.body.classList.remove('at-about')
      document.title = "Pentalogic Consultancy | Intelligence that sees first"
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc)
      }
    }
  }, [])

  // Auto-rotation engine
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let lastTimestamp = null
    let animationFrameId = null

    const step = (timestamp) => {
      if (lastTimestamp === null) lastTimestamp = timestamp
      const dt = timestamp - lastTimestamp
      lastTimestamp = timestamp

      if (!isPausedRef.current && !document.hidden) {
        rotationRef.current += dt * DEG_PER_MS
        const display = ((rotationRef.current % 360) + 360) % 360

        // Apply rotation directly to the DOM for 60fps performance
        if (pentagonSpinRef.current) {
          pentagonSpinRef.current.setAttribute('transform', `rotate(${display} 100 100)`)
        }

        const segment = Math.floor(rotationRef.current / ANGLE_STEP) % TEAM.length
        if (segment !== activeIndexRef.current) {
          activeIndexRef.current = segment
          applyMemberChange(segment)
        }
      }

      animationFrameId = requestAnimationFrame(step)
    }

    animationFrameId = requestAnimationFrame(step)

    const handleVisibility = () => {
      lastTimestamp = null
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  const recomputePaused = () => {
    isPausedRef.current = hoveringRef.current || focusedRef.current || manualHoldRef.current
  }

  const applyMemberChange = (index) => {
    const member = TEAM[index]

    // Crossfade photos slot swap
    setActivePhotoSlot((prevSlot) => {
      const nextSlot = prevSlot === 'A' ? 'B' : 'A'
      if (nextSlot === 'A') {
        setPhotoSlotA(member.img)
      } else {
        setPhotoSlotB(member.img)
      }
      return nextSlot
    })

    // Fade swap card info
    setIsSwapping(true)
    setTimeout(() => {
      setActiveIndex(index)
      setIsSwapping(false)
    }, 180)

    // Pulse target marker
    setPulseMarker(false)
    setTimeout(() => {
      setPulseMarker(true)
    }, 20)
  }

  const goToIndex = (index, manual = false) => {
    const targetIndex = ((index % TEAM.length) + TEAM.length) % TEAM.length
    activeIndexRef.current = targetIndex
    rotationRef.current = targetIndex * ANGLE_STEP

    if (pentagonSpinRef.current) {
      pentagonSpinRef.current.setAttribute('transform', `rotate(${rotationRef.current} 100 100)`)
    }

    applyMemberChange(targetIndex)

    if (manual) {
      manualHoldRef.current = true
      recomputePaused()
      if (manualHoldTimeoutRef.current) clearTimeout(manualHoldTimeoutRef.current)
      manualHoldTimeoutRef.current = setTimeout(() => {
        manualHoldRef.current = false
        manualHoldTimeoutRef.current = null
        recomputePaused()
      }, 4500)
    }
  }

  return (
    <div className="about-wrapper">
      {/* Background layers */}
      <div className="bg-layers" aria-hidden="true">
        <div className="bg-layer bg-layer--default" style={{ opacity: 0 }}>
          <div className="bg-ghost">
            <img src="/assets/images/hero-headset.png" alt="" />
          </div>
        </div>
        <div className="bg-layer bg-layer--scroll" style={{ opacity: 0 }}>
          <div className="bg-full">
            <img src="/assets/images/hero-headset.png" alt="" />
          </div>
        </div>
        <div className="bg-layer bg-layer--about" style={{ opacity: 1 }}>
          <div className="bg-about">
            <img src="/assets/images/about-bg.png" alt="" />
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
              Our <span className="accent">story.</span>
            </h1>
            <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
              Built to make data work for everyone. A consultancy founded on rigour, transparency, and results.
            </p>
          </div>

          <div className="hero-visual fade-up" style={{ animationDelay: '.25s' }}>
            <div className="hero-visual-ring" aria-hidden="true"></div>
            <div className="hero-chart" role="img" aria-label="Team growth placeholder">
              <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect className="chart-panel" x="8" y="8" width="384" height="264" rx="12" />
                <path 
                  className="chart-line" 
                  d="M48,228 L120,180 L200,190 L280,120 L352,60" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="2.5" 
                />
                <text 
                  x="48" 
                  y="34" 
                  fill="var(--accent)" 
                  fontFamily="IBM Plex Mono, monospace" 
                  fontSize="11" 
                  fontWeight="500"
                >
                  Capability growth
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Detail */}
      <section className="about-detail">
        <div className="about-section">
          <p className="section-label">Who We Are</p>
          <h2>A Consultancy Built on <span className="highlight">Rigour and Results</span></h2>
          <p className="about-lead">
            Pentalogic Consultancy was established to bridge a persistent gap in the market: organisations drowning in data but starved of actionable insight.
          </p>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                Too often, businesses invest in expensive tools without a clear strategy, hire analysts without the infrastructure to support them, or commission software that doesn't align with how they actually work.
              </p>
              <p>
                We founded Pentalogic to be different. We are practitioners first — engineers, analysts, and strategists who have worked inside complex data environments and understand what it actually takes to make data deliver.
              </p>
            </div>

            <div className="about-pillars">
              <article className="about-pillar">
                <span className="about-pillar-label">Mission</span>
                <h3>Empower with clarity</h3>
                <p>To empower organisations with clear data strategies, intelligent systems, and purpose-built software.</p>
              </article>
              <article className="about-pillar">
                <span className="about-pillar-label">Vision</span>
                <h3>Trusted First</h3>
                <p>To be the consultancy that data-driven organisations trust first — known for rigour and transparency.</p>
              </article>
            </div>
          </div>

          {/* Values */}
          <div className="about-values">
            <div className="about-value">
              <span className="about-value-num" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <p className="about-value-label">Rigour</p>
              <p className="about-value-desc">Discipline in every analysis and line of code.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                </svg>
              </span>
              <p className="about-value-label">Transparency</p>
              <p className="about-value-desc">Honest communication, even when it's difficult.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m11 17 2 2a1 1 0 0 0 1.4 0l6.5-6.5a1 1 0 0 0 0-1.4l-8-8a1 1 0 0 0-1.4 0L9 5" />
                  <path d="m3 13 6 6" />
                  <path d="m18.4 5.6-7.9 7.9a1 1 0 0 1-1.4 0L5.8 10a1 1 0 0 1 0-1.4l7.9-7.9a1 1 0 0 1 1.4 0l3.3 3.3a1 1 0 0 1 0 1.4z" />
                  <path d="M10 13.5 13.5 10" />
                </svg>
              </span>
              <p className="about-value-label">Partnership</p>
              <p className="about-value-desc">Working as a true extension of your team.</p>
            </div>
            <div className="about-value">
              <span className="about-value-num" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.5-1.5 1.5-2.5L8 11z" />
                  <path d="M12 15v5s-1.5.5-2.5-1.5L11 16z" />
                </svg>
              </span>
              <p className="about-value-label">Impact</p>
              <p className="about-value-desc">Measuring success by what changes for your business.</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-block">
            <p className="section-label">Meet The Team</p>
            <h2>The People Behind <span className="highlight">Pentalogic</span></h2>
            <p className="about-lead">
              A small, senior team — no juniors learning on your dime, no hand-offs to someone you've never met. Each lead owns an engagement end to end.
            </p>

            <div 
              className="team-rotator" 
              id="teamRotator" 
              role="group" 
              aria-roledescription="carousel" 
              aria-label="Team member spotlight"
              onPointerEnter={() => { hoveringRef.current = true; recomputePaused(); }}
              onPointerLeave={() => { hoveringRef.current = false; recomputePaused(); }}
              onFocus={() => { focusedRef.current = true; recomputePaused(); }}
              onBlur={() => { focusedRef.current = false; recomputePaused(); }}
            >
              <div className="team-rotator-visual">
                <div className="pentagon-wrap" id="pentagonWrap">
                  <div className="pentagon-glow" aria-hidden="true"></div>

                  <svg className="pentagon-svg" viewBox="0 0 200 200" aria-hidden="true">
                    <g id="pentagonSpin" ref={pentagonSpinRef}>
                      <path 
                        className="pentagon-path pentagon-path--echo-2"
                        transform="rotate(-16 100 91.4)"
                        d="M 82.2 22.93 Q 100 10 117.8 22.93 L 167.8 59.26 Q 185.6 72.19 178.8 93.11 L 159.7 151.89 Q 152.9 172.81 130.9 172.81 L 69.1 172.81 Q 47.1 172.81 40.3 151.89 L 21.2 93.11 Q 14.4 72.19 32.2 59.26 Z" 
                      />
                      <path 
                        className="pentagon-path pentagon-path--echo-1"
                        transform="rotate(16 100 91.4)"
                        d="M 82.2 22.93 Q 100 10 117.8 22.93 L 167.8 59.26 Q 185.6 72.19 178.8 93.11 L 159.7 151.89 Q 152.9 172.81 130.9 172.81 L 69.1 172.81 Q 47.1 172.81 40.3 151.89 L 21.2 93.11 Q 14.4 72.19 32.2 59.26 Z" 
                      />
                      <path 
                        className="pentagon-path pentagon-path--main"
                        d="M 82.2 22.93 Q 100 10 117.8 22.93 L 167.8 59.26 Q 185.6 72.19 178.8 93.11 L 159.7 151.89 Q 152.9 172.81 130.9 172.81 L 69.1 172.81 Q 47.1 172.81 40.3 151.89 L 21.2 93.11 Q 14.4 72.19 32.2 59.26 Z" 
                      />
                    </g>
                  </svg>

                  <span className={`pentagon-marker ${pulseMarker ? 'pulse' : ''}`} id="pentagonMarker" aria-hidden="true"></span>

                  <div className="team-photo-ring" aria-hidden="true"></div>

                  <div className="team-photo-frame">
                    <img 
                      className={`team-photo ${activePhotoSlot === 'A' ? 'is-active' : ''}`} 
                      id="teamPhotoA" 
                      src={photoSlotA} 
                      alt="" 
                      aria-hidden="true" 
                    />
                    <img 
                      className={`team-photo ${activePhotoSlot === 'B' ? 'is-active' : ''}`} 
                      id="teamPhotoB" 
                      src={photoSlotB} 
                      alt="" 
                      aria-hidden="true" 
                    />
                  </div>
                </div>

                <div className="team-rotator-dots" id="teamDots" role="tablist" aria-label="Choose team member">
                  {TEAM.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`team-rotator-dot ${activeIndex === i ? 'is-active' : ''}`}
                      role="tab"
                      aria-selected={activeIndex === i ? 'true' : 'false'}
                      aria-label={`View ${TEAM[i].first} ${TEAM[i].last}`}
                      onClick={() => goToIndex(i, true)}
                    />
                  ))}
                </div>
              </div>

              <div className="team-rotator-info">
                <div className="team-rotator-meta">
                  <span className="team-rotator-count" id="teamCount">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(TEAM.length).padStart(2, '0')}
                  </span>
                  <div className="team-rotator-nav">
                    <button 
                      type="button" 
                      className="team-rotator-btn" 
                      id="teamPrev" 
                      aria-label="Previous team member"
                      onClick={() => goToIndex(activeIndex - 1, true)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>
                    <button 
                      type="button" 
                      className="team-rotator-btn" 
                      id="teamNext" 
                      aria-label="Next team member"
                      onClick={() => goToIndex(activeIndex + 1, true)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={`team-rotator-card ${isSwapping ? 'is-swapping' : ''}`} id="teamCard">
                  <h3>
                    <span className="team-first">{TEAM[activeIndex].first}</span>
                    <span className="team-last">{TEAM[activeIndex].last}</span>
                  </h3>
                  <span className="team-role">{TEAM[activeIndex].role}</span>
                  <p className="team-bio">{TEAM[activeIndex].bio}</p>
                  <div className="team-links">
                    <a href={TEAM[activeIndex].linkedin} aria-label={`${TEAM[activeIndex].first} ${TEAM[activeIndex].last} on LinkedIn`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8Z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    <a href={TEAM[activeIndex].email} aria-label={`Email ${TEAM[activeIndex].first} ${TEAM[activeIndex].last}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 6 10 7L22 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
