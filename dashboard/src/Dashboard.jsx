import React from 'react'
import SearchBar from './SearchBar'
import FilterSection from './FilterSection'
import StatsSection from './StatsSection'
import BreweryCard from './BreweryCard'
import Charts from './Charts'

function Dashboard({
  breweries,
  filteredBreweries,
  searchTerm,
  setSearchTerm,
  breweryType,
  setBreweryType,
  stateFilter,
  setStateFilter
}) {
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

        <Charts breweries={filteredBreweries} />

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

export default Dashboard
