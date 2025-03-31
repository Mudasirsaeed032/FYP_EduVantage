import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { cn } from "../../lib/utils";
import { useToast } from "@/hooks/use-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! How can I assist you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [newMessage]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand. Can you tell me more about that?",
        "That's interesting! How can I help with this further?",
        "Thanks for sharing. Let me think about how I can assist you with this.",
        "I see what you mean. Is there anything specific you'd like to know?",
        "I'm here to help! Would you like more information about this topic?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b md:hidden">
        <SidebarTrigger />
        <h2 className="text-xl font-semibold text-gray-800">Chat</h2>
        <div className="w-7"></div> {/* Spacer for alignment */}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-gray-50">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 text-sm animate-pulse ml-10">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
              <div className="dot-flashing"></div>
            </div>
            <span>AI is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 bg-white shadow-lg">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className={cn(
              "flex w-full rounded-lg border border-input bg-background px-4 py-3 text-sm",
              "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 min-h-[56px] max-h-[160px] resize-none pr-12",
              "transition-all duration-200 ease-in-out"
            )}
            rows={1}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim()}
            className="absolute right-2 bottom-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg p-2 h-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          ChatBot may produce inaccurate information about people, places, or facts.
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
