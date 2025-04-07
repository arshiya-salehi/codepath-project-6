import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from "./SearchBar"
import FilterSection from "./FilterSection"
import StatsSection from "./StatsSection"
import BreweryCard from "./BreweryCard"

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

    // Apply search filter
    if (searchTerm) {
      results = results.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply brewery type filter
    if (breweryType !== 'all') {
      results = results.filter(brewery => brewery.brewery_type === breweryType)
    }

    // Apply state filter
    if (stateFilter !== 'all') {
      results = results.filter(brewery => brewery.state === stateFilter)
    }

    setFilteredBreweries(results)
  }, [searchTerm, breweryType, stateFilter, breweries])

  if (isLoading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  // Calculate statistics
  const totalBreweries = breweries.length
  const microBreweries = breweries.filter(b => b.brewery_type === 'micro').length
  const statesRepresented = [...new Set(breweries.map(b => b.state))].length
  const averagePerState = (totalBreweries / statesRepresented).toFixed(1)

  return (
    <div className="app">
      <header className="header">
        <h1>Brewery Dashboard</h1>
        <p>Explore craft breweries across the United States</p>
      </header>

      <div className="dashboard">
        <div className="controls">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterSection
            breweries={breweries}
            breweryType={breweryType}
            setBreweryType={setBreweryType}
            stateFilter={stateFilter}
            setStateFilter={setStateFilter}
          />
        </div>

        <StatsSection
          totalBreweries={totalBreweries}
          microBreweries={microBreweries}
          statesRepresented={statesRepresented}
          averagePerState={averagePerState}
          showingResults={filteredBreweries.length}
        />

        <div className="brewery-list">
          {filteredBreweries.length > 0 ? (
            filteredBreweries.map(brewery => (
              <BreweryCard key={brewery.id} brewery={brewery} />
            ))
          ) : (
            <div className="no-results">No breweries match your filters</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App