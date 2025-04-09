"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProjectById } from "@/data/project/projects";
import { getProjectStats } from "@/data/project/stats";
import { getMilestonesByProjectId } from "@/data/project/milestones";
import { getReportsByProjectId } from "@/data/project/reports";
import { getDocumentsByProjectId } from "@/data/project/projects";
import { getActivitiesByProjectId } from "@/data/project/activities";
import ProjectMilestones from "@/components/features/project-detail/project-milestones";
import ProjectReports from "@/components/features/project-detail/project-reports";
import ProjectDocuments from "@/components/features/project-detail/project-documents";
import ProjectOverview from "@/components/features/project-detail/project-overview";
import ProjectActivities from "@/components/features/project-detail/project-activities";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("milestones");
  
  // Set active tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['milestones', 'reports', 'documents', 'activities'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  // Convert projectId to number
  const projectIdNum = Number(projectId);
  
  // Get project data
  const project = getProjectById(projectIdNum);
  const projectStats = getProjectStats(projectIdNum);
  const milestones = getMilestonesByProjectId(projectIdNum);
  const reports = getReportsByProjectId(projectIdNum);
  const documents = getDocumentsByProjectId(projectIdNum);
  const activities = getActivitiesByProjectId(projectIdNum);
  
  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      
      {/* Overview section */}
      <div className="mb-6">
        <ProjectOverview project={project} stats={projectStats} />
      </div>
      
      <Tabs defaultValue="milestones" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="milestones">
          <ProjectMilestones milestones={milestones} />
        </TabsContent>
        
        <TabsContent value="reports">
          <ProjectReports reports={reports} />
        </TabsContent>
        
        <TabsContent value="documents">
          <ProjectDocuments documents={documents} />
        </TabsContent>
        
        <TabsContent value="activities">
          <ProjectActivities activities={activities} />
        </TabsContent>
      </Tabs>
    </div>
  );
}