import { useState, useRef, useEffect } from "react";
import { Send, Plus, MessageSquare, GraduationCap } from "lucide-react";

const FullChat = () => {
  const [recentChats, setRecentChats] = useState([
    { id: 1, name: "Course Selection Help", lastMessage: "How can I assist you with your course selection today?" },
    { id: 2, name: "Scholarship Information", lastMessage: "Here are the scholarship deadlines for this semester." },
    { id: 3, name: "Study Tips", lastMessage: "Have you tried the Pomodoro technique?" },
    { id: 4, name: "Assignment Help", lastMessage: "Let me help you understand this assignment." },
    { id: 5, name: "Campus Resources", lastMessage: "The library is open until 11 PM on weekdays." },
  ]);

  const [currentChat, setCurrentChat] = useState(recentChats[0]);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you with your education needs today?", time: "4:18 PM" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  
    const newMessage = { from: "user", text: input, time: timeString };
    setMessages([...messages, newMessage]);
    setInput("");
  
    // Simulate bot typing
    setIsTyping(true);
  
    try {
      // Send request to the backend API
      const response = await fetch(`http://localhost:8000/ask?query=${encodeURIComponent(input)}`);
  
      // Check if the response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the JSON response from the backend
      const data = await response.json();
      console.log("API Response:", data);  // Log the response for debugging
  
      // Check if the response has the expected structure
      if (data?.response?.text) {
        const botMessage = data.response.text;
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: botMessage, time: timeString },
        ]);
      } else if (data?.error) {
        throw new Error(`Backend Error: ${data.error}`);
      } else {
        throw new Error("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error fetching the response:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Error: ${error.message}`, time: timeString },
      ]);
    } finally {
      setIsTyping(false);
    }
  };  


  const handleChatSelect = (chat) => {
    setCurrentChat(chat);
    setMessages([{ from: "bot", text: chat.lastMessage, time: "4:18 PM" }]);
  };

  return (
    <div className="flex h-screen w-screen font-sans bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-62 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Logo */}
        <div className="py-4 px-3 flex items-center gap-1 border-b border-gray-800">
          <GraduationCap className="h-8 w-8 text-[#3BAF4A]" />
          <span className="text-white font-bold text-3xl">
            Edu<span className="text-[#3BAF4A]">Vantage</span>
          </span>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            className="w-full bg-[#3BAF4A] hover:bg-[#35a044] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => {
              const newChat = {
                id: recentChats.length + 1,
                name: "New Chat",
                lastMessage: "How can I help you with your education today?",
              };
              setRecentChats([newChat, ...recentChats]);
              handleChatSelect(newChat);
            }}
          >
            <Plus size={16} />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <p className="text-xs font-medium text-gray-400 mb-2">Recent Conversations</p>
          </div>
          <div className="space-y-1 px-2">
            {recentChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`cursor-pointer py-2 px-3 rounded-md transition-all duration-200 flex items-start gap-2 ${chat.id === currentChat.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <MessageSquare
                  size={16}
                  className={`mt-0.5 ${chat.id === currentChat.id ? "text-[#3BAF4A]" : "text-gray-500"}`}
                />
                <p className="text-sm truncate">{chat.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Version */}
        <div className="p-3 text-xs text-gray-500 border-t border-gray-800">EduVantage Assistant v1.0</div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Header */}
        <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="text-base font-medium text-white">{currentChat.name}</h4>
            <span className="ml-2 text-xs text-gray-400">4:18 PM</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto bg-gray-900">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex mb-4 ${msg.from === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`px-4 py-2.5 max-w-md rounded-2xl ${msg.from === "user" ? "bg-[#3BAF4A] text-white" : "bg-gray-800 text-white"
                  }`}
              >
                <div className="text-sm">{msg.text}</div>
                <div className={`text-xs mt-1 ${msg.from === "user" ? "text-green-100" : "text-gray-400"}`}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-fadeIn mb-4">
              <div className="px-4 py-2.5 rounded-2xl bg-gray-800 text-white">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-[#3BAF4A] animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#3BAF4A] animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-[#3BAF4A] animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>


        {/* Footer */}
        <div className="p-2 text-xs text-gray-500 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-md outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-full bg-[#3BAF4A] hover:bg-[#35a044] transition-colors"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullChat;
