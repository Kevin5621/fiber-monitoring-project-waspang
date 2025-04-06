import React, { useState, useEffect } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface ScrollableTabsListProps {
  tabsListRef: React.RefObject<HTMLDivElement>;
  isTabsScrollable: boolean;
  projectNames: string[];
  currentValue?: string;
  onValueChange?: (value: string) => void;
}

export const ScrollableTabsList: React.FC<ScrollableTabsListProps> = ({
  tabsListRef,
  isTabsScrollable,
  projectNames,
  currentValue,
  onValueChange
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  // Check if scroll arrows should be visible
  useEffect(() => {
    const tabsEl = tabsListRef.current;
    
    if (!tabsEl) return;
    
    const checkScrollPosition = () => {
      const { scrollLeft, scrollWidth, clientWidth } = tabsEl;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };
    
    // Check initial scroll position
    checkScrollPosition();
    
    // Add scroll event listener
    tabsEl.addEventListener('scroll', checkScrollPosition);
    
    // Add resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(checkScrollPosition);
    resizeObserver.observe(tabsEl);
    
    return () => {
      tabsEl.removeEventListener('scroll', checkScrollPosition);
      resizeObserver.disconnect();
    };
  }, [tabsListRef]);

  // Tab navigation functions
  const scrollTabsLeft = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };
  
  const scrollTabsRight = () => {
    if (tabsListRef.current) {
      tabsListRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  // Handle tab activation
  const handleTabClick = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className="relative flex flex-col w-full mb-6">
      <div className="relative flex w-full">
        {/* Left scroll button */}
        {isTabsScrollable && showLeftArrow && (
          <button 
            onClick={scrollTabsLeft}
            className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 bg-gradient-to-r from-background via-background/90 to-transparent transition-opacity hover:opacity-90"
            aria-label="Scroll tabs left"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </button>
        )}
        
        {/* Chrome-style TabsList */}
        <div className="w-full overflow-hidden bg-card rounded-t-lg">
          <TabsList 
            ref={tabsListRef} 
            className="flex flex-nowrap overflow-x-auto scrollbar-hide pt-2 px-1 w-full bg-card min-h-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projectNames.map((project, index) => {
              const isActive = currentValue === project;
              return (
                <TabsTrigger 
                  key={project} 
                  value={project}
                  onClick={() => handleTabClick(project)}
                  className={`
                    group relative rounded-t-lg text-sm font-medium whitespace-nowrap flex-shrink-0 
                    border-t border-l border-r border-border/40
                    transition-all mx-0 px-4 py-2 h-10
                    ${isActive 
                      ? 'bg-primary/5 text-primary border-t-2 border-t-primary z-10' 
                      : 'bg-muted/30 hover:bg-muted/50'
                    }
                  `}
                  data-value={project}
                >
                  <div className="flex items-center gap-2">
                    {project}
                    {isActive && (
                      <div className="flex items-center justify-center ml-1 h-5 w-5 rounded-full bg-primary/10 hover:bg-primary/20">
                        <X className="h-3 w-3 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  {/* Chrome-style sloped edges effect */}
                  {!isActive && index > 0 && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-card -translate-x-1"></div>
                  )}
                  
                  {/* Active tab highlight effect */}
                  {isActive && (
                    <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary"></div>
                  )}
                </TabsTrigger>
              );
            })}
            {/* Empty space tab to fill remainder */}
            <div className="flex-grow border-b border-border/40 h-10"></div>
          </TabsList>
        </div>
        
        {/* Right scroll button */}
        {isTabsScrollable && showRightArrow && (
          <button 
            onClick={scrollTabsRight}
            className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-10 bg-gradient-to-l from-background via-background/90 to-transparent transition-opacity hover:opacity-90"
            aria-label="Scroll tabs right"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </div>
          </button>
        )}
      </div>
      
      {/* Content area border to complete the Chrome-style tab look */}
      <div className="w-full h-1 bg-border/40"></div>
    </div>
  );
};