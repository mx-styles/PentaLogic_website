import React from 'react'
import { useParams } from 'react-router-dom'

export default function ServiceTemplate() {
  const { serviceId } = useParams()
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Service: {serviceId}</h1>
      <p>Details for the {serviceId} service page.</p>
    </div>
  )
}
