import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Project } from "@/data/project/projects";
import { formatDate } from "@/lib/utils";

interface ProjectOverviewProps {
  project: Project;
  stats: any; // Using any for now, but you can create a proper type
}

export default function ProjectOverview({ project, stats }: ProjectOverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
              <p className="mt-1">{project.description || "No description available"}</p>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Start Date</h3>
                <p className="mt-1">{formatDate(project.startDate)}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">End Date</h3>
                <p className="mt-1">{formatDate(project.endDate)}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                <p className="mt-1">{project.isCompleted ? "Completed" : "In Progress"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.milestones.completed}/{stats.milestones.total}</div>
            <Progress value={stats.milestones.progress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{stats.milestones.progress}% complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documents.uploaded}/{stats.documents.total}</div>
            <Progress 
              value={stats.documents.total > 0 ? (stats.documents.uploaded / stats.documents.total) * 100 : 0} 
              className="h-2 mt-2" 
            />
            <p className="text-xs text-muted-foreground mt-2">
              {stats.documents.pending} documents pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reports.approved}/{stats.reports.total}</div>
            <Progress value={stats.reports.approvalRate} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">{stats.reports.approvalRate}% approval rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}