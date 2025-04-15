"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { GraduationCap, Menu, X } from "lucide-react"
import "./navbar.css"

export default function Navbar({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Recommendation", path: "/recommendation" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <GraduationCap className="logo-icon" />
          <Link to="/home" className="logo-text">
            Edu<span className="accent">Vantage</span>
          </Link>
        </div>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <ul className="navbar-links">
            {navItems.map((item, index) => (
              <li key={index} className="nav-item">
                <Link to={item.path} className="nav-link">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-auth">
            {!user ? (
              <div className="auth-buttons">
                <Link to="/login" className="login-button">
                  Login
                </Link>
                <Link to="/signup" className="signup-button">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="user-greeting">
                <span className="greeting-text">
                  Welcome!{" "}
                  <Link to={`/profile/${user._id}`} className="username">
                    {user.name}
                  </Link>
                </span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
        </button>
      </div>
    </nav>
  )
}
