import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import BreweryDetail from './BreweryDetail'

function App() {
  const [breweries, setBreweries] = useState([])
  const [filteredBreweries, setFilteredBreweries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [breweryType, setBreweryType] = useState('all')
  const [stateFilter, setStateFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=50')
        if (!response.ok) {
          throw new Error('Failed to fetch breweries')
        }
        const data = await response.json()
        setBreweries(data)
        setFilteredBreweries(data)
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }

    fetchBreweries()
  }, [])

  useEffect(() => {
    let results = breweries

    if (searchTerm) {
      results = results.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (breweryType !== 'all') {
      results = results.filter(brewery => brewery.brewery_type === breweryType)
    }

    if (stateFilter !== 'all') {
      results = results.filter(brewery => brewery.state === stateFilter)
    }

    setFilteredBreweries(results)
  }, [searchTerm, breweryType, stateFilter, breweries])

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            breweries={breweries}
            filteredBreweries={filteredBreweries}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            breweryType={breweryType}
            setBreweryType={setBreweryType}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
        }
      />
      <Route path="/brewery/:id" element={<BreweryDetail />} />
    </Routes>
  )
}

export default App
