import React from "react";
import { User, Bot } from "lucide-react";
import { format } from "date-fns";

const ChatMessage = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      <div className={`flex transition-all duration-300 ease-in-out hover:translate-x-1 ${isUser ? "bg-white" : "bg-gray-50"}`}>
        <div className="flex items-start space-x-4 p-4 w-full">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 hover:scale-110 ${isUser ? "bg-gradient-to-r from-purple-500 to-indigo-600" : "bg-gradient-to-r from-gray-200 to-gray-300"}`}
          >
            {isUser ? (
              <User className="h-4 w-4 text-white" />
            ) : (
              <Bot className="h-4 w-4 text-gray-600" />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center">
              <h3 className="font-medium text-sm">
                {isUser ? "You" : "ChatBot"}
              </h3>
              <span className="text-xs text-gray-500 ml-2">
                {format(message.timestamp, "h:mm a")}
              </span>
            </div>
            <div className={`text-sm whitespace-pre-wrap break-words p-3 rounded-lg shadow-sm ${isUser ? "bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100" : "bg-white border border-gray-100"}`}>
              {message.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
