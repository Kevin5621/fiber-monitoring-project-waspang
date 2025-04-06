import React, { useState, useRef, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TimelineCard } from './Timeline';
import { ScrollableTabsList } from './ScrollableTabsList';
import { useMilestoneData } from './useMilestoneData';
import { MilestoneFooter } from './MilestoneFooter';
import { MilestoneProps } from '../types';

interface MilestoneChartProps {
  milestones: MilestoneProps['milestone'][];
  onMilestoneUpdate?: (milestone: MilestoneProps['milestone']) => void;
}

export const MilestoneChart = ({ milestones }: MilestoneChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Group milestones by project
  const projectGroups = milestones.reduce((groups: Record<string, MilestoneProps['milestone'][]>, milestone) => {
    if (!groups[milestone.project]) groups[milestone.project] = [];
    groups[milestone.project].push(milestone);
    return groups;
  }, {});

  // Get project names for tabs
  const projectNames = Object.keys(projectGroups);
  
  // Set first project as default selected tab
  const [selectedProject, setSelectedProject] = useState(projectNames[0] || '');
  
  // Tabs scrolling state
  const [isTabsScrollable, setIsTabsScrollable] = useState(false);
  const tabsListRef = useRef<HTMLDivElement>(null);
  
  // Get milestone data from custom hook
  const {
    today,
    editedMilestones,
    expandedMilestones,
    toggleMilestoneExpansion,
    parseDate,
    formatDate,
    getMilestoneProgress,
    getMilestoneStatus,
    sortedMilestones
  } = useMilestoneData(projectGroups, selectedProject);
  
  // Check tabs scrollability
  useEffect(() => {
    const checkTabsScrollability = () => {
      if (tabsListRef.current) {
        const tabsList = tabsListRef.current;
        setIsTabsScrollable(tabsList.scrollWidth > tabsList.clientWidth);
      }
    };
    
    // Check initially
    checkTabsScrollability();
    
    // Listen for window resize
    window.addEventListener('resize', checkTabsScrollability);
    
    // Clean up
    return () => window.removeEventListener('resize', checkTabsScrollability);
  }, [projectNames.length]);
  
  return (
    <div className="w-full rounded-lg border bg-card shadow-sm overflow-hidden" ref={containerRef}>
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 md:p-6 border-b">
        <div className="flex items-center">
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
            <CalendarDays className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Timeline Proyek</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {projectGroups[selectedProject]?.length || 0} milestone tersedia
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        {/* Project Tabs with horizontal scrolling */}
        <Tabs defaultValue={selectedProject} onValueChange={setSelectedProject} className="mb-4 md:mb-6">
          <ScrollableTabsList 
            tabsListRef={tabsListRef as React.RefObject<HTMLDivElement>}
            isTabsScrollable={isTabsScrollable}
            projectNames={projectNames}
          />
          
          {projectNames.map(project => (
            <TabsContent key={project} value={project} className="mt-0">
              {sortedMilestones.length > 0 ? (
                <TimelineCard 
                  milestones={sortedMilestones}
                  editedMilestones={editedMilestones}
                  expandedMilestones={expandedMilestones}
                  toggleMilestoneExpansion={toggleMilestoneExpansion}
                  getMilestoneProgress={getMilestoneProgress}
                  getMilestoneStatus={getMilestoneStatus}
                  formatDate={formatDate}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <CalendarDays className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h4 className="text-sm font-medium mb-1">Tidak ada milestone</h4>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Tidak ada milestone yang tersedia untuk proyek ini.
                  </p>
                </div>
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
    </div>
  );
};