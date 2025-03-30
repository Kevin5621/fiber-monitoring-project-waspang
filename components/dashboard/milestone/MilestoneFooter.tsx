import React from 'react';

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
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 md:mt-8 pt-2 md:pt-4 border-t text-xs text-muted-foreground">
      <span className="mb-2 sm:mb-0">
        Diperbarui terakhir: {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}, {today.toLocaleTimeString('id-ID', {hour: '2-digit', minute: '2-digit'})}
      </span>
      <div className="flex items-center">
        <span>Total milestone: {projectGroups[selectedProject]?.length || 0}</span>
      </div>
    </div>
  );
};