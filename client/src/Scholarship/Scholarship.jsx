import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Boilerplate/Navbar'; // Import Navbar component
import Footer from '../Boilerplate/Footer'; // Import Footer component
import './Scholarship.css'
import axios from 'axios';

export default function Scholorship() {
    const [selectedScholarships, setSelectedScholarships] = useState([]); // State to store selected scholarships
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Hardcoded scholarship data with Best Fit percentages
    const scholarships = [
        {
            name: 'Harvard Scholarship',
            description: 'This scholarship is available for outstanding students with a focus on research.',
            eligibility: 'GPA 3.8+, Research background',
            amount: '$20,000/year',
            deadline: 'March 2024',
            bestFitPercentage: 92,
            image: 'https://2u.com/static/84f4025b19c2bf44a1c9b049994c1eff/ee8ba/baker-library-harvard-university_OPxWuDn.max-2880x1800.jpg'
        },
        {
            name: 'Stanford Scholarship',
            description: 'A merit-based scholarship for students showing exceptional academic performance.',
            eligibility: 'GPA 3.7+, Leadership experience',
            amount: '$25,000/year',
            deadline: 'April 2024',
            bestFitPercentage: 89,
            image: 'https://cdn.britannica.com/25/121725-050-8BF363EC/Hoover-Tower-Stanford-University-California.jpg'
        }
    ];
    useEffect(() => {
        axios.get('http://localhost:3000/home', { withCredentials: true })
            .then(response => {
                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                setUser(null);
            });
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout', { withCredentials: true })
            .then((res) => {
                console.log(res.data.message);
                setUser(null);
                navigate('/recommendation');
            })
            .catch((err) => {
                console.error('error:', err);
            });
    }

    const handleSelect = (scholarship) => {
        if (selectedScholarships.includes(scholarship)) {
            setSelectedScholarships(selectedScholarships.filter((item) => item !== scholarship));
        } else if (selectedScholarships.length < 2) {
            setSelectedScholarships([...selectedScholarships, scholarship]);
        }
    };

    const handleCompare = () => {
        if (selectedScholarships.length === 2) {
            navigate('/scholarshipcomparison', { state: { scholarships: selectedScholarships } });
        }
    };

    return (
        <main id="main-scholarship">
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="scholarship-container">
                <h2>Available Scholarships</h2>
                <div className="scholarship-cards">
                    {scholarships.map((scholarship, index) => (
                        <div className="card" key={index}>
                            <img src={scholarship.image} alt={`${scholarship.name} image`} className="card-img" />
                            <div className="card-content">
                                <h3 className="card-title">{scholarship.name}</h3>
                                <p className="card-description">{scholarship.description}</p>
                                <p><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                                <p><strong>Amount:</strong> {scholarship.amount}</p>
                                <p><strong>Deadline:</strong> {scholarship.deadline}</p>
                                <p className="best-fit">
                                    Best Fit: <strong>{scholarship.bestFitPercentage}%</strong>
                                </p>
                                <div className="compare-checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelect(scholarship)}
                                        checked={selectedScholarships.includes(scholarship)}
                                        disabled={selectedScholarships.length === 2 && !selectedScholarships.includes(scholarship)}
                                    />
                                    <label>Select to Compare</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedScholarships.length === 2 && (
                    <div className="compare-prompt">
                        <button onClick={handleCompare} className="compare-btn">
                            Compare Now
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
