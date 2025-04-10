import React from 'react';
import { ProjectCard } from './project-card';
import { EmptyProjectState } from './empty-project-state';
import { Project } from '@/data/project/projects';

interface ProjectStats {
  totalMilestones: number;
  completedMilestones: number;
  totalDocuments: number;
  documentedDocuments: number;
}

interface ProjectGridProps {
  projects: Project[];
  projectStats: {[key: number]: ProjectStats};
}

export const ProjectGrid = ({ projects, projectStats }: ProjectGridProps) => {
  if (projects.length === 0) {
    return <EmptyProjectState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          stats={projectStats[project.id] || {
            totalMilestones: 0,
            completedMilestones: 0,
            totalDocuments: 0,
            documentedDocuments: 0
          }} 
        />
      ))}
    </div>
  );
};