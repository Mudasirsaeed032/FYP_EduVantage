"use client"

import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./UserProfile.css"
import Navbar from "../Boilerplate/Navbar"
import Footer from "../Boilerplate/Footer"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { Check, Save, User } from 'lucide-react'

const UserProfile = () => {
  const { id } = useParams() // Get the user ID from the URL params
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [countryOfResidence, setCountryOfResidence] = useState("")
  const [gpaType, setGpaType] = useState("")
  const [gpa, setGpa] = useState("")
  const [bachelorField, setBachelorField] = useState("")
  const [institution, setInstitution] = useState("")
  const [testName, setTestName] = useState("")
  const [score, setScore] = useState("")
  const [tuitionBudget, setTuitionBudget] = useState("")
  const [livingAllowance, setLivingAllowance] = useState("")
  const [user, setUser] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name || "")
        setDob(data.dob || "")
        setPhone(data.phone || "")
        setGender(data.gender || "")
        setCountryOfResidence(data.countryOfResidence || "")
        setGpaType(data.gpaType || "")
        setGpa(data.gpa || "")
        setBachelorField(data.bachelorField || "")
        setInstitution(data.institution || "")
        setTestName(data.testScores?.testName || "")
        setScore(data.testScores?.score || "")
        setTuitionBudget(data.budget?.tuitionBudget || "")
        setLivingAllowance(data.budget?.livingAllowance || "")
      })
      .catch((err) => console.error("Error fetching user profile:", err))
  }, [id])

  useEffect(() => {
    axios
      .get("http://localhost:3000/home", { withCredentials: true })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user)
        } else {
          setUser(null)
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error)
        setUser(null)
      })
  }, [])

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data.message)
        setUser(null)
        navigate("/recommendation")
      })
      .catch((err) => {
        console.error("error:", err)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const updatedProfileData = {
      dob,
      phone,
      gender,
      countryOfResidence,
      gpaType,
      gpa,
      bachelorField,
      institution,
      testName,
      score,
      tuitionBudget,
      livingAllowance,
    }

    fetch(`http://localhost:3000/profile/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfileData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile updated:", data)
        setSuccessMessage("Profile updated successfully!")
        setIsSubmitting(false)
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      })
      .catch((error) => {
        console.error("Error updating profile:", error)
        setIsSubmitting(false)
      })
  }

  return (
    <div className="profile-page">
      <Navbar user={user} handleLogout={handleLogout} />
      
      <div className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-avatar">
            <User size={40} />
          </div>
          <h1>Your Profile</h1>
          <p>Update your personal information and preferences</p>
        </div>
      </div>
      
      <div className="profile-container">
        <form onSubmit={handleSubmit}>
          {successMessage && (
            <div className="success-message">
              <Check size={20} />
              {successMessage}
            </div>
          )}
          
          <div className="form-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Mobile Number</label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country of Residence</label>
                <input
                  id="country"
                  type="text"
                  value={countryOfResidence}
                  onChange={(e) => setCountryOfResidence(e.target.value)}
                  placeholder="Enter your country"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <div className="section-header">
              <h2>Academic Details</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="gpaType">GPA Type</label>
                <input
                  id="gpaType"
                  type="text"
                  value={gpaType}
                  onChange={(e) => setGpaType(e.target.value)}
                  placeholder="Enter GPA type"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="gpa">GPA</label>
                <input
                  id="gpa"
                  type="number"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder="Enter GPA"
                  step="0.01"
                  min="0"
                  max="4.0"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bachelorField">Field of Bachelors</label>
                <input
                  id="bachelorField"
                  type="text"
                  value={bachelorField}
                  onChange={(e) => setBachelorField(e.target.value)}
                  placeholder="Enter your field of study"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="institution">Previous/Current Institution</label>
                <input
                  id="institution"
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Enter your institution"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <div className="section-header">
              <h2>Test Scores</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="testName">Language Test</label>
                <select
                  id="testName"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                >
                  <option value="" disabled>Select your test</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="PTE">PTE</option>
                  <option value="Duolingo">Duolingo</option>
                  <option value="Cambridge">Cambridge</option>
                  <option value="TOEIC">TOEIC</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="score">Test Score</label>
                <input
                  id="score"
                  type="number"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Enter your score"
                  step="0.5"
                />
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <div className="section-header">
              <h2>Budget Details</h2>
              <div className="section-divider"></div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="tuitionBudget">Tuition Budget (USD)</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    id="tuitionBudget"
                    type="number"
                    value={tuitionBudget}
                    onChange={(e) => setTuitionBudget(e.target.value)}
                    placeholder="Enter your tuition budget"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="livingAllowance">Monthly Living Allowance (USD)</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">$</span>
                  <input
                    id="livingAllowance"
                    type="number"
                    value={livingAllowance}
                    onChange={(e) => setLivingAllowance(e.target.value)}
                    placeholder="Enter your monthly allowance"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="button-content">Updating...</span>
              ) : (
                <span className="button-content">
                  <Save size={18} />
                  Save Profile
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}

export default UserProfile
