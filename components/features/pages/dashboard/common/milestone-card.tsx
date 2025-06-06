import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/ui/card';
import { Badge } from '@/components/common/ui/badge';
import { CheckCircle, Clock, AlertCircle, Camera, ChevronDown, ChevronRight } from 'lucide-react';

interface MilestoneChartProps {
  milestones: {
    id: number;
    name: string;
    project: string;
    icon: React.ReactNode;
    documents?: any[];
    requiredPhotos?: {
      name: string;
      uploaded: boolean;
    }[];
    progress?: number;
    description?: string;
  }[];
}

export const MilestoneChart: React.FC<MilestoneChartProps> = ({ milestones }) => {
  // Group milestones by project
  const milestonesByProject = milestones.reduce((acc, milestone) => {
    if (!acc[milestone.project]) {
      acc[milestone.project] = [];
    }
    acc[milestone.project].push(milestone);
    return acc;
  }, {} as Record<string, typeof milestones>);

  // Track expanded state for each project
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>(
    Object.keys(milestonesByProject).reduce((acc, project) => {
      acc[project] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Calculate progress for each milestone
  const calculateProgress = (milestone: MilestoneChartProps['milestones'][0]) => {
    if (milestone.progress !== undefined) return milestone.progress;
    
    if (!milestone.requiredPhotos || milestone.requiredPhotos.length === 0) return 0;
    
    const uploadedCount = milestone.requiredPhotos.filter(photo => photo.uploaded).length;
    return Math.round((uploadedCount / milestone.requiredPhotos.length) * 100);
  };

  // Calculate overall project progress
  const calculateProjectProgress = (projectMilestones: typeof milestones) => {
    if (projectMilestones.length === 0) return 0;
    
    const totalProgress = projectMilestones.reduce((sum, milestone) => {
      return sum + calculateProgress(milestone);
    }, 0);
    
    return Math.round(totalProgress / projectMilestones.length);
  };

  // Toggle project expansion
  const toggleProject = (project: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [project]: !prev[project]
    }));
  };

  // Circular progress component
  const CircularProgress = ({ 
    progress, 
    size, 
    strokeWidth = 2,
    isCompleted = false,
    isInProgress = false
  }: { 
    progress: number, 
    size: number, 
    strokeWidth?: number,
    isCompleted?: boolean,
    isInProgress?: boolean
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            className="text-secondary"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={
              isCompleted ? "text-success" : 
              isInProgress ? "text-warning" : 
              "text-muted-foreground"
            }
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {progress === 100 ? (
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
          ) : progress > 0 ? (
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-warning" />
          ) : (
            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 md:space-y-10">
      {Object.entries(milestonesByProject).map(([project, projectMilestones], projectIndex) => {
        const projectProgress = calculateProjectProgress(projectMilestones);
        const completedMilestones = projectMilestones.filter(
          m => calculateProgress(m) === 100
        ).length;
        
        return (
          <Card key={projectIndex} className="overflow-hidden border-border shadow-md">
            {/* Project Header */}
            <div 
              className="bg-gradient-to-r from-secondary to-background p-3 sm:p-5 border-b border-border cursor-pointer"
              onClick={() => toggleProject(project)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-background p-1 rounded-md shadow-sm">
                    {expandedProjects[project] ? 
                      <ChevronDown className="h-5 w-5 text-primary" /> : 
                      <ChevronRight className="h-5 w-5 text-primary" />
                    }
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground truncate max-w-[150px] sm:max-w-[250px]">{project}</h3>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {completedMilestones}/{projectMilestones.length}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-16 sm:w-24 h-2 sm:h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${projectProgress}%` }} 
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">{projectProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Milestone cards */}
            {expandedProjects[project] && (
              <CardContent className="p-3 sm:p-6 bg-secondary/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {projectMilestones.map((milestone) => {
                    const progress = calculateProgress(milestone);
                    const isCompleted = progress === 100;
                    const isInProgress = progress > 0 && progress < 100;
                    
                    // Status configuration
                    const statusConfig = isCompleted 
                      ? {
                          bgColor: "bg-success/10",
                          borderColor: "border-success/20",
                          textColor: "text-success",
                          text: "Selesai"
                        }
                      : isInProgress 
                        ? {
                            bgColor: "bg-warning/10",
                            borderColor: "border-warning/20",
                            textColor: "text-warning",
                            text: "Proses"
                          }
                        : {
                            bgColor: "bg-muted",
                            borderColor: "border-muted-foreground/20",
                            textColor: "text-muted-foreground",
                            text: "Belum Mulai"
                          };
                    
                    return (
                      <div key={milestone.id} className="relative group">
                        {/* Card */}
                        <div className="h-full bg-card rounded-lg border border-border shadow-sm transition-all duration-300 group-hover:shadow-md overflow-hidden">
                          {/* Status header */}
                          <div className={`
                            px-3 sm:px-5 py-2 sm:py-3 border-b flex items-center justify-between
                            ${statusConfig.bgColor} ${statusConfig.borderColor}
                          `}>
                            <h4 className="font-medium text-sm sm:text-base text-card-foreground truncate max-w-[70%]">
                              {milestone.name}
                            </h4>
                            <Badge 
                              variant="outline"
                              className={`
                                px-2 sm:px-2.5 py-0.5 sm:py-1 font-medium text-xs
                                ${statusConfig.bgColor} ${statusConfig.textColor}
                              `}
                            >
                              <span className="flex items-center gap-1.5">
                                <CircularProgress 
                                  progress={progress} 
                                  size={16} 
                                  strokeWidth={2}
                                  isCompleted={isCompleted}
                                  isInProgress={isInProgress}
                                />
                                <span className="hidden xs:inline">{statusConfig.text}</span>
                              </span>
                            </Badge>
                          </div>
                          
                          <div className="p-3 sm:p-5 space-y-3 sm:space-y-5">
                            {/* Description progress circle */}
                            <div className="flex items-start gap-3">
                              {/* Compact circular progress */}
                              <CircularProgress 
                                progress={progress} 
                                size={28} 
                                strokeWidth={3}
                                isCompleted={isCompleted}
                                isInProgress={isInProgress}
                              />
                              
                              {/* Description */}
                              <div className="flex-1">
                                <div className="flex items-center mb-1">
                                  <span className="text-xs sm:text-sm font-medium mr-2">
                                    {progress}%
                                  </span>
                                  {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      ({milestone.requiredPhotos.filter(p => p.uploaded).length}/{milestone.requiredPhotos.length} foto)
                                    </span>
                                  )}
                                </div>
                                
                                {milestone.description ? (
                                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                    {milestone.description}
                                  </p>
                                ) : (
                                  <p className="text-xs sm:text-sm text-muted-foreground italic">
                                    Tidak ada deskripsi.
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Documentation section */}
                            {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 && (
                              <div className="bg-secondary/50 p-2 sm:p-4 rounded-md border border-border">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                                  <p className="text-xs sm:text-sm font-medium text-foreground">
                                    Dokumentasi
                                  </p>
                                </div>
                                
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                  {milestone.requiredPhotos.map((photo, photoIndex) => (
                                    <Badge 
                                      key={photoIndex}
                                      variant="outline"
                                      className={`
                                        text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 font-normal
                                        ${photo.uploaded 
                                          ? 'bg-success/10 text-success border-success/20' 
                                          : 'bg-card text-muted-foreground border-border'}
                                      `}
                                    >
                                      {photo.uploaded && (
                                        <CheckCircle className="inline-block h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1 sm:mr-1.5" />
                                      )}
                                      <span className="truncate max-w-[80px] sm:max-w-full">{photo.name}</span>
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};