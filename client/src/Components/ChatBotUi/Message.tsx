import React from 'react';
import { User, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type MessageProps = {
  message: {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  };
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`rounded-full p-2 h-8 w-8 flex items-center justify-center ${isUser ? 'bg-primary' : 'bg-gray-200'}`}>
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-gray-500" />
          )}
        </div>
        
        <div>
          <div 
            className={`py-2 px-4 rounded-2xl ${
              isUser ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          </div>
          <p className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
