import React from 'react';
import { Clock, CheckCircle, FileText, Camera } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface ProjectMilestonesProps {
  milestones: {
    id: number;
    name: string;
    project: string;
    projectId: number;
    icon: React.ReactElement;
    documents: any[];
    progress?: number;
    requiredPhotos: {
      name: string;
      uploaded: boolean;
    }[];
  }[];
}

export default function ProjectMilestones({ milestones }: ProjectMilestonesProps) {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Project Milestones</h2>
        <Badge variant="outline" className="font-medium">
          {milestones.length} Milestones
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {milestones.map((milestone) => (
          <Card key={milestone.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
              </div>
              <CardTitle className="text-lg font-bold">{milestone.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{milestone.project}</p>
            </CardHeader>
            
            <CardContent className="pt-0">
              {milestone.progress !== undefined && (
                <div className="mb-4">
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              )}
              
              <div className="space-y-3">
                {/* Documents section */}
                <div className="flex items-center text-sm">
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  <span className="font-medium">
                    Documents: {milestone.documents.length}
                  </span>
                </div>
                
                {/* Photos section */}
                <div className="text-sm">
                  <div className="flex items-center mb-2">
                    <Camera className="mr-2 h-4 w-4 text-primary" />
                    <span className="font-medium">
                      Photos: {milestone.requiredPhotos.filter(p => p.uploaded).length}/{milestone.requiredPhotos.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {milestone.requiredPhotos.map((photo, idx) => (
                      <div 
                        key={idx} 
                        className={`text-xs px-2 py-1 rounded flex items-center ${
                          photo.uploaded 
                            ? "bg-success/20 text-secondary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {photo.uploaded ? (
                          <CheckCircle className="mr-1 h-3 w-3 text-success" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        <span className="truncate">{photo.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}