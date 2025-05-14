"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"
import ProductList from "../components/ProductList"
import Pagination from "../components/Pagination"
import "../styles/Home.scss"

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSupermarket, setSelectedSupermarket] = useState("")
  const [totalPages, setTotalPages] = useState(1)
  const [isSearchActive, setIsSearchActive] = useState(false)

  // Products per page
  const limit = 12

  // Effect for regular pagination and supermarket filtering (when not searching)
  useEffect(() => {
    fetchProducts(currentPage, selectedSupermarket)
  }, [currentPage, selectedSupermarket, isSearchActive])

  // Fetch products for regular pagination with optional supermarket filter
  const fetchProducts = async (page, supermarket = "") => {
    setLoading(true)
    try {
      let url = `https://fresquitas-api.fly.dev/cervezas/baratas?page=${page}&limit=${limit}`
      if (supermarket) {
        url += `&supermercado=${encodeURIComponent(supermarket)}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }

      const data = await response.json()

      setProducts(data.resultados)
      setTotalPages(data.pages)
      setCurrentPage(data.page)
      setLoading(false)
    } catch (error) {
      console.error("Fetch error:", error)
      setError(error.message)
      setLoading(false)
    }
  }


  // Search products using the search endpoint
  const searchProducts = async (query, page = 1) => {
    if (!query.trim()) {
      setIsSearchActive(false)
      setSearchTerm("")
      fetchProducts(1, selectedSupermarket)
      setCurrentPage(1)
      return
    }

    setLoading(true)
    setIsSearchActive(true)
    setSearchTerm(query)

    try {
      const response = await fetch(`https://fresquitas-api.fly.dev/cervezas/buscar?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
      if (!response.ok) {
        throw new Error("Failed to search products")
      }

      const data = await response.json()

      setProducts(data.resultados)
      setTotalPages(data.pages)
      setCurrentPage(data.page)
      setLoading(false)
    } catch (error) {
      console.error("Search error:", error)
      setError(error.message)
      setLoading(false)
    }
  }


  const handleSearch = (term) => {
    searchProducts(term)
  }

  const handleFilter = (supermarket) => {
    setSelectedSupermarket(supermarket)
    // Reset to page 1 when changing filters
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleClearSearch = () => {
    setIsSearchActive(false)
    setSearchTerm("")
    fetchProducts(1, selectedSupermarket)
    setCurrentPage(1)
  }

  return (
    <main className="main-content">
      <div className="controls">
        <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
        <FilterBar onFilter={handleFilter} selectedFilter={selectedSupermarket} />
      </div>

      {isSearchActive && (
        <div className="search-status">
          <p>
            Showing results for: <strong>"{searchTerm}"</strong>
            <button className="clear-search" onClick={handleClearSearch}>
              Clear Search
            </button>
          </p>
        </div>
      )}

      {!isSearchActive && selectedSupermarket && (
        <div className="filter-status">
          <p>
            Showing products from: <strong>{selectedSupermarket}</strong>
            <button className="clear-filter" onClick={() => handleFilter("")}>
              Show All
            </button>
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="loading"
          >
            Loading...
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="error"
          >
            Error: {error}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductList products={products} />
            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default Home
