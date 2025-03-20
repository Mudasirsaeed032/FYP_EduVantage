import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Boilerplate/Navbar';
import Footer from '../Boilerplate/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ChatUI from '../ChatUi/ChatUi';
import './Home.css';

export default function Home() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

<<<<<<< HEAD
=======
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            alert('Please enter a query.');
            return;
        }
        navigate('/recommendation', { state: { query: searchQuery } });
    };

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: `Response to: "${input}" (Random AI response)`, sender: "bot" },
                ]);
            }, 200); // Simulate a bot response delay
        }
    };
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

>>>>>>> e97ea6b504892dd00087a3652498e6daad5ceba8
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
                        
                        {/* Static Chat UI */}
                        <div className="col-12 mt-4 mb-5">
                            <div className="chatbot-container mx-auto">
                                <ChatUI />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </div>
    );
}