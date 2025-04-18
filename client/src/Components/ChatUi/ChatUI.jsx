import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from 'react-icons/fa';
import "./ChatUI.css";

export default function ChatUI({ initialMessage }) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { 
            text: "Welcome to EduVantage! How can I assist you today?", 
            sender: "bot",
            time: "11:48 PM"
        }
    ]);
    
    // Use a ref to track if initial message has been processed
    const initialMessageProcessedRef = useRef(false);

    const dummyResponses = [
        "Interesting! Let me check that for you.",
        "Thanks for sharing! Here's what I found:",
        "Fascinating question! Let me look it up.",
        "Great point! According to our resources:",
        "I appreciate your inquiry. Here's the info:"
    ];

    const getCurrentTime = () => {
        const now = new Date();
        return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} PM`;
    };

    // Process initial message only once using useEffect with empty dependency array
    useEffect(() => {
        // This effect runs only on mount
        if (initialMessage && initialMessage.trim() !== "" && !initialMessageProcessedRef.current) {
            console.log("Processing initial message:", initialMessage);
            
            const newMessage = {
                text: initialMessage,
                sender: "user",
                time: getCurrentTime()
            };

            setMessages(prev => [...prev, newMessage]);
            initialMessageProcessedRef.current = true;

            // Simulate a bot response
            setTimeout(() => {
                const botResponse = {
                    text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
                    sender: "bot",
                    time: getCurrentTime()
                };
                setMessages(prev => [...prev, botResponse]);
            }, 500);
        }
    }, [initialMessage]); // Only dependency is initialMessage

    const handleSend = () => {
        if (input.trim()) {
            console.log("Sending user message:", input);
            
            // Add user message
            const newMessage = {
                text: input,
                sender: "user",
                time: getCurrentTime()
            };

            setMessages(prev => [...prev, newMessage]);

            // Add bot response
            setTimeout(() => {
                const botResponse = {
                    text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
                    sender: "bot",
                    time: getCurrentTime()
                };
                setMessages(prev => [...prev, botResponse]);
            }, 500);

            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">
                    <h1>EduAssistant</h1>
                    <div className="model-buttons">
                        <button className="model-btn">Quick Search</button>
                        <button className="model-btn">Deep Search</button>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.sender}`}>
                            <div className="message-text">{msg.text}</div>
                            <div className="message-time">{msg.time}</div>
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message"
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button 
                        className="send-button" 
                        onClick={handleSend}
                        disabled={!input.trim()}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}