"use client"
import { motion } from "framer-motion"
import "../styles/FilterBar.scss"

const FilterBar = ({ onFilter, selectedFilter }) => {
  const supermarkets = ["Coto", "Disco", "Carrefour", "Chango Mas", "Dia"]

  return (
    <motion.div
      className="filter-bar"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <span>Filter by:</span>
      <div className="filter-options">
        <button className={selectedFilter === "" ? "active" : ""} onClick={() => onFilter("")}>
          All
        </button>
        {supermarkets.map((supermarket) => (
          <button
            key={supermarket}
            className={selectedFilter === supermarket ? "active" : ""}
            onClick={() => onFilter(supermarket)}
          >
            {supermarket}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default FilterBar
