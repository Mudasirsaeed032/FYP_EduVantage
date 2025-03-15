import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});  // State to hold individual field errors
    const [validated, setValidated] = useState(false);  // Track if the form has been validated
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        let currentErrors = {};

        // Validation check
        if (!name) {
            currentErrors.name = "Name is required";
        }
        if (!email) {
            currentErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            currentErrors.email = "Email is invalid";
        }
        if (!password) {
            currentErrors.password = "Password is required";
        } else if (password.length < 6) {
            currentErrors.password = "Password must be at least 6 characters";
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            setValidated(true);
            return;
        }

        // If validation passes, clear errors and make API call
        setErrors({});
        setValidated(true);

        // Make the API call to submit the form
        axios.post('http://localhost:3000/signup',
            {
                name: name,
                email: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => {
                alert('User has been registered successfully');
                navigate('/login');
            })
            .catch((err) => {
                console.log('error:', err);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100 vw-100' id='signup-bg'>
            <div className='text-white p-3 rounded w-50' id='signup-container'>
                <h1>Register Form</h1>
                <form className='mt-5' onSubmit={submitForm} noValidate id='signup-form'>

                    {/* Name Field */}
                    <div className='mb-3'>
                        <input
                            type='text'
                            className={`form-control ${validated && (errors.name ? 'is-invalid' : 'is-valid')}`}
                            id='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email Field */}
                    <div className='mb-3'>
                        <input
                            type="email"
                            className={`form-control ${validated && (errors.email ? 'is-invalid' : 'is-valid')}`}
                            id="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className={`form-control ${validated && (errors.password ? 'is-invalid' : 'is-valid')}`}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-success">Register</button>
                </form>
                <p>Already have an account?</p>
                <Link to='/login' className='btn btn-success rounded-3' id='login-button'>Login</Link>
            </div>
        </div>
    );
}
