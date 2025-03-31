import React from "react";
import ChatInterface from './ChatInterface.tsx'
import ChatSidebar from "./ChatSidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 to-gray-100">
        <ChatSidebar />
        <main className="flex-1 flex flex-col h-screen">
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