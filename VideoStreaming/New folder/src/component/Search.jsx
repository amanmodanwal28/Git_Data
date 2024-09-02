import { useState } from 'react'
import '../css/Search.scss' // Adjust the path if needed

const SearchBar = () => {
  const [query, setQuery] = useState('')

  const search = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search"
          onChange={search}
          value={query}
        />
        <button>🔍</button>
      </div>
    </div>
  )
}

export default SearchBar
