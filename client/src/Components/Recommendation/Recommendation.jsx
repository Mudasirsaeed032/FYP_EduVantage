"use client"

import { useState, useEffect } from "react"
import "./Recommendation.css"
import { useNavigate } from "react-router-dom"
import Navbar from "../Boilerplate/Navbar"
import Footer from "../Boilerplate/Footer"
import axios from "axios"

export default function Recommendation() {
  const [selectedUniversities, setSelectedUniversities] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // Hardcoded university data with Best Fit percentages
  const universities = [
    {
      name: "Harvard University",
      location: "Cambridge, MA",
      description: "A prestigious Ivy League research university offering a wide range of graduate programs.",
      website: "https://www.harvard.edu",
      image:
        "https://media.istockphoto.com/id/539018591/photo/harvard-moors-hall.jpg?s=2048x2048&w=is&k=20&c=Ebx0J6rNn2mLqXtLDI07ORJ6lUMgbXE2IR55b3hbtk4=",
      bestFitPercentage: 92,
    },
    {
      name: "Stanford University",
      location: "Stanford, CA",
      description:
        "Known for its entrepreneurial character and ties to Silicon Valley, Stanford offers top programs in various fields.",
      website: "https://www.stanford.edu",
      image:
        "https://images.unsplash.com/photo-1681782421891-5088f13466ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      bestFitPercentage: 89,
    },
    {
      name: "Massachusetts Institute of Technology (MIT)",
      location: "Cambridge, MA",
      description:
        "MIT is a leader in innovation and research, offering cutting-edge programs in science and technology.",
      website: "https://www.mit.edu",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQapTmka1mz_TPvs-Et7Zsxo_C3mt8FFH89vQ&s",
      bestFitPercentage: 95,
    },
    {
      name: "University of California, Berkeley",
      location: "Berkeley, CA",
      description: "Berkeley is a leading public university known for its research and diverse graduate programs.",
      website: "https://www.berkeley.edu",
      image:
        "https://media.istockphoto.com/id/1331003550/photo/on-campus-at-uc-berkley.jpg?s=612x612&w=0&k=20&c=5kFzYWf-JbBY6oYvqcmOavd2-GewcxL8NzqBbxUSMUA=",
      bestFitPercentage: 88,
    },
  ]

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

  const handleSelect = (university) => {
    if (selectedUniversities.includes(university)) {
      setSelectedUniversities(selectedUniversities.filter((item) => item !== university))
    } else if (selectedUniversities.length < 2) {
      setSelectedUniversities([...selectedUniversities, university])
    }
  }

  const handleCompare = () => {
    if (selectedUniversities.length === 2) {
      navigate("/comparison", { state: { universities: selectedUniversities } })
    }
  }

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

  return (
    <main id="main-recommendation">
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="recommendation-container">
        <div className="recommendation-header">
          <h2>Recommended Universities</h2>
          <p className="recommendation-subtitle">Based on your profile and preferences</p>
        </div>

        <div className="university-cards">
          {universities.map((university, index) => (
            <div className={`card ${selectedUniversities.includes(university) ? "card-selected" : ""}`} key={index}>
              <div className="card-badge">{index + 1}</div>
              <div className="card-image-container">
                <img
                  src={university.image || "/placeholder.svg"}
                  alt={`${university.name} campus`}
                  className="card-img"
                />
                <div className="best-fit-indicator">
                  <div className="best-fit-circle">
                    <svg viewBox="0 0 36 36">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray={`${university.bestFitPercentage}, 100`}
                        d="M18 2.0845
                                                a 15.9155 15.9155 0 0 1 0 31.831
                                                a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <text x="18" y="20.35" className="percentage">
                        {university.bestFitPercentage}%
                      </text>
                    </svg>
                  </div>
                  <span>Best Fit</span>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{university.name}</h3>
                <p className="card-location">{university.location}</p>
                <p className="card-description">{university.description}</p>

                <div className="card-actions">
                  <a href={university.website} target="_blank" rel="noopener noreferrer" className="card-link">
                    Visit Website
                  </a>
                  <button
                    className={`compare-toggle ${selectedUniversities.includes(university) ? "selected" : ""}`}
                    onClick={() => handleSelect(university)}
                    disabled={selectedUniversities.length === 2 && !selectedUniversities.includes(university)}
                  >
                    {selectedUniversities.includes(university) ? "Selected" : "Compare"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedUniversities.length > 0 && (
          <div className="compare-prompt">
            <div className="selected-count">{selectedUniversities.length} of 2 universities selected</div>
            <button
              onClick={handleCompare}
              className={`compare-btn ${selectedUniversities.length === 2 ? "active" : "disabled"}`}
              disabled={selectedUniversities.length !== 2}
            >
              Compare Universities
            </button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
