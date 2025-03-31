import React from "react";
import { Plus, MessageSquare } from "lucide-react";
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
  SidebarProvider,
} from "../UI/Sidebar";

type ChatHistoryItem = {
  id: string;
  title: string;
  date: Date;
};

const MOCK_CHAT_HISTORY: ChatHistoryItem[] = [
  { id: "1", title: "Introduction to AI", date: new Date(2023, 4, 15) },
  { id: "2", title: "Help with React coding", date: new Date(2023, 4, 16) },
  { id: "3", title: "Explaining quantum computing", date: new Date(2023, 4, 17) },
  { id: "4", title: "Debugging JavaScript issue", date: new Date(2023, 4, 18) },
  { id: "5", title: "Planning a vacation", date: new Date(2023, 4, 19) },
];

// Group chats by today, yesterday, previous 7 days, and earlier
const groupChatsByDate = (chats: ChatHistoryItem[]) => {
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
    // In a real app, you would create a new chat and navigate to it
  };

  const groupedChats = groupChatsByDate(MOCK_CHAT_HISTORY);

  return (
    <SidebarProvider>
    <Sidebar variant="sidebar" collapsible="offcanvas"         className="bg-gray-50 border-r border-gray-200 w-64 flex md:flex !block !w-[250px]"

>
      <SidebarHeader className="p-3">
        <button 
          onClick={handleNewChat} 
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:shadow-md transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </button>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        {groupedChats.today.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-2 py-1">Today</SidebarGroupLabel>
            <SidebarMenu>
              {groupedChats.today.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-200 text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{chat.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
        
        {groupedChats.yesterday.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-2 py-1">Yesterday</SidebarGroupLabel>
            <SidebarMenu>
              {groupedChats.yesterday.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-200 text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{chat.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
        
        {groupedChats.previousWeek.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-2 py-1">Previous 7 Days</SidebarGroupLabel>
            <SidebarMenu>
              {groupedChats.previousWeek.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-200 text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{chat.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
        
        {groupedChats.earlier.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 px-2 py-1">Earlier</SidebarGroupLabel>
            <SidebarMenu>
              {groupedChats.earlier.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton className="px-2 py-1.5 rounded-md transition-all duration-200 hover:bg-gray-200 text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">{chat.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="p-3 border-t text-xs text-center text-gray-500">
        ChatBot Assistant v1.0
      </SidebarFooter>
    </Sidebar>
    </SidebarProvider>
  );
};

export default ChatSidebar;
