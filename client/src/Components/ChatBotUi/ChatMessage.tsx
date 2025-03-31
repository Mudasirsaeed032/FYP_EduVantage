import React from "react";
import { User, Bot } from "lucide-react";
import { cn } from "../../lib/utils";
import { format } from "date-fns";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";
  
  return (
    <div className="animate-fade-in">
      <div className={cn(
        "flex px-4 py-3",
        isUser ? "justify-end" : "justify-start"
      )}>
        <div className="flex max-w-[80%] items-start space-x-2">
          {!isUser && (
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
              <Bot className="h-5 w-5 text-gray-600" />
            </div>
          )}
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {isUser ? "You" : "ChatBot"}
              </span>
              <span className="text-xs text-gray-500">
                {format(message.timestamp, "h:mm a")}
              </span>
            </div>
            
            <div className={cn(
              "py-2 px-3 rounded-2xl break-words",
              isUser 
                ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-tr-none" 
                : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
            )}>
              {message.text}
            </div>
          </div>
          
          {isUser && (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;