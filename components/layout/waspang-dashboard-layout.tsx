"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { useState, createContext } from 'react';
import Link from 'next/link';
import { LayoutDashboard, FolderIcon, CalendarIcon, Archive, Settings } from 'lucide-react';

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
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMinimized = () => {
    setMinimized(!minimized);
  };

  // Navigation items for mobile bottom bar
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: <FolderIcon size={20} />,
      text: "Projek",
      href: "/dashboard/project"
    },
    {
      icon: <CalendarIcon size={20} />,
      text: "Laporan",
      href: "/dashboard/reports"
    },
    {
      icon: <Archive size={20} />,
      text: "Dokumen",
      href: "/dashboard/documentation"
    },
  ];

  const isPathActive = (itemPath: string) => {
    if (pathname === itemPath) return true;
    if (itemPath !== '/dashboard' && pathname.startsWith(itemPath)) return true;
    return false;
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
          <main className="flex-1 overflow-auto pb-20">
            <div className="mx-auto">
              {children}
            </div>
          </main>
          
          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-20">
            <div className="flex justify-between items-center">
              {navItems.map((item, index) => {
                const isActive = isPathActive(item.href);
                return (
                  <Link 
                    key={index} 
                    href={item.href} 
                    className={`flex flex-1 flex-col items-center py-2 px-1 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div className={`p-1 ${isActive ? 'bg-primary/10 rounded-md' : ''}`}>
                      {item.icon}
                    </div>
                    <span className="text-xs mt-1 truncate">{item.text}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}