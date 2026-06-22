import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ServicesOverview from './pages/ServicesOverview'
import CaseStudies from './pages/CaseStudies'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import ServiceTemplate from './pages/ServiceTemplate'
import TermsOfService from './pages/TermsOfService'

import './styles/global.css'

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesOverview />} />
          <Route path="/services/:serviceId" element={<ServiceTemplate />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  )
}
