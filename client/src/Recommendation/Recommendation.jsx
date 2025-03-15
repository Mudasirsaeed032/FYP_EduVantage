import React, { useState, useEffect } from 'react';
import './Recommendation.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';
import axios from 'axios';

export default function Recommendation() {
    const [selectedUniversities, setSelectedUniversities] = useState([]); // State to store selected universities
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // Hardcoded university data with Best Fit percentages
    const universities = [
        {
            name: 'Harvard University',
            location: 'Cambridge, MA',
            description: 'A prestigious Ivy League research university offering a wide range of graduate programs.',
            website: 'https://www.harvard.edu',
            image: 'https://media.istockphoto.com/id/539018591/photo/harvard-moors-hall.jpg?s=2048x2048&w=is&k=20&c=Ebx0J6rNn2mLqXtLDI07ORJ6lUMgbXE2IR55b3hbtk4=',
            bestFitPercentage: 92 // Adding best fit percentage
        },
        {
            name: 'Stanford University',
            location: 'Stanford, CA',
            description: 'Known for its entrepreneurial character and ties to Silicon Valley, Stanford offers top programs in various fields.',
            website: 'https://www.stanford.edu',
            image: 'https://images.unsplash.com/photo-1681782421891-5088f13466ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            bestFitPercentage: 89
        },
        {
            name: 'Massachusetts Institute of Technology (MIT)',
            location: 'Cambridge, MA',
            description: 'MIT is a leader in innovation and research, offering cutting-edge programs in science and technology.',
            website: 'https://www.mit.edu',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQapTmka1mz_TPvs-Et7Zsxo_C3mt8FFH89vQ&s',
            bestFitPercentage: 95
        },
        {
            name: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            description: 'Berkeley is a leading public university known for its research and diverse graduate programs.',
            website: 'https://www.berkeley.edu',
            image: 'https://media.istockphoto.com/id/1331003550/photo/on-campus-at-uc-berkley.jpg?s=612x612&w=0&k=20&c=5kFzYWf-JbBY6oYvqcmOavd2-GewcxL8NzqBbxUSMUA=',
            bestFitPercentage: 88
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

    const handleSelect = (university) => {
        if (selectedUniversities.includes(university)) {
            setSelectedUniversities(selectedUniversities.filter((item) => item !== university));
        } else if (selectedUniversities.length < 2) {
            setSelectedUniversities([...selectedUniversities, university]);
        }
    };

    const handleCompare = () => {
        if (selectedUniversities.length === 2) {
            alert(`Compare ${selectedUniversities[0].name} and ${selectedUniversities[1].name}`);
            navigate('/comparison', { state: { universities: selectedUniversities } });
        }
    };

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

    return (
        <main id="main-recommendation">
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="recommendation-container">
                <h2>Recommended Universities</h2>
                <div className="university-cards">
                    {universities.map((university, index) => (
                        <div className="card" key={index}>
                            <img src={university.image} alt={`${university.name} image`} className="card-img" />
                            <div className="card-content">
                                <h3 className="card-title">{university.name}</h3>
                                <p className="card-location">{university.location}</p>
                                <p className="card-description">{university.description}</p>
                                <p className="best-fit">
                                    Best Fit: <strong>{university.bestFitPercentage}%</strong>
                                </p>
                                <a href={university.website} target="_blank" rel="noopener noreferrer" className="card-link">
                                    Visit Website
                                </a>
                                <div className="compare-checkbox">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelect(university)}
                                        checked={selectedUniversities.includes(university)}
                                        disabled={selectedUniversities.length === 2 && !selectedUniversities.includes(university)}
                                    />
                                    <label>Select to Compare</label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedUniversities.length === 2 && (
                    <div className="compare-prompt">
                        <button onClick={handleCompare} className="compare-btn">
                            Compare Now
                        </button>
                    </div>
                )}
            </div>
            <div><Footer /></div>
        </main>


    );
}
