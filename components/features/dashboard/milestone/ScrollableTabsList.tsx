import React, { useState, useEffect } from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

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
        
        {/* Scrollable TabsList with improved styling */}
        <div className="w-full overflow-hidden rounded-lg border border-border/40 shadow-sm">
          <TabsList 
            ref={tabsListRef} 
            className="flex flex-nowrap overflow-x-auto scrollbar-hide py-1 px-2 w-full bg-card"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projectNames.map(project => (
              <TabsTrigger 
                key={project} 
                value={project}
                onClick={() => handleTabClick(project)}
                className="text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all px-4 py-2 mx-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                data-value={project}
              >
                <div className="flex items-center gap-2">
                  {currentValue === project && (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  {project}
                </div>
              </TabsTrigger>
            ))}
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
      
      {/* Optional indicator line showing active tab */}
      <div className="hidden sm:block h-0.5 w-full mt-1 bg-muted overflow-hidden">
        {projectNames.map((project, index) => (
          <div 
            key={`indicator-${project}`}
            className={`h-full transition-all duration-300 ${
              currentValue === project ? 'bg-primary' : 'bg-transparent'
            }`}
            style={{
              width: `${100 / projectNames.length}%`,  
              transform: `translateX(${projectNames.indexOf(currentValue || '') * 100}%)`,
              position: 'relative'
            }}
          />
        ))}
      </div>
    </div>
  );
};