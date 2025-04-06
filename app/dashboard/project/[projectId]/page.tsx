"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { projects } from '@/data/project/projects';
import { milestones } from '@/data/project/milestones';
import { dailyReports } from '@/data/project/reports';
import { documents } from '@/data/project/documents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, PieChart } from 'lucide-react';

import ProjectHeader from '../../../../components/features/project-detail/project-header';
import { Project, Team, Milestone, Report, Document } from '../../../../components/features/project-detail/types';
import DocumentationTab from '../../../../components/features/project-detail/documentation-tab';
import MilestonesTab from '../../../../components/features/project-detail/milestones-tab';
import OverviewTab from '../../../../components/features/project-detail/overview-tab';
import ProjectOverviewCard from '../../../../components/features/project-detail/project-overview';
import ReportsTab from '../../../../components/features/project-detail/reports-tab';

const ProjectDetailPage = () => {
  const params = useParams();
  const projectId = Number(params.projectId);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [documentationPercentage, setDocumentationPercentage] = useState(0);

  // Get project data from centralized data and cast to our Project type
  const projectData = projects.find(p => p.id === projectId);
  const project: Project = projectData ? {
    ...projectData,
    description: projectData.description || 'No description available' // Ensure description is never undefined
  } : {
    id: 0,
    name: 'Project Not Found',
    location: 'Unknown',
    startDate: '-',
    endDate: '-',
    status: 'not-started',
    progress: 0,
    milestones: 0,
    completedMilestones: 0,
    pendingDocuments: 0,
    description: 'Project not found in the database.'
  };

  // Get project milestones from centralized data and map to our Milestone type
  const projectMilestones: Milestone[] = milestones
    .filter(m => m.projectId === projectId)
    .map(milestone => ({
      ...milestone,
      // Ensure progress is always a number (default to 0 if undefined)
      progress: milestone.progress || 0,
      // Add status if missing or use a default value
      status: (milestone as any).status || 'Belum Dimulai'
    }));
  
  // Get project reports from centralized data and cast to our Report type
  const projectReports: Report[] = dailyReports.filter(r => r.projectId === projectId);
  
  // Get project documents from centralized data and cast to our Document type
  const projectDocuments: Document[] = documents.filter(d => d.projectId === projectId);

  // Calculate documentation percentage
  useEffect(() => {
    // Calculate total required documents from milestones
    const totalRequiredDocs = projectMilestones.reduce((total, milestone) => {
      return total + (milestone.requiredPhotos?.length || 0);
    }, 0);

    // Calculate total uploaded documents
    const totalUploadedDocs = projectMilestones.reduce((total, milestone) => {
      return total + (milestone.requiredPhotos?.filter(photo => photo.uploaded)?.length || 0);
    }, 0);

    // Calculate percentage
    const percentage = totalRequiredDocs > 0 
      ? Math.round((totalUploadedDocs / totalRequiredDocs) * 100) 
      : 0;
    
    setDocumentationPercentage(percentage);
  }, [projectMilestones]);

  // Sample team data (this would come from a users database in a real app)
  const team: Team = {
    pm: 'Budi Santoso',
    admin: 'Dewi Putri',
    waspang: 'Ahmad Rizal'
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery('');
  };

  // Filter items based on search query
  const filteredMilestones = projectMilestones.filter(milestone => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return milestone.name.toLowerCase().includes(query);
  });

  const filteredReports = projectReports.filter(report => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      report.title.toLowerCase().includes(query) ||
      report.activities.some(activity => activity.toLowerCase().includes(query))
    );
  });

  const filteredDocuments = projectDocuments.filter(doc => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query);
  });

  return (
    <div className="container mx-auto p-4 sm:p-6 relative">
      <ProjectHeader project={project} />
      
      <ProjectOverviewCard 
        project={project} 
        projectMilestones={projectMilestones} 
        team={team} 
        documentationPercentage={documentationPercentage} 
      />
      
      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="milestones">Milestone</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            {activeTab !== 'overview' && (
              <div className="relative w-full md:w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Cari ${activeTab === 'milestones' ? 'milestone' : activeTab === 'reports' ? 'laporan' : 'dokumen'}...`}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <OverviewTab 
            projectMilestones={projectMilestones} 
            projectReports={projectReports} 
            setActiveTab={setActiveTab} 
            documentationPercentage={documentationPercentage}
          />
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <MilestonesTab filteredMilestones={filteredMilestones} />
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <ReportsTab filteredReports={filteredReports} />
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <DocumentationTab filteredDocuments={filteredDocuments} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;