"use client"
import { motion } from "framer-motion"
import "../styles/ProductCard.scss"

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="product-image">
        <img
          src={product.imagen_url || "/placeholder.svg"}
          alt={product.producto}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://via.placeholder.com/170x170?text=No+Image"
          }}
        />
        {product.descuento && <div className="discount-badge">{product.descuento}</div>}
      </div>
      <div className="product-info">
        <h3>{product.producto}</h3>
        <div className="supermarket">{product.supermercado}</div>
        <div className="price-info">
          <div className="price">${product.precio}</div>
          <div className="price-per-liter">${product.precioxlitro} per liter</div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
