"use client"

import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import "./Signup.css"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [validated, setValidated] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()
    const currentErrors = {}

    // Validation check
    if (!name) {
      currentErrors.name = "Name is required"
    }
    if (!email) {
      currentErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      currentErrors.email = "Email is invalid"
    }
    if (!password) {
      currentErrors.password = "Password is required"
    } else if (password.length < 6) {
      currentErrors.password = "Password must be at least 6 characters"
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors)
      setValidated(true)
      return
    }

    // If validation passes, clear errors and make API call
    setErrors({})
    setValidated(true)

    // Make the API call to submit the form
    axios
      .post(
        "http://localhost:3000/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        alert("User has been registered successfully")
        navigate("/login")
      })
      .catch((err) => {
        console.log("error:", err)
      })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div id="signup-page">
      <div id="signup-card">
        <div id="signup-header">
          <h1>Create Account</h1>
          <p id="subtitle">Sign up to get started</p>
        </div>

        <form onSubmit={submitForm} noValidate id="signup-form">
          {/* Name Field with Floating Label */}
          <div id="name-group" className="form-group floating-label-group">
            <div className="input-container">
              <input
                type="text"
                id="name"
                className={`form-control ${validated && (errors.name ? "is-invalid" : "is-valid")} ${
                  name ? "has-value" : ""
                }`}
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name" className="floating-label">
                Full Name
              </label>
            </div>
            {errors.name && (
              <div id="name-error" className="error-message">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field with Floating Label */}
          <div id="email-group" className="form-group floating-label-group">
            <div className="input-container">
              <input
                type="email"
                id="email"
                className={`form-control ${validated && (errors.email ? "is-invalid" : "is-valid")} ${
                  email ? "has-value" : ""
                }`}
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" className="floating-label">
                Email Address
              </label>
            </div>
            {errors.email && (
              <div id="email-error" className="error-message">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field with Floating Label and Show/Hide Toggle */}
          <div id="password-group" className="form-group floating-label-group">
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`form-control ${validated && (errors.password ? "is-invalid" : "is-valid")} ${
                  password ? "has-value" : ""
                }`}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
              <button type="button" className="password-toggle" onClick={togglePasswordVisibility} tabIndex="-1">
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <div id="password-error" className="error-message">
                {errors.password}
              </div>
            )}
          </div>

          <button type="submit" id="signup-button">
            Create Account
          </button>
        </form>

        <div id="login-section">
          <p>Already have an account?</p>
          <Link to="/login" id="login-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
