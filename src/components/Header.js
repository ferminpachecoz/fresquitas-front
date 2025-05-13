"use client"
import { motion } from "framer-motion"
import "../styles/Header.scss"

const Header = () => {
  return (
    <header className="header">
      <motion.div
        className="logo-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/3mosqueteros.png"
          alt="Beer App Logo"
          className="logo"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }}
        />
      </motion.div>
    </header>
  )
}

export default Header
