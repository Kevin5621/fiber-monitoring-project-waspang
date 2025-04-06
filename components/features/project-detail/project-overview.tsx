import React from 'react';
import { Calendar, UserCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Project, Milestone, Team } from './types';
import DocumentationChart from './documentation-chart';

interface ProjectOverviewCardProps {
  project: Project;
  projectMilestones: Milestone[];
  team: Team;
  documentationPercentage: number;
}

const ProjectOverviewCard = ({ project, projectMilestones, team, documentationPercentage }: ProjectOverviewCardProps) => {
  return (
    <Card className="mb-6 overflow-hidden border-none shadow-md">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-background/80 px-3 py-1.5 rounded-full">
                <DocumentationChart percentage={documentationPercentage} size="sm" />
                <span className="text-sm font-medium">{documentationPercentage}% Dokumentasi</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Lokasi:</span> {project.location}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">{project.description}</p>
            
            <div className="bg-background/80 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progres Keseluruhan</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2 mb-3" />
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-2xl font-bold">{projectMilestones.length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Total Milestone</div>
                </div>
                <div className="text-center p-3 bg-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{projectMilestones.filter(m => m.status === 'Selesai').length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Selesai</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').length}</div>
                  <div className="text-xs text-muted-foreground mt-1">Sedang Berjalan</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Info */}
          <div className="bg-background/80 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-base font-medium mb-4">Tim Proyek</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{team.pm}</p>
                  <p className="text-xs text-muted-foreground">Project Manager</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center text-green-600 mr-3">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{team.waspang}</p>
                  <p className="text-xs text-muted-foreground">Pengawas Lapangan</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{team.admin}</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectOverviewCard;