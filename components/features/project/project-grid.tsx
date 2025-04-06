import React from 'react';
import { ProjectCard } from './project-card';
import { EmptyProjectState } from './empty-project-state';

interface ProjectGridProps {
  projects: any[];
  projectStats: {[key: number]: {
    totalMilestones: number;
    completedMilestones: number;
    totalDocuments: number;
    documentedDocuments: number;
  }};
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