import React, { useState } from "react";

import "./ChatUI.css";

export default function ChatUI() {

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">
                    <h1>Chat UI</h1>
                    <div className="model-buttons">
                        <button className="model-btn">Comprehensive Search</button>
                        <button className="model-btn">Deep Search</button>
                    </div>
                </div>
                <div className="chat-messages">
                    <div className="chat-message bot">Hello! How can I assist you?</div>
                    <div className="chat-message user">
                        I need some help in landing a perfect on Arham in Tekken (again lol)
                    </div>
                </div>
                <div className="chat-input">
                    <input type="text" placeholder="Type your queries here..." />
                    <button className="send-button">Send</button>
                </div>
            </div>
        </div>
    );
}
