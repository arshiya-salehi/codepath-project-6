const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search breweries by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
    )
  }
  
  export default SearchBar