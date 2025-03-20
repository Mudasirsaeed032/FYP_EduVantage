import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ChatUI from '../ChatUi/ChatUi';
import '../Home/Home.css'

export default function ChatPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Extract query from location state once
    const initialQuery = location.state?.query || '';

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3000/home', { withCredentials: true })
            .then((res) => {
                if (res.data.user) setUser(res.data.user);
                setIsLoading(false);
            })
            .catch(() => {
                setUser(null);
                setIsLoading(false);
            });
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3000/logout', { withCredentials: true })
            .then((res) => {
                console.log(res.data.message);
                setUser(null);
            })
            .catch((err) => {
                console.error('error:', err);
            });
    }

    if (isLoading) {
        return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
    }

    return (
        <div className="home">
            <Navbar user={user} handleLogout={handleLogout} />
            <main className='container-fluid p-0'>
                <section className='section mt-5' id='section1'>
                    <div className='row text-center'>
                        <div className='col-12 fade-in' id="mainTagline">
                            Welcome to <span className='highlightedWord'>EduVantage</span>
                        </div>

                        <div className="col-12 mb-2">
                            <div className="chatbot-container mx-auto">
                                {/* Pass the initialQuery as a key to force re-mount if query changes */}
                                <ChatUI 
                                    key={`chat-${initialQuery}`} 
                                    initialMessage={initialQuery}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </div>
    );
}