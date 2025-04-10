import { Card, CardContent, CardHeader, CardTitle } from "@/components/common/ui/card";
import { Progress } from "@/components/common/ui/progress";
import { Project } from "@/data/project/projects";
import { formatDate } from "@/lib/utils";
import ProjectMap from "@/components/features/common/map/project-map";
import { getMilestonesByProjectId } from "@/data/project/milestones";
import { getLocationsByProjectId } from "@/data/project/locations";
import { CalendarDays, MapPin, FileText, Flag, Clock, CheckCircle } from "lucide-react";

interface ProjectOverviewProps {
  project: Project;
  stats: {
    milestones: {
      completed: number;
      total: number;
      progress: number;
    };
    documents: {
      uploaded: number;
      total: number;
      pending: number;
    };
    reports: {
      approved: number;
      total: number;
      approvalRate: number;
    };
  };
}

export default function ProjectOverview({ project, stats }: ProjectOverviewProps) {
  // Get project-specific data for the map
  const projectLocations = getLocationsByProjectId(project.id);
  const projectMilestones = getMilestonesByProjectId(project.id);
  
  // Calculate timeline progress
  const today = new Date();
  const startDate = new Date(project.startDate);
  const endDate = new Date(project.endDate);
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = today.getTime() - startDate.getTime();
  const timelineProgress = Math.min(100, Math.max(0, (elapsedDuration / totalDuration) * 100));
  
  return (
    <div className="space-y-8">
      {/* Hero Project Banner */}
      <div className="relative rounded-xl bg-card border border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="relative flex flex-col md:flex-row p-8 gap-8">
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`
                  px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5
                  ${project.isCompleted 
                    ? "bg-success/10 text-success" 
                    : "bg-primary/10 text-primary"}
                `}>
                  {project.isCompleted ? 
                    <CheckCircle className="h-3.5 w-3.5" /> : 
                    <Clock className="h-3.5 w-3.5" />
                  }
                  {project.isCompleted ? "Completed" : "In Progress"}
                </div>
                <span className="text-sm text-muted-foreground">
                  Project #{project.id}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {project.name}
              </h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
              </div>
            </div>
            
            {project.description && (
              <p className="text-sm text-muted-foreground max-w-2xl">
                {project.description}
              </p>
            )}
          </div>
          
          <div className="md:w-72 flex-shrink-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Timeline Progress</span>
                  <span className="font-medium">{Math.round(timelineProgress)}%</span>
                </div>
                <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary/80 rounded-full transition-all duration-300"
                    style={{ width: `${timelineProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stats.milestones.progress}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Completion
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(timelineProgress)}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Timeline
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Map and Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Map */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Lokasi Projek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full rounded-md overflow-hidden border border-muted">
              <ProjectMap 
                projectLocations={projectLocations}
                milestones={projectMilestones}
                projectId={project.id}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Project Stats Cards */}
        <div className="space-y-6">
          {/* Milestones Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-transparent p-1"></div>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 bg-primary/10 p-3 rounded-lg">
                  <Flag className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Milestones</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold">{stats.milestones.completed}</span>
                    <span className="text-muted-foreground ml-1">/ {stats.milestones.total}</span>
                  </div>
                  <Progress value={stats.milestones.progress} className="h-1.5 mt-3" />
                  <p className="text-xs text-muted-foreground mt-1.5">{stats.milestones.progress}% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Documents Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-info/10 to-transparent p-1"></div>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 bg-info/10 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-info" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Documents</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold">{stats.documents.uploaded}</span>
                    <span className="text-muted-foreground ml-1">/ {stats.documents.total}</span>
                  </div>
                  <Progress 
                    value={stats.documents.total > 0 ? (stats.documents.uploaded / stats.documents.total) * 100 : 0} 
                    className="h-1.5 mt-3" 
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {stats.documents.pending} documents pending
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Reports Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-success/10 to-transparent p-1"></div>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="mr-4 bg-success/10 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Reports</h3>
                  <div className="flex items-baseline mt-1">
                    <span className="text-3xl font-bold">{stats.reports.approved}</span>
                    <span className="text-muted-foreground ml-1">/ {stats.reports.total}</span>
                  </div>
                  <Progress value={stats.reports.approvalRate} className="h-1.5 mt-3" />
                  <p className="text-xs text-muted-foreground mt-1.5">{stats.reports.approvalRate}% approval rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}