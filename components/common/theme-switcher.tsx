"use client";

import { Button } from "@/components/common/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/common/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === "dark";
  const ICON_SIZE = 18;

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors duration-200"
            aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              {/* Sun icon with animation */}
              <Sun
                size={ICON_SIZE}
                className={`absolute transition-all duration-300 ease-in-out ${
                  isDarkTheme
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                } text-amber-500`}
              />
              
              {/* Moon icon with animation */}
              <Moon
                size={ICON_SIZE}
                className={`absolute transition-all duration-300 ease-in-out ${
                  isDarkTheme
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-0"
                } text-indigo-400`}
              />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {isDarkTheme ? "light" : "dark"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { ThemeSwitcher };