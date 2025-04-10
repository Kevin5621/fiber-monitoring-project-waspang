import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { projectsService } from './projects.service';
import { milestonesService } from './milestones.service';
import { documentsService } from './documents.service';
import { reportsService } from './reports.service';
import { formatDate } from './helpers';
import { StatProps } from '@/components/features/pages/dashboard/common/stat-card';
import { Milestone, FileText, Image } from 'lucide-react';
import React from 'react';

export const statsService = {
  async calculateStats(currentDate?: Date, supabaseClient?: SupabaseClient) {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    
    const projects = await projectsService.getAll(supabase);
    const allMilestones = await milestonesService.getAll(supabase);
    const documents = await documentsService.getAll(supabase);
    
    // Calculate stats based on the data from Supabase
    const totalMilestones = allMilestones.length;
    
    const completedMilestones = allMilestones.filter(m => {
      return m.requiredPhotos && 
             m.requiredPhotos.every(photo => photo.uploaded === true);
    }).length;
    
    const inProgressMilestones = allMilestones.filter(m => {
      return m.requiredPhotos && 
             m.requiredPhotos.some(photo => photo.uploaded === true) &&
             !m.requiredPhotos.every(photo => photo.uploaded === true);
    }).length;
    
    const pendingDocuments = documents.length;
    
    const documentsUploaded = allMilestones.reduce((total, milestone) => {
      return total + (milestone.requiredPhotos ? 
        milestone.requiredPhotos.filter(photo => photo.uploaded).length : 0);
    }, 0);
    
    const totalRequiredDocs = allMilestones.reduce((total, milestone) => {
      return total + (milestone.requiredPhotos ? milestone.requiredPhotos.length : 0);
    }, 0);
    
    // Get active projects
    const activeProjects = projects.filter(p => !p.isCompleted);
    
    // Format date for comparison
    const today = currentDate || new Date();
    const todayFormatted = formatDate(today);
    
    // Check daily reports status for each active project
    const projectReportsStatus = await Promise.all(
      activeProjects.map(async project => {
        const projectReports = await reportsService.getByProjectId(project.id, supabase);
        
        return projectReports.some(report => 
          formatDate(report.submittedAt) === todayFormatted &&
          (report.status === 'approved' || report.status === 'in-review')
        );
      })
    );
    
    // Calculate overall daily reports status
    const submittedReports = projectReportsStatus.filter(status => status).length;
    const totalRequired = activeProjects.length;
    
    // Create stats for desktop view
    const stats: StatProps[] = [
      {
        title: "Milestone",
        value: `${completedMilestones}/${totalMilestones}`,
        description: "Milestone selesai",
        color: "default",
        icon: React.createElement(Milestone, { className: "h-4 w-4" })
      },
      {
        title: "Laporan Harian",
        value: `${submittedReports}/${totalRequired}`,
        description: "Laporan hari ini",
        color: submittedReports === totalRequired ? "success" : "warning",
        icon: React.createElement(FileText, { className: "h-4 w-4" })
      },
      {
        title: "Dokumentasi",
        value: `${documentsUploaded}/${totalRequiredDocs}`,
        description: `${pendingDocuments} dokumen tertunda`,
        color: documentsUploaded === totalRequiredDocs ? "success" : "warning",
        icon: React.createElement(Image, { className: "h-4 w-4" })
      }
    ];
    
    // Create stats for mobile view
    const mobileStats: StatProps[] = [
      {
        title: "MS",
        value: `${completedMilestones}/${totalMilestones}`,
        description: "",
        color: "default",
        icon: React.createElement(Milestone, { className: "h-4 w-4" })
      },
      {
        title: "LH",
        value: `${submittedReports}/${totalRequired}`,
        description: "",
        color: submittedReports === totalRequired ? "success" : "warning",
        icon: React.createElement(FileText, { className: "h-4 w-4" })
      },
      {
        title: "DOK",
        value: `${documentsUploaded}/${totalRequiredDocs}`,
        description: "",
        color: documentsUploaded === totalRequiredDocs ? "success" : "warning",
        icon: React.createElement(Image, { className: "h-4 w-4" })
      }
    ];
    
    return {
      milestones: {
        total: totalMilestones,
        completed: completedMilestones,
        inProgress: inProgressMilestones
      },
      reports: {
        submitted: submittedReports,
        required: totalRequired
      },
      documents: {
        uploaded: documentsUploaded,
        required: totalRequiredDocs,
        pending: pendingDocuments
      },
      stats,
      mobileStats
    };
  }
};