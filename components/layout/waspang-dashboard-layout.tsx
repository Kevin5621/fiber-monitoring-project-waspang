"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import { useState, createContext } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search
} from 'lucide-react';
import { ThemeSwitcher } from "../theme-switcher";
import { signOutAction } from "@/app/actions";
import { Button } from "../ui/button";

// Create context for sidebar state
export const WasPangSidebarContext = createContext({
  sidebarOpen: true,
  toggleSidebar: () => {},
});

interface WasPangDashboardLayoutProps {
  children: React.ReactNode;
}

export default function WasPangDashboardLayout({ children }: WasPangDashboardLayoutProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // If we're on the login page, just render the children without the layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <WasPangSidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
        >
          <div className="flex h-full flex-col bg-white shadow-lg">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">WP</span>
                </div>
                <h2 className="text-xl font-medium text-gray-900">WasPang</h2>
              </div>
              <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            {/* Sidebar Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/waspang"
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeItem === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveItem('dashboard')}
                  >
                    <LayoutDashboard size={18} className="mr-3" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeItem === 'projects' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveItem('projects')}
                  >
                    <FileText size={18} className="mr-3" />
                    Proyek
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeItem === 'reports' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveItem('reports')}
                  >
                    <Calendar size={18} className="mr-3" />
                    Laporan Harian
                  </a>
                </li>
                <li>
                  <a 
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeItem === 'team' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setActiveItem('team')}
                  >
                    <Users size={18} className="mr-3" />
                    Tim Lapangan
                  </a>
                </li>
              </ul>
              
              <div className="mt-8">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pengaturan</h3>
                <ul className="mt-2 space-y-2">
                  <li>
                    <a 
                      href="#"
                      className={`flex items-center px-4 py-3 text-sm rounded-lg ${activeItem === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setActiveItem('settings')}
                    >
                      <Settings size={18} className="mr-3" />
                      Pengaturan
                    </a>
                  </li>
                  <li>
                    <form action={signOutAction}>
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        className="w-full flex items-center px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100 justify-start"
                      >
                        <LogOut size={18} className="mr-3" />
                        Keluar
                      </Button>
                    </form>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className="md:hidden mr-4 text-gray-500 hover:text-gray-700">
                  {sidebarOpen ? (
                    <X size={24} />
                  ) : (
                    <Menu size={24} />
                  )}
                </button>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Cari proyek atau dokumen..." 
                    className="py-2 pl-10 pr-4 block w-64 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                  <Bell size={20} className="text-gray-500" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="relative">
                  <button 
                    className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium"
                    onClick={toggleDropdown}
                  >
                    WP
                  </button>
                  {isDropdownOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40 border border-gray-200"
                    >
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Profil Saya
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Pengaturan
                      </a>
                      <form action={signOutAction}>
                        <Button 
                          type="submit" 
                          variant="ghost" 
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 justify-start"
                        >
                          Keluar
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </WasPangSidebarContext.Provider>
  );
}