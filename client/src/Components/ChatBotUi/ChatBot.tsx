
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import Message from './Message';

type MessageType = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      text: "Hello! I'm your friendly assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: MessageType = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand your question. Let me help you with that.",
        "Thanks for asking! Here's what I can tell you...",
        "Great question! I'd be happy to explain that.",
        "I'm processing your request. Is there anything specific you'd like to know?",
        "Let me check that for you. I'll have an answer shortly.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMessage: MessageType = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="bg-primary p-4 flex items-center space-x-3 text-white">
        <div className="bg-primary-foreground rounded-full p-2">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-lg">ChatBot Assistant</h3>
          <p className="text-xs opacity-75">Always here to help</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-left">
            <div className="bg-gray-200 rounded-full p-2 h-8 w-8 flex items-center justify-center">
              <Bot className="h-4 w-4 text-gray-500" />
            </div>
            <div className="bg-gray-200 rounded-2xl py-2 px-4 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="dot-typing"></div>
                <div className="dot-typing animation-delay-200"></div>
                <div className="dot-typing animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Type your message..."
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ''}
            className={`p-2 rounded-full ${
              inputValue.trim() === '' ? 'bg-gray-300 text-gray-500' : 'bg-primary text-white'
            } focus:outline-none transition-colors`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;