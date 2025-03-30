import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MobileTimelineProps {
  milestones: any[];
  editedMilestones: Record<number, any>;
  expandedMilestones: Record<number, boolean>;
  toggleMilestoneExpansion: (id: number) => void;
  getMilestoneProgress: (milestone: any) => number;
  getMilestoneStatus: (milestone: any) => string;
  formatDate: (dateStr: string, isMobileView: boolean) => string;
}

export const MobileTimeline: React.FC<MobileTimelineProps> = ({
  milestones,
  editedMilestones,
  expandedMilestones,
  toggleMilestoneExpansion,
  getMilestoneProgress,
  getMilestoneStatus,
  formatDate
}) => {
  return (
    <div className="space-y-4">
      {milestones.map((milestone) => {
        const currentMilestone = editedMilestones[milestone.id] || milestone;
        const progress = getMilestoneProgress(currentMilestone);
        const status = getMilestoneStatus(currentMilestone);
        const isExpanded = expandedMilestones[milestone.id] || false;
        
        return (
          <div 
            key={milestone.id} 
            className="border rounded-lg overflow-hidden bg-card shadow-sm"
          >
            {/* Milestone Header */}
            <div 
              className="p-3 flex justify-between items-center cursor-pointer"
              onClick={() => toggleMilestoneExpansion(milestone.id)}
            >
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full mr-2 ${
                  status === 'completed' ? 'bg-green-500' : 
                  status === 'in-progress' ? 'bg-amber-500' : 
                  'bg-gray-400'
                }`}></div>
                <span className="font-medium text-sm">{currentMilestone.name}</span>
              </div>
              <div className="flex items-center">
                {isExpanded ? 
                  <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                }
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 dark:bg-gray-700">
              <div 
                className={`h-full ${
                  status === 'completed' ? 'bg-green-500' : 
                  status === 'in-progress' ? 'bg-amber-500' : 
                  'bg-gray-400'
                }`} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Milestone Details (expanded) */}
            {isExpanded && (
              <div className="p-3 border-t bg-muted/10">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Tanggal Mulai</div>
                    <div className="font-medium flex items-center">
                      {currentMilestone.icon}
                      <span className="ml-1">{formatDate(currentMilestone.startDate, true)}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Tanggal Selesai</div>
                    <div className="font-medium">
                      {formatDate(currentMilestone.deadline, true)}
                    </div>
                  </div>
                  <div className="col-span-2 mt-2">
                    <div className="text-muted-foreground mb-1">Status</div>
                    <div className="font-medium">
                      {status === 'completed' ? 'Selesai' : 
                      status === 'in-progress' ? 'Sedang Berjalan' : 
                      'Belum Dimulai'}
                      {status === 'in-progress' && ` (${progress}%)`}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};