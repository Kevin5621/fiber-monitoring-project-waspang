import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  return (
    <div className="space-y-10">
      {Object.entries(milestonesByProject).map(([project, projectMilestones], projectIndex) => {
        const projectProgress = calculateProjectProgress(projectMilestones);
        const completedMilestones = projectMilestones.filter(
          m => calculateProgress(m) === 100
        ).length;
        
        return (
          <Card key={projectIndex} className="overflow-hidden border-border shadow-md">
            {/* Project Header */}
            <div 
              className="bg-gradient-to-r from-secondary to-background p-5 border-b border-border cursor-pointer"
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
                  <h3 className="font-semibold text-lg text-foreground">{project}</h3>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {completedMilestones}/{projectMilestones.length} milestone
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${projectProgress}%` }} 
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{projectProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Milestone cards */}
            {expandedProjects[project] && (
              <CardContent className="p-6 bg-secondary/30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {projectMilestones.map((milestone, index) => {
                    const progress = calculateProgress(milestone);
                    const isCompleted = progress === 100;
                    const isInProgress = progress > 0 && progress < 100;
                    const notStarted = progress === 0;
                    
                    // Status configuration
                    const statusConfig = isCompleted 
                      ? {
                          bgColor: "bg-success/10",
                          borderColor: "border-success/20",
                          textColor: "text-success",
                          icon: <CheckCircle className="h-4 w-4" />,
                          text: "Selesai"
                        }
                      : isInProgress 
                        ? {
                            bgColor: "bg-warning/10",
                            borderColor: "border-warning/20",
                            textColor: "text-warning",
                            icon: <Clock className="h-4 w-4" />,
                            text: "Proses"
                          }
                        : {
                            bgColor: "bg-muted",
                            borderColor: "border-muted-foreground/20",
                            textColor: "text-muted-foreground",
                            icon: <AlertCircle className="h-4 w-4" />,
                            text: "Belum Mulai"
                          };
                    
                    return (
                      <div key={milestone.id} className="relative group">
                        {/* Card */}
                        <div className="h-full bg-card rounded-lg border border-border shadow-sm transition-all duration-300 group-hover:shadow-md overflow-hidden">
                          {/* Status header */}
                          <div className={`
                            px-5 py-3 border-b flex items-center justify-between
                            ${statusConfig.bgColor} ${statusConfig.borderColor}
                          `}>
                            <h4 className="font-medium text-card-foreground">
                              {milestone.name}
                            </h4>
                            <Badge 
                              variant="outline"
                              className={`
                                px-2.5 py-1 font-medium text-xs
                                ${statusConfig.bgColor} ${statusConfig.textColor}
                              `}
                            >
                              <span className="flex items-center gap-1.5">
                                {statusConfig.icon}
                                {statusConfig.text}
                              </span>
                            </Badge>
                          </div>
                          
                          <div className="p-5 space-y-5">
                            {/* Progress circle and description */}
                            <div className="flex items-start">
                              {/* Circular progress */}
                              <div className="mr-4 flex-shrink-0">
                                <div className="relative w-16 h-16">
                                  <svg className="w-16 h-16 transform -rotate-90">
                                    <circle
                                      className="text-secondary"
                                      strokeWidth="4"
                                      stroke="currentColor"
                                      fill="transparent"
                                      r="26"
                                      cx="32"
                                      cy="32"
                                    />
                                    <circle
                                      className={
                                        isCompleted ? "text-success" : 
                                        isInProgress ? "text-warning" : 
                                        "text-muted-foreground"
                                      }
                                      strokeWidth="4"
                                      strokeDasharray={163.36}  // 2*PI*r
                                      strokeDashoffset={(163.36 * (100 - progress)) / 100}
                                      strokeLinecap="round"
                                      stroke="currentColor"
                                      fill="transparent"
                                      r="26"
                                      cx="32"
                                      cy="32"
                                    />
                                  </svg>
                                  <div className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center">
                                    <span className="text-sm font-medium">
                                      {progress}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Description */}
                              <div className="flex-1">
                                {milestone.description ? (
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {milestone.description}
                                  </p>
                                ) : (
                                  <p className="text-sm text-muted-foreground italic">
                                    Tidak ada deskripsi.
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* Documentation section */}
                            {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 && (
                              <div className="bg-secondary/50 p-4 rounded-md border border-border">
                                <div className="flex items-center gap-2 mb-3">
                                  <Camera className="h-4 w-4 text-primary" />
                                  <p className="text-sm font-medium text-foreground">
                                    Dokumentasi: {milestone.requiredPhotos.filter(p => p.uploaded).length}/{milestone.requiredPhotos.length}
                                  </p>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {milestone.requiredPhotos.map((photo, photoIndex) => (
                                    <Badge 
                                      key={photoIndex}
                                      variant="outline"
                                      className={`
                                        text-xs px-2.5 py-1 font-normal
                                        ${photo.uploaded 
                                          ? 'bg-success/10 text-success border-success/20' 
                                          : 'bg-card text-muted-foreground border-border'}
                                      `}
                                    >
                                      {photo.uploaded && (
                                        <CheckCircle className="inline-block h-3 w-3 mr-1.5" />
                                      )}
                                      {photo.name}
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