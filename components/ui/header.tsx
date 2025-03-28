"use client"

import React from 'react';
import { Menu, X, Bell, User } from 'lucide-react';
import { ThemeSwitcher } from "../theme-switcher";
import { useState } from "react";
import { signOutAction } from "@/app/actions";
import { Button } from "./button";

export default function Header({ 
  toggleSidebar,
  sidebarOpen 
}: {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}) {
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-card/70 backdrop-blur-lg shadow-sm border-b border-border sticky top-0 z-40">
      <div className="flex h-14 md:h-16 items-center justify-between px-3 md:px-6">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="md:hidden mr-2 p-1.5 rounded-md hover:bg-accent/10">
            {sidebarOpen ? (
              <X size={20} className="text-muted-foreground" />
            ) : (
              <Menu size={20} className="text-muted-foreground" />
            )}
          </button>
          <h1 className="text-lg md:text-2xl font-semibold text-foreground truncate">Fiber Optic Management</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitcher />
          <button className="p-1.5 md:p-2 hover:bg-accent/10 rounded-full">
            <Bell size={18} className="md:w-5 md:h-5" />
          </button>
          <div className="relative">
            <button 
              className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-muted flex items-center justify-center"
              onClick={toggleDropdown}
            >
              <User size={16} className="md:w-5 md:h-5" />
            </button>
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-1 z-40 border border-border"
              >
                <form action={signOutAction}>
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    className="flex w-full items-center px-4 py-2 text-sm hover:bg-accent"
                  >
                    <User size={16} className="mr-2" />
                    Sign out
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}