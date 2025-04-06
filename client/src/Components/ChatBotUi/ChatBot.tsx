import React from "react";
import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm your friendly assistant. How can I help you today?",
      timestamp: "less than a minute ago",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      sender: "user",
      text: input,
      timestamp: "just now",
    };
    const botReply = {
      sender: "bot",
      text: `You said: ${input}`,
      timestamp: "just now",
    };
    setMessages([...messages, newMsg, botReply]);
    setInput("");
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl overflow-hidden bg-white border">
      <div className="bg-[#0f172a] text-white px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full">
            <span className="text-[#0f172a]">🤖</span>
          </div>
          <div>
            <h2 className="font-semibold">ChatBot Assistant</h2>
            <p className="text-xs text-gray-300">Always here to help</p>
          </div>
        </div>
      </div>

      <div className="p-4 h-96 overflow-y-auto bg-gray-50 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t px-4 py-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="text-gray-500 hover:text-blue-500"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}