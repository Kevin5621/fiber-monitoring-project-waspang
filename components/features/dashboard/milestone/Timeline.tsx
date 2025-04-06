import React from 'react';
import { ChevronDown, ChevronUp, Calendar, Clock, CheckCircle, XCircle, AlertCircle, FileCheck } from 'lucide-react';
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
  // Helper function to get status icon and color
  const getStatusIconAndColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { 
          icon: <CheckCircle className="h-4 w-4" />, 
          color: 'text-success',
          bgColor: 'bg-success',
          lightBgColor: 'bg-success/10',
          borderColor: 'border-l-success'
        };
      case 'in-progress':
        return { 
          icon: <Clock className="h-4 w-4" />, 
          color: 'text-warning',
          bgColor: 'bg-warning',
          lightBgColor: 'bg-warning/10',
          borderColor: 'border-l-warning'
        };
      case 'late':
        return { 
          icon: <AlertCircle className="h-4 w-4" />, 
          color: 'text-destructive',
          bgColor: 'bg-destructive',
          lightBgColor: 'bg-destructive/10',
          borderColor: 'border-l-destructive'
        };
      default:
        return { 
          icon: <XCircle className="h-4 w-4" />, 
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          lightBgColor: 'bg-muted/50',
          borderColor: 'border-l-muted'
        };
    }
  };
  
  // Helper function to get status label
  const getStatusLabel = (status: string, progress: number) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in-progress':
        return `Sedang Berjalan (${progress}%)`;
      case 'late':
        return 'Terlambat';
      default:
        return 'Belum Dimulai';
    }
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone) => {
        const currentMilestone = editedMilestones[milestone.id] || milestone;
        const progress = getMilestoneProgress(currentMilestone);
        const status = getMilestoneStatus(currentMilestone);
        const isExpanded = expandedMilestones[milestone.id] || false;
        const { icon, color, bgColor, lightBgColor, borderColor } = getStatusIconAndColor(status);
        
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
                <div className={`flex items-center justify-center h-9 w-9 rounded-full ${lightBgColor}`}>
                  <span className={color}>
                    {icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-sm">{currentMilestone.name}</h3>
                  <p className={`text-xs flex items-center ${color}`}>
                    {getStatusLabel(status, progress)}
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