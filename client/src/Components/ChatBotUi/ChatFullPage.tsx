import React from "react";
import ChatInterface from "../ChatbotUi/ChatInterface.tsx";
import ChatSidebar from "./ChatSidebar.tsx";
import { SidebarProvider } from "../UI/Sidebar.tsx";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="h-screen flex w-full bg-white">
        <ChatSidebar />
        <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 shadow-md md:hidden">
            <h1 className="text-white font-bold text-xl">ChatBot Assistant</h1>
          </div>
          <ChatInterface />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;