import React, { useState } from 'react';

const FullChat = () => {
  const [recentChats, setRecentChats] = useState([
    { id: 1, name: 'Support Bot', lastMessage: 'How can I assist you today?' },
    { id: 2, name: 'Admissions Bot', lastMessage: 'Application deadline is April 20th.' },
    { id: 3, name: 'Application Helper', lastMessage: 'Need help with the SOP?' },
  ]);

  const [currentChat, setCurrentChat] = useState(recentChats[0]);
  const [messages, setMessages] = useState([
    { from: 'bot', text: currentChat.lastMessage },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { from: 'user', text: input };
    setMessages([
      ...messages,
      newMessage,
      { from: 'bot', text: 'Thanks for your message!' },
    ]);
    setInput('');
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Sidebar */}
      <div className="w-1/4 min-w-[240px] bg-gray-100 border-r p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Chats</h2>
        <div className="space-y-3">
          {recentChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => {
                setCurrentChat(chat);
                setMessages([{ from: 'bot', text: chat.lastMessage }]);
              }}
              className={`cursor-pointer p-3 rounded-lg transition-all ${
                chat.id === currentChat.id
                  ? 'bg-blue-100 border border-blue-300'
                  : 'hover:bg-gray-200'
              }`}
            >
              <p className="font-semibold text-gray-800">{chat.name}</p>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50">
          <h3 className="text-xl font-semibold">{currentChat.name}</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.from === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-sm ${
                  msg.from === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullChat;
