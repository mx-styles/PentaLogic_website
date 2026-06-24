import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts.json'
import './Blog.css'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [bgState, setBgState] = useState('default')
  const containerRef = useRef(null)

  // Extract unique categories from blogPosts
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))]

  // Filter posts based on active category
  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory)

  useEffect(() => {
    // SEO Meta Hydration
    document.title = "Insights & Technical Blog | Pentalogic Consultancy"
    const metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute('content', "Explore expert articles on enterprise data strategy, predictive analytics, and scalable technical architecture by Pentalogic.")
    }

    const handleScroll = () => {
      if (window.scrollY > 80) {
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

  // Mouse spotlight coordinates tracking for cards
  const handleMouseMove = (e, postId) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }

  return (
    <div className="blog-page-wrapper" ref={containerRef}>
      {/* Visual Identity Background Layering */}
      <div className="bg-layers" aria-hidden="true">
        <div
          className="bg-layer bg-layer--default"
          style={{ opacity: bgState === 'default' ? 1 : 0.4 }}
        >
          <div className="bg-ghost">
            <img src="/assets/images/hero-headset.png" alt="" />
          </div>
        </div>
      </div>
      <div className="grid-overlay" aria-hidden="true"></div>
      <div className="vignette" aria-hidden="true"></div>

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-badge fade-up" style={{ animationDelay: '.05s' }}>Insights</span>
          <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
            Intelligence <span className="accent">Catalog.</span>
          </h1>
          <p className="sub fade-up" style={{ animationDelay: '.2s' }}>
            Authoritative analysis and technical deep-dives on enterprise data strategy, predictive models, and scalable systems.
          </p>
        </div>
      </section>

      {/* Main Content & Filter Catalog */}
      <section className="blog-catalog-section">
        {/* Category Filters */}
        <div className="filter-bar fade-up" style={{ animationDelay: '.3s' }}>
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="blog-grid fade-up" style={{ animationDelay: '.4s' }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="blog-card"
              onMouseMove={(e) => handleMouseMove(e, post.id)}
            >
              {/* Card Spotlight Glowing Border Overlay */}
              <div className="card-spotlight-border" aria-hidden="true"></div>

              <div className="blog-card-inner">
                {/* Featured Image Frame */}
                <div className="card-media-wrapper">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="card-media"
                    loading="lazy"
                  />
                  <div className="card-media-overlay"></div>
                  <span className="card-category-pill">{post.category}</span>
                </div>

                {/* Text Content */}
                <div className="card-body">
                  <div className="card-meta">
                    <span className="card-date">{post.date}</span>
                    <span className="meta-separator">•</span>
                    <span className="card-reading-time">{post.readingTime}</span>
                  </div>

                  <h3 className="card-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="card-excerpt">{post.excerpt}</p>

                  <div className="card-footer">
                    <span className="card-author">By {post.author}</span>
                    <Link to={`/blog/${post.slug}`} className="read-more-link">
                      Read Article
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="arrow-icon"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
