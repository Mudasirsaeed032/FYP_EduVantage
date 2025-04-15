"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Comparison.css"
import Navbar from "../Boilerplate/Navbar"
import Footer from "../Boilerplate/Footer"

// Sample data for missing properties (in a real app, this would come from an API)
const universityDetails = {
  "Harvard University": {
    tuition: "$51,925 per year",
    duration: "4 years",
    requirements: "SAT/ACT scores, essays, recommendations, 3.9+ GPA",
    rating: 4.9,
    acceptance: "4%",
    studentFacultyRatio: "6:1",
    ranking: "#2 National",
    campusSize: "5,076 acres",
    strengths: ["Research", "Law", "Business", "Medicine"],
    weaknesses: ["Cost", "Competitive Environment"],
  },
  "Stanford University": {
    tuition: "$56,169 per year",
    duration: "4 years",
    requirements: "SAT/ACT scores, essays, recommendations, 3.95+ GPA",
    rating: 4.8,
    acceptance: "4.3%",
    studentFacultyRatio: "5:1",
    ranking: "#3 National",
    campusSize: "8,180 acres",
    strengths: ["Engineering", "Computer Science", "Business", "Research"],
    weaknesses: ["Cost", "Location Expenses"],
  },
  "Massachusetts Institute of Technology (MIT)": {
    tuition: "$55,510 per year",
    duration: "4 years",
    requirements: "SAT/ACT scores, essays, recommendations, 4.0+ GPA",
    rating: 4.9,
    acceptance: "4.1%",
    studentFacultyRatio: "3:1",
    ranking: "#1 National",
    campusSize: "168 acres",
    strengths: ["Engineering", "Computer Science", "Mathematics", "Innovation"],
    weaknesses: ["Work-Life Balance", "Competitive Environment"],
  },
  "University of California, Berkeley": {
    tuition: "$14,226 (in-state), $44,008 (out-of-state) per year",
    duration: "4 years",
    requirements: "SAT/ACT scores, essays, 3.8+ GPA",
    rating: 4.7,
    acceptance: "14.5%",
    studentFacultyRatio: "19:1",
    ranking: "#4 Public Universities",
    campusSize: "1,232 acres",
    strengths: ["Research", "Computer Science", "Engineering", "Diversity"],
    weaknesses: ["Large Class Sizes", "Housing"],
  },
}

// Categories for comparison
const comparisonCategories = [
  { id: "tuition", label: "Tuition Fee", icon: "💰" },
  { id: "duration", label: "Program Duration", icon: "⏱️" },
  { id: "requirements", label: "Requirements", icon: "📝" },
  { id: "rating", label: "University Rating", icon: "⭐" },
  { id: "acceptance", label: "Acceptance Rate", icon: "🎯" },
  { id: "studentFacultyRatio", label: "Student-Faculty Ratio", icon: "👨‍🏫" },
  { id: "ranking", label: "Ranking", icon: "🏆" },
  { id: "campusSize", label: "Campus Size", icon: "🏛️" },
  { id: "strengths", label: "Key Strengths", icon: "💪" },
  { id: "weaknesses", label: "Areas for Improvement", icon: "🔍" },
]

