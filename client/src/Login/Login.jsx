import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});  // State to hold individual field errors
    const [validated, setValidated] = useState(false);  // Track if the form has been validated
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const submitForm = (e) => {
        e.preventDefault();
        let currentErrors = {};

        // Validation check
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

        axios.post('http://localhost:3000/login', { email, password })
            .then((res) => {
                if (res.data === 'True') {
                    alert('Login Success');
                    navigate('/home');
                } else {
                    alert('Login Failed');
                }
            })
            .catch((err) => {
                console.log('error:', err);
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100 vw-100' id='login-bg'>
            <div className='text-white p-3 rounded w-50' id='login-container'>
                <h1>Login Form</h1>
                <form className='mt-5' onSubmit={submitForm} noValidate id='login-form'>

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

                    <button type="submit" className="btn btn-success">Log In</button>
                </form>
                <p>Don't have an account?</p>
                <Link to='/signup' className='btn btn-success rounded-3' id='signup-button'>Register</Link>
            </div>
        </div>
    );
}
