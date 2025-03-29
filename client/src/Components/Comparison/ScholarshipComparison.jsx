import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';
import './ScholarshipComparison.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScholorshipComparison() {
    const location = useLocation();
    const { scholarships } = location.state; // Get selected scholarships from state
    const [user, setUser] = useState(null);

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
    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="comparison-container">
                <h2>Scholarship Comparison</h2>
                <table className="comparison-table">
                    <thead>
                        <tr>
                            <th>Criteria</th>
                            {scholarships.map((scholarship, index) => (
                                <th key={index}>{scholarship.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Description</td>
                            {scholarships.map((scholarship, index) => (
                                <td key={index}>{scholarship.description}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Eligibility</td>
                            {scholarships.map((scholarship, index) => (
                                <td key={index}>{scholarship.eligibility}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Amount</td>
                            {scholarships.map((scholarship, index) => (
                                <td key={index}>{scholarship.amount}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Deadline</td>
                            {scholarships.map((scholarship, index) => (
                                <td key={index}>{scholarship.deadline}</td>
                            ))}
                        </tr>
                        <tr>
                            <td>Best Fit Percentage</td>
                            {scholarships.map((scholarship, index) => (
                                <td key={index}>{scholarship.bestFitPercentage}%</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}
