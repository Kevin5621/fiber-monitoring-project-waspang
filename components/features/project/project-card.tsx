import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, CheckCircle, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    progress: number;
  };
  stats: {
    totalMilestones: number;
    completedMilestones: number;
    totalDocuments: number;
    documentedDocuments: number;
  };
}

export const ProjectCard = ({ project, stats }: ProjectCardProps) => {
  const getStatusBadge = (status: string) => {
    if (status === 'completed' || status === 'Selesai') {
      return <Badge className="bg-success-100 text-success border-0 font-medium px-2.5 py-0.5 rounded">Selesai</Badge>;
    } else {
      return <Badge className="bg-info-100 text-info border-0 font-medium px-2.5 py-0.5 rounded">Sedang Berjalan</Badge>;
    }
  };

  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold line-clamp-2">{project.name}</h3>
            {getStatusBadge(project.status)}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{project.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-5">
            <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span>{project.startDate} - {project.endDate}</span>
          </div>
          
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progres</span>
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-0">
            <div className="bg-muted/50 rounded p-3">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Milestone</span>
              </div>
              <div className="text-lg font-semibold">
                {stats.completedMilestones || 0}/{stats.totalMilestones || 0}
              </div>
            </div>
            <div className="bg-muted/50 rounded p-3">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <FileCheck className="h-3 w-3 mr-1" />
                <span>Dokumen</span>
              </div>
              <div className="text-lg font-semibold">
                {stats.documentedDocuments || 0}/{stats.totalDocuments || 0}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};