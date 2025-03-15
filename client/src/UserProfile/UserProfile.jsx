import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
    const { id } = useParams();  // Get the user ID from the URL params

    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [countryOfResidence, setCountryOfResidence] = useState("");
    const [gpaType, setGpaType] = useState("");
    const [gpa, setGpa] = useState("");
    const [bachelorField, setBachelorField] = useState("");
    const [institution, setInstitution] = useState("");
    const [testName, setTestName] = useState("");
    const [score, setScore] = useState("");
    const [tuitionBudget, setTuitionBudget] = useState("");
    const [livingAllowance, setLivingAllowance] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/profile/${id}`)
            .then(response => response.json())
            .then(data => {
                setName(data.name || "");
                setDob(data.dob || "");
                setPhone(data.phone || "");
                setGender(data.gender || "");
                setCountryOfResidence(data.countryOfResidence || "");
                setGpaType(data.gpaType || "");
                setGpa(data.gpa || "");
                setBachelorField(data.bachelorField || "");
                setInstitution(data.institution || "");
                setTestName(data.testScores?.testName || "");
                setScore(data.testScores?.score || "");
                setTuitionBudget(data.budget?.tuitionBudget || "");
                setLivingAllowance(data.budget?.livingAllowance || "");
            })
            .catch(err => console.error('Error fetching user profile:', err));
    }, [id]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

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
            livingAllowance
        };

        fetch(`http://localhost:3000/profile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfileData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Profile updated:', data);
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };


    return (
        <div>
            <div className="section1" id="user_section1">
                <Navbar user={user} handleLogout={handleLogout} />
                <div className="container-fluid" id="user_container">
                    <header id="user_header">User Profile</header>
                    <form onSubmit={handleSubmit}>
                        <div className="form first">
                            <div className="details personal">
                                <span className="title">Personal Information</span>
                                <div className="fields" id="user_fields">
                                    <div className="input-field">
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            value={name || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            value={dob || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Mobile Number</label>
                                        <input
                                            type="text"
                                            value={phone || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Gender</label>
                                        <select
                                            id="gender"
                                            value={gender || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="" disabled defaultValue>Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="input-field">
                                        <label>Country of Residence</label>
                                        <input
                                            type="text"
                                            value={countryOfResidence || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setCountryOfResidence(e.target.value)}
                                            placeholder="Enter your country"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="details academic">
                                <span className="title">Academic Details</span>
                                <div className="fields" id="user_fields">
                                    <div className="input-field">
                                        <label>GPA Type</label>
                                        <input
                                            type="text"
                                            value={gpaType || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setGpaType(e.target.value)}
                                            placeholder="Enter GPA type"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>GPA</label>
                                        <input
                                            type="number"
                                            value={gpa || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setGpa(e.target.value)}
                                            placeholder="Enter GPA"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Field of Bachelors</label>
                                        <input
                                            type="text"
                                            value={bachelorField || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setBachelorField(e.target.value)}
                                            placeholder="Enter your field of study"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Previous/Current Institution</label>
                                        <input
                                            type="text"
                                            value={institution || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setInstitution(e.target.value)}
                                            placeholder="Enter your institution"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="details test-scores">
                                <span className="title">Test Scores Detail</span>
                                <div className="fields" id="user_fields">
                                    <div className="input-field">
                                        <label>Which Language Test(s) Have You Given?</label>
                                        <select
                                            id="test-select"
                                            value={testName || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setTestName(e.target.value)}
                                        >
                                            <option value="" disabled defaultValue>Select your test</option>
                                            <option value="IELTS">IELTS</option>
                                            <option value="TOEFL">TOEFL</option>
                                            <option value="PTE">PTE</option>
                                            <option value="Duolingo">Duolingo</option>
                                            <option value="Cambridge">Cambridge</option>
                                            <option value="TOEIC">TOEIC</option>
                                        </select>
                                    </div>
                                    <div className="input-field">
                                        <label>Test Score</label>
                                        <input
                                            type="number"
                                            value={score || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setScore(e.target.value)}
                                            placeholder="Enter your score"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="details budget">
                                <span className="title">Budget Details</span>
                                <div className="fields" id="user_fields">
                                    <div className="input-field">
                                        <label>Tuition Budget (USD)</label>
                                        <input
                                            type="number"
                                            value={tuitionBudget || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setTuitionBudget(e.target.value)}
                                            placeholder="Enter your tuition budget"
                                        />
                                    </div>
                                    <div className="input-field">
                                        <label>Monthly Living Allowance (USD)</label>
                                        <input
                                            type="number"
                                            value={livingAllowance || ""}  // Ensure a fallback empty string
                                            onChange={(e) => setLivingAllowance(e.target.value)}
                                            placeholder="Enter your monthly allowance"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" id="submitButton">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
