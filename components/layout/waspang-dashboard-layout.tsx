"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/ui/header';
import Sidebar from '@/components/ui/sidebardashboard';
import { useState, createContext } from 'react';

// Create context for sidebar state
export const SidebarContext = createContext({
  sidebarOpen: true,
  toggleSidebar: () => {},
  minimized: false,
  toggleMinimized: () => {},
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  // If we're on the login page, just render the children without the layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Otherwise, render the full dashboard layout
  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar, minimized, toggleMinimized }}>
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
          minimized={minimized} 
          toggleMinimized={toggleMinimized} 
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navigation */}
          <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}