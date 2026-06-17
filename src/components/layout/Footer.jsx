import React from 'react'

export default function Footer() {
  return (
    <footer style={{ padding: '2rem', borderTop: '1px solid var(--accent-border)', marginTop: '4rem', background: 'var(--bg)', textAlign: 'center' }}>
      <p style={{ color: 'var(--muted)' }}>&copy; {new Date().getFullYear()} Pentalogic Consultancy. All rights reserved.</p>
    </footer>
  )
}
