import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { Send, Plus, MessageSquare, GraduationCap } from "lucide-react";


import { Link } from 'react-router-dom';

const navItems = ['Home', 'Scholarships', 'About', 'Contact Us'];

export default function Navbar({ user, handleLogout }) {

    return (
        <nav id='mainNav' className="navbar navbar-expand-lg navbar-dark">
            <div className="navbar-brand">
            <div className="flex items-center gap-1 ">
          <GraduationCap className="h-8 w-8 text-[#3BAF4A]" />
          <Link className='nav-link' to='/home'><span className="text-white font-bold text-3xl">
            Edu<span className="text-[#3BAF4A]">Vantage</span>
          </span>
          </Link>
        </div>
            </div>
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center">
                <ul className="navbar-nav">
                    {navItems.map((item) => {
                        return (
                            <li key={item} className="nav-item mx-3">
                                {item === 'Scholarships' && (
                                    <Link className='nav-link' to='/scholarship'>{item}</Link>
                                )}
                                {item === 'Home' && (
                                    <Link className='nav-link' to='/home'>{item}</Link>
                                )}
                                {item !== 'Recommendations' && item !== 'Contact Us' && item !== 'Home' && item !== 'About' && item != 'Scholarships' && (
                                    <a className='nav-link' href='#'>{item}</a>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
            {!user ? <div className='Signup-Navbar'>
                <div className="auth-buttons">
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/signup" className="signup-button">Sign Up</Link>
                </div>
            </div>
                :
                <div className='me-4 user-greeting d-flex align-items-center'>
                    <div className='text-white me-2'>Welcome! <Link id='username' to={`/profile/${user._id}`}>{user.name}</Link></div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            }

        </nav>
    );
}