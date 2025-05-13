"use client"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import "../styles/ProductList.scss"

const ProductList = ({ products }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="product-list-container">
      {products.length === 0 ? (
        <motion.div
          className="no-products"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No products found. Try adjusting your filters.
        </motion.div>
      ) : (
        <motion.div className="product-list" variants={container} initial="hidden" animate="show">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default ProductList
