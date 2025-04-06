import React from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, FileCheck } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface MobileTimelineProps {
  milestones: any[];
  editedMilestones: Record<number, any>;
  expandedMilestones: Record<number, boolean>;
  toggleMilestoneExpansion: (id: number) => void;
  getMilestoneProgress: (milestone: any) => number;
  getMilestoneStatus: (milestone: any) => string;
  formatDate: (dateStr: string, isMobileView: boolean) => string;
}

export const TimelineCard: React.FC<MobileTimelineProps> = ({
  milestones,
  editedMilestones,
  expandedMilestones,
  toggleMilestoneExpansion,
  getMilestoneProgress,
  getMilestoneStatus,
  formatDate
}) => {
  // Helper function to get color based on document completion percentage
  const getDocumentCompletionColor = (uploadedDocs: number, requiredDocs: number) => {
    const percentage = (uploadedDocs / requiredDocs) * 100;
    
    if (percentage >= 100) return 'text-success bg-success/10';
    if (percentage >= 50) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };
  
  // Helper function to get border color based on document completion
  const getDocumentBorderColor = (uploadedDocs: number, requiredDocs: number) => {
    const percentage = (uploadedDocs / requiredDocs) * 100;
    
    if (percentage >= 100) return 'border-l-success';
    if (percentage >= 50) return 'border-l-warning';
    return 'border-l-destructive';
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => {
        const currentMilestone = editedMilestones[milestone.id] || milestone;
        const isExpanded = expandedMilestones[milestone.id] || false;
        const docsPercentage = Math.round((currentMilestone.uploadedDocs / currentMilestone.requiredDocs) * 100);
        const circleColor = getDocumentCompletionColor(currentMilestone.uploadedDocs, currentMilestone.requiredDocs);
        const borderColor = getDocumentBorderColor(currentMilestone.uploadedDocs, currentMilestone.requiredDocs);
        
        return (
          <div 
            key={milestone.id} 
            className={`border rounded-xl overflow-hidden bg-card shadow-sm transition-all duration-200 hover:shadow-md border-l-4 ${borderColor} relative`}
          >
            {/* Milestone Header */}
            <div 
              className={`p-4 flex justify-between items-center cursor-pointer ${isExpanded ? 'border-b border-dashed' : ''}`}
              onClick={() => toggleMilestoneExpansion(milestone.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Circular progress indicator */}
                <div className={`relative flex items-center justify-center h-9 w-9 rounded-full ${circleColor}`}>
                  <span className="text-xs font-medium">{docsPercentage}%</span>
                </div>
                <div>
                  <h3 className="font-medium text-sm">{currentMilestone.name}</h3>
                  <p className="text-xs flex items-center text-muted-foreground">
                    <FileCheck className="h-3 w-3 mr-1" />
                    <span>{currentMilestone.uploadedDocs}/{currentMilestone.requiredDocs} dokumen</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                {isExpanded ? 
                  <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                }
              </div>
            </div>
                        
            {/* Milestone Details (expanded) */}
            {isExpanded && (
              <div className="p-4 bg-accent/30">
                <div className="grid grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <div className="flex items-center text-muted-foreground text-xs mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Tanggal Mulai</span>
                    </div>
                    <div className="font-medium">
                      {formatDate(currentMilestone.startDate, true)}
                    </div>
                  </div>
                  
                  {/* End Date */}
                  <div className="p-3 rounded-lg bg-background border border-border">
                    <div className="flex items-center text-muted-foreground text-xs mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>Tanggal Selesai</span>
                    </div>
                    <div className="font-medium">
                      {formatDate(currentMilestone.deadline, true)}
                    </div>
                  </div>
                  
                  {/* Document upload status */}
                  <div className="col-span-2 mt-1 p-3 rounded-lg bg-background border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-muted-foreground text-xs">
                        <FileCheck className="h-3 w-3 mr-1" />
                        <span>Dokumentasi</span>
                      </div>
                      <div className="text-xs font-medium">
                        {currentMilestone.uploadedDocs}/{currentMilestone.requiredDocs}
                      </div>
                    </div>
                    <Progress 
                      value={(currentMilestone.uploadedDocs / currentMilestone.requiredDocs) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  {/* Description section */}
                  {currentMilestone.description && (
                    <div className="col-span-2 mt-1 p-3 rounded-lg bg-background border border-border">
                      <div className="text-muted-foreground text-xs mb-1">Deskripsi Tugas</div>
                      <div className="text-xs leading-relaxed">
                        {currentMilestone.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};