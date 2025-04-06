"use client"

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/project/projects';
import { getMilestonesByProjectId } from '@/data/project/milestones';
import { getDocumentsByProjectId } from '@/data/project/projects';
import { ProjectFilter } from '@/components/features/project/project-filter';
import { ProjectGrid } from '@/components/features/project/project-grid';

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projectStats, setProjectStats] = useState<{[key: number]: {
    totalMilestones: number;
    completedMilestones: number;
    totalDocuments: number;
    documentedDocuments: number;
  }}>({});
  
  // Load project stats on component mount
  useEffect(() => {
    const stats: {[key: number]: any} = {};
    
    projects.forEach(project => {
      const milestones = getMilestonesByProjectId(project.id);
      const documents = getDocumentsByProjectId(project.id);
      
      const completedMilestones = milestones.filter(m => 
        m.status === 'Selesai' || m.uploadedDocs >= m.requiredDocs
      ).length;
      
      const documentedDocuments = documents.filter(doc => doc.type === 'document').length;
      
      stats[project.id] = {
        totalMilestones: milestones.length,
        completedMilestones,
        totalDocuments: documents.length,
        documentedDocuments
      };
    });
    
    setProjectStats(stats);
  }, []);
  
  // Filter projects based on status and search query
  const filteredProjects = projects
    .filter(project => filterStatus === 'all' || project.status === filterStatus)
    .filter(project => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query)
      );
    });

  return (
    <div className="container mx-auto p-4 sm:p-6 relative">
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <ProjectFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Projects Grid */}
        <ProjectGrid 
          projects={filteredProjects} 
          projectStats={projectStats} 
        />
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ProjectsPage;