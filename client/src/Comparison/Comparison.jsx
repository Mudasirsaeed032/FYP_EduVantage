import React from 'react';
import { useLocation } from 'react-router-dom'; // To receive the state from previous page
import './Comparison.css';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';

export default function Comparison() {
    const location = useLocation();
    const { universities } = location.state;

    return (
        <main id="main-recommendation">
            <Navbar />
            <div className="comparison-container">

                <h2>University Comparison</h2>
                <div className="comparison-table">
                    <div className="comparison-header">
                        <div className="header-cell"></div> {/* Empty header for labels */}
                        {universities.map((university, index) => (
                            <div className="header-cell" key={index}>
                                <h3>{university.name}</h3>
                                <p>{university.location}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row for Budget */}
                    <div className="comparison-row">
                        <div className="row-label">Tuition Fee</div>
                        {universities.map((university, index) => (
                            <div className="row-cell" key={index}>
                                <p>{university.budget}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row for Program Duration */}
                    <div className="comparison-row">
                        <div className="row-label">Program Duration</div>
                        {universities.map((university, index) => (
                            <div className="row-cell" key={index}>
                                <p>{university.duration}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row for Requirements */}
                    <div className="comparison-row">
                        <div className="row-label">Requirements</div>
                        {universities.map((university, index) => (
                            <div className="row-cell" key={index}>
                                <p>{university.requirements}</p>
                            </div>
                        ))}
                    </div>

                    {/* Row for University Rating */}
                    <div className="comparison-row">
                        <div className="row-label">University Rating</div>
                        {universities.map((university, index) => (
                            <div className="row-cell" key={index}>
                                <p>{university.rating} / 5</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div><Footer /></div>
        </main>

    );
}
