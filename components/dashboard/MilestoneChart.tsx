import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MilestoneProps {
  id: number;
  name: string;
  project: string;
  deadline: string;
  startDate: string;
  icon: React.ReactNode;
}

interface MilestoneChartProps {
  milestones: MilestoneProps[];
  onMilestoneUpdate?: (milestone: MilestoneProps) => void;
}

export const MilestoneChart = ({ milestones, onMilestoneUpdate }: MilestoneChartProps) => {
  // Group milestones by project
  const projectGroups: Record<string, MilestoneProps[]> = {};
  milestones.forEach(milestone => {
    if (!projectGroups[milestone.project]) {
      projectGroups[milestone.project] = [];
    }
    projectGroups[milestone.project].push(milestone);
  });

  // Get project names for tabs
  const projectNames = Object.keys(projectGroups);
  
  // Set first project as default selected tab
  const [selectedProject, setSelectedProject] = useState(projectNames[0] || '');
  
  // Get milestones for the selected project
  const selectedMilestones = selectedProject ? projectGroups[selectedProject] : [];
  
  // Parse dates to create timeline
  const today = new Date();
  
  // Refs for timeline scrolling
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
  
  // State to store edited milestones (read-only now)
  const [editedMilestones, setEditedMilestones] = useState<Record<number, MilestoneProps>>({});
  
  // Get earliest start date and latest end date for timeline boundaries
  const projectDates = selectedMilestones.flatMap(m => {
    // Get the possibly edited milestone
    const milestone = editedMilestones[m.id] || m;
    
    // Properly parse dates in DD MMM YYYY format to ensure correct timeline
    const startParts = milestone.startDate.split(' ');
    const deadlineParts = milestone.deadline.split(' ');
    
    // Convert Indonesian month abbreviations if needed
    const getMonthNumber = (monthAbbr: string) => {
      const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'Mei': '05', 'Jun': '06',
        'Jul': '07', 'Agu': '08', 'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12'
      };
      return months[monthAbbr as keyof typeof months] || monthAbbr;
    };
    
    // Format: YYYY-MM-DD
    const startDate = new Date(`${startParts[2]}-${getMonthNumber(startParts[1])}-${startParts[0]}`);
    const endDate = new Date(`${deadlineParts[2]}-${getMonthNumber(deadlineParts[1])}-${deadlineParts[0]}`);
    
    return [startDate, endDate];
  });
  
  // Use fallback dates if no milestones are available
  const minDate = projectDates.length > 0 
    ? new Date(Math.min(...projectDates.map(d => d.getTime())))
    : new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago as fallback
  const maxDate = projectDates.length > 0 
    ? new Date(Math.max(...projectDates.map(d => d.getTime())))
    : new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in future as fallback
  
  // Add buffer days to the timeline
  const bufferDays = Math.ceil(4 / zoomLevel); // Adjust buffer based on zoom
  const adjustedMinDate = new Date(minDate);
  const adjustedMaxDate = new Date(maxDate);
  adjustedMinDate.setDate(adjustedMinDate.getDate() - bufferDays);
  adjustedMaxDate.setDate(adjustedMaxDate.getDate() + bufferDays);
  
  // Calculate total days for timeline, considering zoom level
  const totalDays = Math.ceil((adjustedMaxDate.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate dates for the timeline header
  const timelineDates: Date[] = [];
  const dayIncrement = zoomLevel < 1 ? Math.ceil(1 / zoomLevel) : 1; // Skip days when zoomed out
  for (let i = 0; i <= totalDays; i += dayIncrement) {
    const date = new Date(adjustedMinDate);
    date.setDate(date.getDate() + i);
    timelineDates.push(date);
  }
  
  // Function to parse date from string
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const getMonthNumber = (monthAbbr: string) => {
      const months = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'Mei': '05', 'Jun': '06',
        'Jul': '07', 'Agu': '08', 'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12'
      };
      return months[monthAbbr as keyof typeof months] || monthAbbr;
    };
    
    return new Date(`${parts[2]}-${getMonthNumber(parts[1])}-${parts[0]}`);
  };
  
  // Function to calculate bar position and width
  const getBarStyle = (milestone: MilestoneProps) => {
    // Use edited milestone if available
    const currentMilestone = editedMilestones[milestone.id] || milestone;
    
    // Parse dates
    const startDate = parseDate(currentMilestone.startDate);
    const endDate = parseDate(currentMilestone.deadline);
    
    const startOffset = Math.max(0, (startDate.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const startPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    
    return {
      left: `${startPercent}%`,
      width: `${widthPercent}%`,
    };
  };
  
  // Calculate current time position on the timeline
  const getCurrentTimePosition = () => {
    const now = new Date();
    const daysElapsed = (now.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24);
    const position = (daysElapsed / totalDays) * 100;
    
    return `${position}%`;
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
  }, [selectedProject, zoomLevel]);
  
  // Mouse event handlers for draggable timeline
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
    
    // Change cursor style
    document.body.style.cursor = 'grabbing';
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    // Handle timeline dragging
    if (isDragging) {
      const x = e.pageX - timelineRef.current.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      timelineRef.current.scrollLeft = scrollLeft - walk;
    }
    
    // Handle zoom dragging
    if (isZoomDragging) {
      const deltaX = e.pageX - zoomStartX;
      // Calculate zoom based on drag distance
      // Moving right increases zoom, moving left decreases zoom
      const zoomChange = deltaX * 0.005; // Adjust sensitivity as needed
      const newZoomLevel = Math.min(maxZoom, Math.max(minZoom, initialZoom + zoomChange));
      
      // Save the current center position before zooming
      const centerPositionPercent = timelineRef.current ? 
        (timelineRef.current.scrollLeft + timelineRef.current.clientWidth / 2) / timelineRef.current.scrollWidth : 0.5;
      
      // Update zoom level
      setZoomLevel(newZoomLevel);
      
      // Store the center position for the useEffect
      timelineRef.current?.setAttribute('data-center-percent', centerPositionPercent.toString());
    }
  };
  
  // New handlers for zoom dragging on timeline header
  const handleZoomDragStart = (e: React.MouseEvent) => {
    setIsZoomDragging(true);
    setZoomStartX(e.pageX);
    setInitialZoom(zoomLevel);
    document.body.style.cursor = 'ew-resize';
    // Prevent text selection during zoom dragging
    document.body.style.userSelect = 'none';
    // Prevent regular timeline dragging
    e.stopPropagation();
    e.preventDefault();
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsZoomDragging(false);
    document.body.style.cursor = 'default';
    // Re-enable text selection when done dragging
    document.body.style.userSelect = '';
  };
  
  // Maintain center position when zooming
  useEffect(() => {
    if (!timelineRef.current) return;
    
    // Get the stored center position
    const centerPercentStr = timelineRef.current.getAttribute('data-center-percent');
    if (centerPercentStr) {
      const centerPercent = parseFloat(centerPercentStr);
      
      // Need to wait for DOM update after zoom level change
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
    const handleMouseUpGlobal = () => {
      setIsDragging(false);
      setIsZoomDragging(false);
      document.body.style.cursor = 'default';
      // Re-enable text selection when mouse up happens anywhere
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mouseup', handleMouseUpGlobal);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);
  
  return (
    <div className="w-full rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Timeline Proyek</h3>
        </div>
      </div>
      
      {/* Project Tabs */}
      <Tabs defaultValue={selectedProject} onValueChange={setSelectedProject} className="mb-6">
        <TabsList className="mb-4">
          {projectNames.map(project => (
            <TabsTrigger key={project} value={project} className="text-sm">
              {project}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {projectNames.map(project => (
          <TabsContent key={project} value={project} className="mt-0">
            {/* Interactive Timeline Container - removed wheel event for zooming */}
            <div 
              ref={timelineRef}
              className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', /* Firefox */
                msOverflowStyle: 'none',  /* IE and Edge */
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
            >
              <div className="min-width-content" style={{ minWidth: '800px' }}>
                {/* Timeline header with dates - added zoom drag functionality */}
                <div 
                  className="flex border-b mb-6 pb-3 relative cursor-ew-resize select-none hover:bg-muted/10 transition-colors"
                  onMouseDown={handleZoomDragStart}
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
                  {/* Vertical date lines for each date - cuts through all content */}
                  <div className="absolute top-0 bottom-0 left-48 right-0 flex">
                    {timelineDates.map((date, i) => (
                      <div 
                        key={i} 
                        className="flex-1 border-l border-muted/30"
                      ></div>
                    ))}
                  </div>
                  
                  {/* Current time vertical line */}
                  <div 
                    className="absolute top-0 bottom-0 w-px bg-primary z-20"
                    style={{ 
                      left: `calc(${getCurrentTimePosition()} + 48px)`, // Add offset for label column
                    }}
                  ></div>
                  
                  {projectGroups[project].map((milestone) => {
                    // Get the possibly edited milestone
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
                          {/* Static milestone bar (no interaction) */}
                          <div 
                            className="absolute h-7 rounded-md border border-primary/30 bg-primary bg-opacity-15 transition-all duration-200 group-hover:h-8 group-hover:shadow-md"
                            style={barStyle}
                          >
                            <div className="flex items-center justify-between h-full px-3">
                              <span className="text-xs font-medium truncate max-w-[150px]">{currentMilestone.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-between items-center mt-8 pt-4 border-t text-xs text-muted-foreground">
        <span>Diperbarui terakhir: {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, {today.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}</span>
        <div className="flex items-center">
          <span>Total milestone: {projectGroups[selectedProject]?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};