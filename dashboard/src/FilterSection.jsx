const FilterSection = ({
    breweries,
    breweryType,
    setBreweryType,
    stateFilter,
    setStateFilter,
  }) => {
    // Get unique brewery types and states for dropdowns
    const breweryTypes = [...new Set(breweries.map(b => b.brewery_type))]
    const states = [...new Set(breweries.map(b => b.state).filter(s => s))].sort()
  
    return (
      <div className="filter-section">
        <div className="filter">
          <label htmlFor="brewery-type">Brewery Type:</label>
          <select
            id="brewery-type"
            value={breweryType}
            onChange={e => setBreweryType(e.target.value)}
          >
            <option value="all">All Types</option>
            {breweryTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
  
        <div className="filter">
          <label htmlFor="state">State:</label>
          <select
            id="state"
            value={stateFilter}
            onChange={e => setStateFilter(e.target.value)}
          >
            <option value="all">All States</option>
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }
  
  export default FilterSection