import React, { useState, useRef, useEffect } from 'react';

interface DesktopTimelineProps {
  projectGroups: Record<string, any[]>;
  selectedProject: string;
  editedMilestones: Record<number, any>;
  getTimelineBoundaries: () => { adjustedMinDate: Date, adjustedMaxDate: Date };
  getCurrentTimePosition: () => string;
  getBarStyle: (milestone: any) => { left: string, width: string };
  parseDate: (dateStr: string) => Date;
}

export const DesktopTimeline: React.FC<DesktopTimelineProps> = ({
  projectGroups,
  selectedProject,
  editedMilestones,
  getTimelineBoundaries,
  getCurrentTimePosition,
  getBarStyle,
  parseDate
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Zoom level state
  const [zoomLevel, setZoomLevel] = useState(1);
  const minZoom = 0.5;
  const maxZoom = 3;
  
  // Add state for zoom dragging
  const [isZoomDragging, setIsZoomDragging] = useState(false);
  const [zoomStartX, setZoomStartX] = useState(0);
  const [initialZoom, setInitialZoom] = useState(1);
  
  const today = new Date();
  const { adjustedMinDate, adjustedMaxDate } = getTimelineBoundaries();
  
  // Calculate total days for timeline, considering zoom level
  const totalDays = Math.ceil((adjustedMaxDate.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate dates for the timeline header
  const generateTimelineDates = () => {
    const dates: Date[] = [];
    const dayIncrement = zoomLevel < 1 ? Math.ceil(1 / zoomLevel) : 1; // Skip days when zoomed out
    
    for (let i = 0; i <= totalDays; i += dayIncrement) {
      const date = new Date(adjustedMinDate);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  
  const timelineDates = generateTimelineDates();
  
  // Mouse/touch event handlers for desktop timeline
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    
    // Handle both mouse and touch events
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    setStartX(clientX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    
    if (!('touches' in e)) {
      document.body.style.cursor = 'grabbing';
    }
  };
  
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!timelineRef.current) return;
    
    // Handle both mouse and touch events
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    // Handle timeline dragging
    if (isDragging) {
      const x = clientX - timelineRef.current.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      timelineRef.current.scrollLeft = scrollLeft - walk;
      e.preventDefault();
    }
    
    // Handle zoom dragging
    if (isZoomDragging) {
      const deltaX = clientX - zoomStartX;
      // Calculate zoom based on drag distance
      const zoomChange = deltaX * 0.005; // Adjust sensitivity as needed
      const newZoomLevel = Math.min(maxZoom, Math.max(minZoom, initialZoom + zoomChange));
      
      // Save the current center position before zooming
      const centerPositionPercent = timelineRef.current ? 
        (timelineRef.current.scrollLeft + timelineRef.current.clientWidth / 2) / timelineRef.current.scrollWidth : 0.5;
      
      // Update zoom level
      setZoomLevel(newZoomLevel);
      
      // Store the center position for the useEffect
      timelineRef.current?.setAttribute('data-center-percent', centerPositionPercent.toString());
      e.preventDefault();
    }
  };
  
  const handleZoomDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsZoomDragging(true);
    
    // Handle both mouse and touch events
    const clientX = 'touches' in e 
      ? e.touches[0].clientX 
      : e.clientX;
    
    setZoomStartX(clientX);
    setInitialZoom(zoomLevel);
    
    if (!('touches' in e)) {
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }
    
    e.stopPropagation();
    if ('preventDefault' in e) e.preventDefault();
  };
  
  const handleEnd = () => {
    setIsDragging(false);
    setIsZoomDragging(false);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = '';
  };
  
  // Scroll to current date when component mounts or project changes
  useEffect(() => {
    if (timelineRef.current) {
      // Calculate position of today in the timeline
      const todayPosition = (((today.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24)) / totalDays);
      const scrollPosition = todayPosition * timelineRef.current.scrollWidth - (timelineRef.current.clientWidth / 2);
      
      // Smooth scroll to position
      timelineRef.current.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  }, [selectedProject, zoomLevel, adjustedMinDate, totalDays]);
  
  // Maintain center position when zooming
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const centerPercentStr = timelineRef.current.getAttribute('data-center-percent');
    if (centerPercentStr) {
      const centerPercent = parseFloat(centerPercentStr);
      
      setTimeout(() => {
        if (timelineRef.current) {
          const newScrollLeft = centerPercent * timelineRef.current.scrollWidth - timelineRef.current.clientWidth / 2;
          timelineRef.current.scrollLeft = newScrollLeft;
        }
      }, 0);
    }
  }, [zoomLevel]);
  
  // Clean up event listeners
  useEffect(() => {
    const handleEndGlobal = () => {
      setIsDragging(false);
      setIsZoomDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mouseup', handleEndGlobal);
    document.addEventListener('touchend', handleEndGlobal);
    
    return () => {
      document.removeEventListener('mouseup', handleEndGlobal);
      document.removeEventListener('touchend', handleEndGlobal);
    };
  }, []);
  
  return (
    <div 
      ref={timelineRef}
      className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleEnd}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="min-width-content" style={{ minWidth: '800px' }}>
        {/* Timeline header with dates */}
        <div 
          className="flex border-b mb-6 pb-3 relative cursor-ew-resize select-none hover:bg-muted/10 transition-colors"
          onMouseDown={handleZoomDragStart}
          onTouchStart={handleZoomDragStart}
          title="Geser horizontal untuk zoom in/out"
        >
          <div className="w-48 flex-shrink-0"></div>
          <div className="flex-grow relative">
            <div className="flex">
              {timelineDates.map((date, i) => (
                <div 
                  key={i} 
                  className={`text-xs py-1 text-center flex-1 ${
                    date.toDateString() === today.toDateString() 
                      ? 'font-bold text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {date.getDate()}
                </div>
              ))}
            </div>
            <div className="flex">
              {timelineDates.map((date, i) => (
                <div 
                  key={i}
                  className={`text-xs text-center flex-1 ${
                    date.toDateString() === today.toDateString() 
                      ? 'font-bold text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {date.toLocaleDateString('id-ID', { month: 'short' })}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Timeline content for selected project */}
        <div className="relative">
          {/* Vertical date lines */}
          <div className="absolute top-0 bottom-0 left-48 right-0 flex">
            {timelineDates.map((date, i) => (
              <div key={i} className="flex-1 border-l border-muted/30"></div>
            ))}
          </div>
          
          {/* Current time vertical line */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-primary z-20"
            style={{ left: `calc(${getCurrentTimePosition()} + 48px)` }}
          ></div>
          
          {projectGroups[selectedProject]?.map((milestone) => {
            const currentMilestone = editedMilestones[milestone.id] || milestone;
            const barStyle = getBarStyle(currentMilestone);
            
            return (
              <div key={milestone.id} className="flex items-center mb-5 last:mb-0 group relative z-10">
                <div className="w-48 flex-shrink-0 pr-4">
                  <div className="text-sm font-medium">{currentMilestone.name}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 flex items-center">
                    <span className="mr-2">{currentMilestone.icon}</span>
                    <span>{currentMilestone.startDate} - {currentMilestone.deadline}</span>
                  </div>
                </div>
                
                <div className="flex-grow relative h-10">
                  <div 
                    className="absolute h-7 rounded-md border border-primary/30 bg-primary bg-opacity-15 transition-all duration-200 group-hover:h-8 group-hover:shadow-md"
                    style={barStyle}
                  >
                    <div className="flex items-center justify-between h-full px-3">
                      <span className="text-xs font-medium truncate max-w-full">{currentMilestone.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};