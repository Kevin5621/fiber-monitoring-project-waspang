import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectMilestone } from "@/data/project/milestones";

interface ProjectMilestonesProps {
  milestones: ProjectMilestone[];
}

export default function ProjectMilestones({ milestones }: ProjectMilestonesProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          {milestones.length === 0 ? (
            <p className="text-muted-foreground">No milestones found for this project.</p>
          ) : (
            <div className="space-y-6">
              {milestones.map((milestone) => {
                const uploadedPhotos = milestone.requiredPhotos.filter(p => p.uploaded).length;
                const totalPhotos = milestone.requiredPhotos.length;
                const progress = totalPhotos > 0 ? Math.round((uploadedPhotos / totalPhotos) * 100) : 0;
                
                return (
                  <div key={milestone.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{milestone.icon}</span>
                        <h3 className="font-medium">{milestone.name}</h3>
                      </div>
                      <Badge variant={progress === 100 ? "success" : progress > 0 ? "outline" : "secondary"}>
                        {progress === 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
                      </Badge>
                    </div>
                    <Progress value={progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Required Photos: {uploadedPhotos}/{totalPhotos}</span>
                      <span>{progress}%</span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {milestone.requiredPhotos.map((photo, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${photo.uploaded ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <span className="text-sm">{photo.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}