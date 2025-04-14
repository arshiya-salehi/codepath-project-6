import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const BreweryDetail = () => {
  const { id } = useParams()
  const [brewery, setBrewery] = useState(null)

  useEffect(() => {
    const fetchBrewery = async () => {
      const res = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      const data = await res.json()
      setBrewery(data)
    }
    fetchBrewery()
  }, [id])

  if (!brewery) return <div>Loading details...</div>

  return (
    <div className="app">
      <header className="header">
        <h1>{brewery.name}</h1>
        <p>{brewery.brewery_type} in {brewery.city}, {brewery.state}</p>
        <Link to="/" className="back-link">← Back to Dashboard</Link>
      </header>

      <div className="brewery-detail">
        <p><strong>Address:</strong> {brewery.street}</p>
        <p><strong>Phone:</strong> {brewery.phone || 'N/A'}</p>
        <p><strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noreferrer">{brewery.website_url}</a></p>
      </div>
    </div>
  )
}

export default BreweryDetail
