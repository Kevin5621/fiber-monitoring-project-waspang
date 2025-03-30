import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Smartphone, Monitor } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MilestoneHeader } from './MilestoneHeader';
import { MobileTimeline } from './MobileTimeline';
import { DesktopTimeline } from './DesktopTimeline';
import { ScrollableTabsList } from './ScrollableTabsList';
import { useMilestoneData } from './useMilestoneData';
import { MilestoneFooter } from './MilestoneFooter';

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

export const MilestoneChart = ({ milestones }: MilestoneChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Group milestones by project
  const projectGroups = milestones.reduce((groups: Record<string, MilestoneProps[]>, milestone) => {
    if (!groups[milestone.project]) groups[milestone.project] = [];
    groups[milestone.project].push(milestone);
    return groups;
  }, {});

  // Get project names for tabs
  const projectNames = Object.keys(projectGroups);
  
  // Set first project as default selected tab
  const [selectedProject, setSelectedProject] = useState(projectNames[0] || '');
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  
  // New state for forced view mode (desktop or mobile)
  const [forcedViewMode, setForcedViewMode] = useState<'desktop' | 'mobile' | null>(null);
  
  // Tabs scrolling state
  const [isTabsScrollable, setIsTabsScrollable] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Get milestone data from custom hook
  const {
    today,
    editedMilestones,
    expandedMilestones,
    toggleMilestoneExpansion,
    getTimelineBoundaries,
    parseDate,
    formatDate,
    getMilestoneProgress,
    getMilestoneStatus,
    getCurrentTimePosition,
    getBarStyle,
    sortedMilestones
  } = useMilestoneData(projectGroups, selectedProject);
  
  // Determine if we should show mobile view
  const shouldShowMobileView = () => {
    if (forcedViewMode === 'mobile') return true;
    if (forcedViewMode === 'desktop') return false;
    return isMobile;
  };
  
  // Toggle between desktop and mobile view
  const toggleViewMode = () => {
    if (forcedViewMode === 'mobile' || (isMobile && forcedViewMode !== 'desktop')) {
      setForcedViewMode('desktop');
    } else {
      setForcedViewMode('mobile');
    }
  };
  
  // Check if the device is mobile and check tabs scrollability
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };
    
    const checkTabsScrollability = () => {
      if (tabsListRef.current) {
        const tabsList = tabsListRef.current;
        setIsTabsScrollable(tabsList.scrollWidth > tabsList.clientWidth);
      }
    };
    
    // Check initially
    checkIfMobile();
    checkTabsScrollability();
    
    // Listen for window resize
    window.addEventListener('resize', () => {
      checkIfMobile();
      checkTabsScrollability();
    });
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [projectNames.length]);
  
  return (
    <div className="w-full rounded-lg border bg-card shadow-sm p-4 md:p-6" ref={containerRef}>
      <MilestoneHeader 
        isMobile={isMobile} 
        toggleViewMode={toggleViewMode} 
        shouldShowMobileView={shouldShowMobileView} 
      />
      
      {/* Project Tabs with horizontal scrolling */}
      <Tabs defaultValue={selectedProject} onValueChange={setSelectedProject} className="mb-4 md:mb-6">
        <ScrollableTabsList 
          tabsListRef={tabsListRef as React.RefObject<HTMLDivElement>}
          isTabsScrollable={isTabsScrollable}
          projectNames={projectNames}
        />
        
        {projectNames.map(project => (
          <TabsContent key={project} value={project} className="mt-0">
            {shouldShowMobileView() ? (
              <MobileTimeline 
                milestones={sortedMilestones}
                editedMilestones={editedMilestones}
                expandedMilestones={expandedMilestones}
                toggleMilestoneExpansion={toggleMilestoneExpansion}
                getMilestoneProgress={getMilestoneProgress}
                getMilestoneStatus={getMilestoneStatus}
                formatDate={formatDate}
              />
            ) : (
              <DesktopTimeline 
                projectGroups={projectGroups}
                selectedProject={selectedProject}
                editedMilestones={editedMilestones}
                getTimelineBoundaries={getTimelineBoundaries}
                getCurrentTimePosition={getCurrentTimePosition}
                getBarStyle={getBarStyle}
                parseDate={parseDate}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <MilestoneFooter 
        today={today}
        selectedProject={selectedProject}
        projectGroups={projectGroups}
      />
    </div>
  );
};