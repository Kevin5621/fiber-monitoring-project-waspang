import React from 'react';
import { MilestoneProps } from './types';

interface MilestoneChartProps {
  milestones: Array<MilestoneProps['milestone']>;
}

export const MilestoneChart = ({ milestones }: MilestoneChartProps) => {
  // Group milestones by project
  const projectGroups: Record<string, Array<MilestoneProps['milestone']>> = {};
  milestones.forEach(milestone => {
    if (!projectGroups[milestone.project]) {
      projectGroups[milestone.project] = [];
    }
    projectGroups[milestone.project].push(milestone);
  });

  // Parse dates to create timeline
  const today = new Date();
  
  // Get earliest start date and latest end date for timeline boundaries
  const allDates = milestones.flatMap(m => [
    new Date(m.startDate.split(' ').reverse().join('-')), 
    new Date(m.deadline.split(' ').reverse().join('-'))
  ]);
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  // Add buffer days to the timeline
  minDate.setDate(minDate.getDate() - 2);
  maxDate.setDate(maxDate.getDate() + 2);
  
  // Calculate total days for timeline
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate dates for the timeline header
  const timelineDates: Date[] = [];
  for (let i = 0; i <= totalDays; i++) {
    const date = new Date(minDate);
    date.setDate(date.getDate() + i);
    timelineDates.push(date);
  }
  
  // Function to calculate bar position and width
  const getBarStyle = (milestone: MilestoneProps['milestone']) => {
    const startDate = new Date(milestone.startDate.split(' ').reverse().join('-'));
    const endDate = new Date(milestone.deadline.split(' ').reverse().join('-'));
    
    const startOffset = Math.max(0, (startDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const startPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    
    return {
      left: `${startPercent}%`,
      width: `${widthPercent}%`,
    };
  };
  
  // Function to get status color
  const getStatusColor = (status: string, progress: number) => {
    if (status === 'Terlambat') return 'bg-destructive';
    if (status === 'Selesai') return 'bg-green-500';
    if (progress === 0) return 'bg-gray-400';
    return 'bg-blue-500';
  };
  
  return (
    <div className="w-full">
      {/* Timeline header with dates */}
      <div className="flex border-b mb-4 pb-2 relative overflow-x-auto">
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
          
          {/* Today line */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-primary" 
            style={{ 
              left: `${((today.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24) / totalDays) * 100}%`,
              zIndex: 10 
            }}
          ></div>
        </div>
      </div>
      
      {/* Timeline content by project */}
      {Object.entries(projectGroups).map(([project, projectMilestones]) => (
        <div key={project} className="mb-6 last:mb-0">
          <h4 className="font-medium text-sm mb-2 text-muted-foreground">{project}</h4>
          
          {projectMilestones.map((milestone) => (
            <div key={milestone.id} className="flex items-center mb-3 last:mb-0">
              <div className="w-48 flex-shrink-0 pr-4">
                <div className="text-sm font-medium">{milestone.name}</div>
                <div className="text-xs text-muted-foreground">{milestone.progress}% selesai</div>
              </div>
              
              <div className="flex-grow relative h-8">
                {/* Progress bar */}
                <div className="absolute inset-0 flex items-center">
                  <div 
                    className={`h-5 rounded-md ${getStatusColor(milestone.status, milestone.progress)} relative`}
                    style={getBarStyle(milestone)}
                  >
                    <div 
                      className="absolute inset-0 rounded-md overflow-hidden"
                      style={{ width: `${milestone.progress}%` }}
                    >
                      <div className="w-full h-full bg-white bg-opacity-30"></div>
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs text-white font-medium">{milestone.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      
      {/* Legend */}
      <div className="flex justify-end mt-6 text-xs gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
          <span>Aktif</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
          <span>Selesai</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-destructive rounded-sm mr-1"></div>
          <span>Terlambat</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-sm mr-1"></div>
          <span>Belum Dimulai</span>
        </div>
      </div>
    </div>
  );
};