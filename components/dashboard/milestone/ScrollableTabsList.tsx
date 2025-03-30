import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScrollableTabsListProps {
  tabsListRef: React.RefObject<HTMLDivElement>;
  isTabsScrollable: boolean;
  projectNames: string[];
}

export const ScrollableTabsList: React.FC<ScrollableTabsListProps> = ({
  tabsListRef,
  isTabsScrollable,
  projectNames
}) => {
  // Tab navigation functions
  const scrollTabsLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollTabsRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex mb-2 md:mb-4">
      {/* Left scroll button */}
      {isTabsScrollable && (
        <button 
          onClick={scrollTabsLeft}
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-r from-background to-transparent"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      
      {/* Scrollable TabsList */}
      <TabsList 
        ref={tabsListRef} 
        className="flex flex-nowrap overflow-x-auto scrollbar-hide px-8 mx-auto w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projectNames.map(project => (
          <TabsTrigger 
            key={project} 
            value={project} 
            className="text-xs md:text-sm whitespace-nowrap flex-shrink-0"
            data-value={project}
          >
            {project}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {/* Right scroll button */}
      {isTabsScrollable && (
        <button 
          onClick={scrollTabsRight}
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-8 bg-gradient-to-l from-background to-transparent"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  );
};