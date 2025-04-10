import React from 'react';
import { Badge } from '@/components/common/ui/badge';
import { Camera, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { PoleLocation } from '@/data/project/locations';
import { ProjectMilestone } from '@/data/project/milestones';
import { Project } from '@/data/project/projects';
import { useRouter } from 'next/navigation';

interface MapPopupProps {
  pole: PoleLocation;
  status: string;
  project: Project | undefined;
  poleMilestones: ProjectMilestone[];
  uploadedPhotos: number;
  totalPhotos: number;
  onPoleClick?: (pole: PoleLocation) => void;
}

export function MapPopup({
  pole,
  status,
  project,
  poleMilestones,
  uploadedPhotos,
  totalPhotos,
  onPoleClick
}: MapPopupProps) {
  const router = useRouter();
  const getStatusColor = () => {
    switch(status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'pending': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const progressPercentage = Math.round((uploadedPhotos / totalPhotos) * 100);
  const latestMilestone = poleMilestones.length > 0 ? poleMilestones[poleMilestones.length - 1] : null;

  const handleViewDetails = () => {
    if (project) {
      // Navigate to project detail page with milestones tab active
      router.push(`/dashboard/project/${project.id}?tab=milestones`);
    } else if (onPoleClick) {
      onPoleClick(pole);
    }
  };

  return (
    <div className="rounded-md overflow-hidden shadow-md w-64 border border-border">
      {/* Header */}
      <div className={`p-3 ${getStatusColor()}`}>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <div>
            <h3 className="font-medium text-base leading-tight">{pole.name}</h3>
            <p className="text-xs opacity-90">{project?.name}</p>
          </div>
        </div>
        <Badge variant="outline" className="mt-1 text-xs capitalize bg-background/20 border-0">
          {status.replace('-', ' ')}
        </Badge>
      </div>

      {/* Body */}
      <div className="bg-card text-card-foreground p-3 space-y-3">
        {/* Documentation progress */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <Camera className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium">Photos: {uploadedPhotos}/{totalPhotos}</span>
            </div>
            <span className="text-xs font-bold text-primary">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        {/* Latest Milestone (if exists) */}
        {latestMilestone && (
          <div className="bg-accent/10 rounded p-2 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium flex items-center gap-1">
                {latestMilestone.icon}
                {latestMilestone.name}
              </span>
              <span>{latestMilestone.progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-1 mb-1">
              <div 
                className="h-1 rounded-full bg-primary transition-all"
                style={{ width: `${latestMilestone.progress}%` }}
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {latestMilestone.requiredPhotos.map((photo, index) => (
                <span 
                  key={index}
                  className={`text-[9px] px-1 py-0.5 rounded ${
                    photo.uploaded 
                      ? 'bg-success/50 text-success-foreground'
                      : 'bg-warning/50 text-warning-foreground'
                  }`}
                >
                  {photo.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Milestones Summary */}
        {poleMilestones.length > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Milestones:</span>
            <span className="truncate">{poleMilestones.length}</span>
          </div>
        )}

        {/* Action Button */}
        <button 
          onClick={handleViewDetails}
          className="w-full py-1.5 px-3 bg-primary text-primary-foreground rounded
                   text-xs font-medium flex items-center justify-center gap-1 
                   hover:bg-primary/90 active:bg-primary/80 transition-colors"
        >
          View Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}