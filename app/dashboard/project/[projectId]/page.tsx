"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjectById } from "@/data/project/projects";
import { getProjectStats } from "@/data/project/stats";
import { getMilestonesByProjectId } from "@/data/project/milestones";
import { getReportsByProjectId } from "@/data/project/reports";
import { getDocumentsByProjectId } from "@/data/project/projects";
import { getActivitiesByProjectId } from "@/data/project/activities";
import ProjectMilestones from "@/components/features/project-detail/ProjectMilestones";
import ProjectReports from "@/components/features/project-detail/ProjectReports";
import ProjectDocuments from "@/components/features/project-detail/ProjectDocuments";
import ProjectOverview from "@/components/features/project-detail/ProjectOverview";
import ProjectActivities from "@/components/features/project-detail/ProjectActivities";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
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
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">{project.location}</p>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ProjectOverview project={project} stats={projectStats} />
        </TabsContent>
        
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