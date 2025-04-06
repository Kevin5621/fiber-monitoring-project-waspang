import React from 'react';
import { Clock, FileCheck } from 'lucide-react';

interface MilestoneFooterProps {
  today: Date;
  selectedProject: string;
  projectGroups: Record<string, any[]>;
}

export const MilestoneFooter: React.FC<MilestoneFooterProps> = ({
  today,
  selectedProject,
  projectGroups
}) => {
  // Calculate completion stats
  const milestones = projectGroups[selectedProject] || [];
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(m => 
    m.uploadedDocs >= m.requiredDocs
  ).length;
  
  const completionPercentage = totalMilestones > 0 
    ? Math.round((completedMilestones / totalMilestones) * 100) 
    : 0;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 md:mt-8 pt-4 border-t text-xs">
      <div className="flex items-center mb-2 sm:mb-0 text-muted-foreground">
        <Clock className="h-3.5 w-3.5 mr-1.5" />
        <span>
          Diperbarui: {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, {today.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        
        <div className="flex items-center text-green-500">
          <FileCheck className="h-3.5 w-3.5 mr-1.5" />
          <span>{completedMilestones} / {totalMilestones} ({completionPercentage}%)</span>
        </div>
      </div>
    </div>
  );
};