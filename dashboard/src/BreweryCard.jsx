const BreweryCard = ({ brewery }) => {
    return (
      <div className="brewery-card">
        <h2>{brewery.name}</h2>
        <div className="brewery-details">
          <p>
            <strong>Type:</strong> {brewery.brewery_type}
          </p>
          <p>
            <strong>Location:</strong> {brewery.city}, {brewery.state}
          </p>
          {brewery.website_url && (
            <p>
              <strong>Website:</strong>{' '}
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                {brewery.website_url}
              </a>
            </p>
          )}
        </div>
      </div>
    )
  }
  
  export default BreweryCard