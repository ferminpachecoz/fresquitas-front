"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "../styles/SearchBar.scss"

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)

  // Update local state when initialValue changes
  useEffect(() => {
    setSearchTerm(initialValue)
  }, [initialValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <motion.div
      className="search-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for beers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </motion.div>
  )
}

export default SearchBar
