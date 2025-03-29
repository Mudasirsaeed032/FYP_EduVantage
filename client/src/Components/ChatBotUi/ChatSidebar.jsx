import React from "react";
import { Plus, MessageSquare, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../UI/Sidebar";

const MOCK_CHAT_HISTORY = [
  { id: "1", title: "Introduction to AI", date: new Date(2023, 4, 15) },
  { id: "2", title: "Help with React coding", date: new Date(2023, 4, 16) },
  { id: "3", title: "Explaining quantum computing", date: new Date(2023, 4, 17) },
  { id: "4", title: "Debugging JavaScript issue", date: new Date(2023, 4, 18) },
  { id: "5", title: "Planning a vacation", date: new Date(2023, 4, 19) },
];

const groupChatsByDate = (chats) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  
  return {
    today: chats.filter(chat => {
      const chatDate = new Date(chat.date);
      chatDate.setHours(0, 0, 0, 0);
      return chatDate.getTime() === today.getTime();
    }),
    yesterday: chats.filter(chat => {
      const chatDate = new Date(chat.date);
      chatDate.setHours(0, 0, 0, 0);
      return chatDate.getTime() === yesterday.getTime();
    }),
    previousWeek: chats.filter(chat => {
      const chatDate = new Date(chat.date);
      chatDate.setHours(0, 0, 0, 0);
      return chatDate.getTime() < yesterday.getTime() && chatDate.getTime() >= lastWeek.getTime();
    }),
    earlier: chats.filter(chat => {
      const chatDate = new Date(chat.date);
      chatDate.setHours(0, 0, 0, 0);
      return chatDate.getTime() < lastWeek.getTime();
    }),
  };
};

const ChatSidebar = () => {
  const handleNewChat = () => {
    console.log("Creating new chat");
  };

  const groupedChats = groupChatsByDate(MOCK_CHAT_HISTORY);

  return (
    <Sidebar variant="sidebar" collapsible={true}>
      <SidebarHeader className="p-3">
        <button 
          onClick={handleNewChat} 
          className="w-full justify-start flex items-center px-4 py-2 rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 hover:shadow-md"
        >
          <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          New Chat
        </button>
      </SidebarHeader>
      
      <SidebarContent>
        {Object.entries(groupedChats).map(([key, chats]) => (
          chats.length > 0 && (
            <SidebarGroup key={key}>
              <SidebarGroupLabel className="text-gradient font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</SidebarGroupLabel>
              <SidebarMenu>
                {chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton className="transition-all duration-200 hover:bg-purple-50 hover:border-l-2 hover:border-purple-500 hover-lift">
                      <MessageSquare className="h-4 w-4 mr-2 text-purple-500" />
                      <span>{chat.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )
        ))}
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t">
        <div className="flex items-center justify-center text-xs text-gray-500 hover-lift">
          <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
          <span>ChatBot Assistant v1.0</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
