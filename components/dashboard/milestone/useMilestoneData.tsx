import { useState } from 'react';

export const useMilestoneData = (projectGroups: Record<string, any[]>, selectedProject: string) => {
  const today = new Date();
  
  // State to store edited milestones (read-only now)
  const [editedMilestones, setEditedMilestones] = useState<Record<number, any>>({});
  
  // State for expanded milestones in mobile view
  const [expandedMilestones, setExpandedMilestones] = useState<Record<number, boolean>>({});
  
  // Toggle milestone expansion in mobile view
  const toggleMilestoneExpansion = (id: number) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Helper function to parse date from string
  const parseDate = (dateStr: string) => {
    const parts = dateStr.split(' ');
    const months: Record<string, string> = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'Mei': '05', 'Jun': '06',
      'Jul': '07', 'Agu': '08', 'Sep': '09', 'Okt': '10', 'Nov': '11', 'Des': '12'
    };
    
    return new Date(`${parts[2]}-${months[parts[1]] || parts[1]}-${parts[0]}`);
  };
  
  // Format dates for different views
  const formatDate = (dateStr: string, isMobileView: boolean) => {
    if (isMobileView) {
      const parts = dateStr.split(' ');
      return `${parts[0]} ${parts[1]}`;
    }
    return dateStr;
  };
  
  // Get timeline boundaries
  const getTimelineBoundaries = () => {
    const selectedMilestones = selectedProject ? projectGroups[selectedProject] : [];
    const projectDates = selectedMilestones.flatMap(m => {
      const milestone = editedMilestones[m.id] || m;
      const startDate = parseDate(milestone.startDate);
      const endDate = parseDate(milestone.deadline);
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
    const zoomLevel = 1; // Default zoom level
    const bufferDays = Math.ceil(4 / zoomLevel); // Adjust buffer based on zoom
    const adjustedMinDate = new Date(minDate);
    const adjustedMaxDate = new Date(maxDate);
    adjustedMinDate.setDate(adjustedMinDate.getDate() - bufferDays);
    adjustedMaxDate.setDate(adjustedMaxDate.getDate() + bufferDays);
    
    return { adjustedMinDate, adjustedMaxDate };
  };
  
  // Calculate current time position on the timeline
  const getCurrentTimePosition = () => {
    const { adjustedMinDate, adjustedMaxDate } = getTimelineBoundaries();
    const totalDays = Math.ceil((adjustedMaxDate.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24));
    const now = new Date();
    const daysElapsed = (now.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24);
    return `${(daysElapsed / totalDays) * 100}%`;
  };
  
  // Function to calculate bar position and width
  const getBarStyle = (milestone: any) => {
    const { adjustedMinDate, adjustedMaxDate } = getTimelineBoundaries();
    const totalDays = Math.ceil((adjustedMaxDate.getTime() - adjustedMinDate.getTime()) / (1000 * 60 * 60 * 24));
    
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
  
  // Calculate progress percentage for a milestone
  const getMilestoneProgress = (milestone: any) => {
    const currentMilestone = editedMilestones[milestone.id] || milestone;
    
    const startDate = parseDate(currentMilestone.startDate);
    const endDate = parseDate(currentMilestone.deadline);
    const now = new Date();
    
    // If not started yet
    if (now < startDate) return 0;
    // If completed
    if (now > endDate) return 100;
    
    // In progress
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = now.getTime() - startDate.getTime();
    
    return Math.round((elapsedDuration / totalDuration) * 100);
  };
  
  // Check if milestone is in progress, completed, or not started
  const getMilestoneStatus = (milestone: any) => {
    const currentMilestone = editedMilestones[milestone.id] || milestone;
    
    const startDate = parseDate(currentMilestone.startDate);
    const endDate = parseDate(currentMilestone.deadline);
    const now = new Date();
    
    if (now < startDate) return "not-started";
    if (now > endDate) return "completed";
    return "in-progress";
  };
  
  // Sort milestones by start date
  const sortedMilestones = [...(projectGroups[selectedProject] || [])].sort((a, b) => {
    return parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime();
  });
  
  return {
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
  };
};