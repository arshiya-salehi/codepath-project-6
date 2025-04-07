const StatsSection = ({
    totalBreweries,
    microBreweries,
    statesRepresented,
    averagePerState,
    showingResults,
  }) => {
    return (
      <div className="stats-section">
        <div className="stat-card">
          <h3>Total Breweries</h3>
          <p>{totalBreweries}</p>
        </div>
        <div className="stat-card">
          <h3>Micro Breweries</h3>
          <p>{microBreweries}</p>
        </div>
        <div className="stat-card">
          <h3>States Represented</h3>
          <p>{statesRepresented}</p>
        </div>
        <div className="stat-card">
          <h3>Avg per State</h3>
          <p>{averagePerState}</p>
        </div>
        <div className="stat-card">
          <h3>Showing</h3>
          <p>{showingResults}</p>
        </div>
      </div>
    )
  }
  
  export default StatsSection