export default function Comparison() {
  const location = useLocation()
  const navigate = useNavigate()
  const { universities } = location.state || { universities: [] }

  // State for active category tabs
  const [activeCategories, setActiveCategories] = useState(comparisonCategories.slice(0, 6).map((cat) => cat.id))

  // Handle missing data by merging with our sample data
  const enrichedUniversities = universities.map((uni) => ({
    ...uni,
    ...universityDetails[uni.name],
  }))

  // Toggle category visibility
  const toggleCategory = (categoryId) => {
    if (activeCategories.includes(categoryId)) {
      if (activeCategories.length > 1) {
        // Ensure at least one category is always visible
        setActiveCategories(activeCategories.filter((id) => id !== categoryId))
      }
    } else {
      setActiveCategories([...activeCategories, categoryId])
    }
  }

  // Calculate which university is better in each category
  const getBetterUniversity = (category) => {
    if (enrichedUniversities.length !== 2) return null

    // For these categories, higher is better
    const higherIsBetter = ["rating", "campusSize", "strengths"]

    // For these categories, lower is better
    const lowerIsBetter = ["tuition", "acceptance"]

    // For array type data
    if (category === "strengths" || category === "weaknesses") {
      return enrichedUniversities[0][category]?.length > enrichedUniversities[1][category]?.length ? 0 : 1
    }

    // For tuition, we need to extract the number
    if (category === "tuition") {
      const extractNumber = (str) => {
        const match = str?.match(/\$([0-9,]+)/)
        return match ? Number.parseInt(match[1].replace(/,/g, "")) : 0
      }

      const tuition0 = extractNumber(enrichedUniversities[0][category])
      const tuition1 = extractNumber(enrichedUniversities[1][category])

      return tuition0 < tuition1 ? 0 : 1
    }

    // For acceptance rate, extract percentage
    if (category === "acceptance") {
      const extractPercent = (str) => {
        const match = str?.match(/([0-9.]+)%/)
        return match ? Number.parseFloat(match[1]) : 0
      }

      const rate0 = extractPercent(enrichedUniversities[0][category])
      const rate1 = extractPercent(enrichedUniversities[1][category])

      return rate0 < rate1 ? 0 : 1
    }

    // For rating, simple numeric comparison
    if (category === "rating") {
      return enrichedUniversities[0][category] > enrichedUniversities[1][category] ? 0 : 1
    }

    // For other categories, we don't highlight a "better" one
    return null
  }

  const handleBackClick = () => {
    navigate("/recommendation")
  }

  // If no universities are selected, redirect back
  if (!universities || universities.length === 0) {
    return (
      <div className="comparison-error">
        <h2>No universities selected for comparison</h2>
        <button onClick={handleBackClick} className="back-button">
          Back to Recommendations
        </button>
      </div>
    )
  }

  return (
    <main id="main-comparison">
      <Navbar />
      <div className="comparison-container">
        <div className="comparison-header-section">
          <h2>University Comparison</h2>
          <p className="comparison-subtitle">Compare details between your selected universities</p>

          <div className="category-toggles">
            {comparisonCategories.map((category) => (
              <button
                key={category.id}
                className={`category-toggle ${activeCategories.includes(category.id) ? "active" : ""}`}
                onClick={() => toggleCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="comparison-table-container">
          <div className="comparison-table">
            <div className="comparison-header">
              <div className="header-cell empty-cell"></div>
              {enrichedUniversities.map((university, index) => (
                <div className="header-cell university-header" key={index}>
                  <div className="university-image">
                    <img src={university.image || "/placeholder.svg"} alt={university.name} />
                    <div className="best-fit-badge">
                      <span>{university.bestFitPercentage}%</span>
                      <small>Best Fit</small>
                    </div>
                  </div>
                  <h3>{university.name}</h3>
                  <p className="university-location">{university.location}</p>
                  <a href={university.website} target="_blank" rel="noopener noreferrer" className="university-link">
                    Visit Website
                  </a>
                </div>
              ))}
            </div>

            {/* Dynamic comparison rows based on active categories */}
            {comparisonCategories
              .filter((cat) => activeCategories.includes(cat.id))
              .map((category) => {
                const betterUniversityIndex = getBetterUniversity(category.id)

                return (
                  <div className="comparison-row" key={category.id}>
                    <div className="row-label">
                      <span className="category-icon">{category.icon}</span>
                      {category.label}
                    </div>

                    {enrichedUniversities.map((university, index) => {
                      const isBetter = betterUniversityIndex === index
                      const content = university[category.id]

                      return (
                        <div className={`row-cell ${isBetter ? "better-option" : ""}`} key={index}>
                          {Array.isArray(content) ? (
                            <ul className="list-content">
                              {content.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{content || "Data not available"}</p>
                          )}
                          {isBetter && <div className="better-badge">Better Option</div>}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
          </div>
        </div>

        <div className="comparison-actions">
          <button onClick={handleBackClick} className="back-button">
            Back to Recommendations
          </button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
