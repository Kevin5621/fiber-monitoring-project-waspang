import React from 'react';
import { BarChart3, ClipboardList, FileCheck } from 'lucide-react';
import { StatProps } from '@/components/features/dashboard/common/stat-card';
import { documents } from './documents';
import { milestones } from './milestones';
import { activities } from './activities';
import { dailyReports } from './reports';
import { projects, getProjectById } from './projects';
import { formatDate } from '@/lib/utils';

// Function to calculate stats using our centralized data
export const calculateStats = (
  currentDate?: Date
): { stats: StatProps[], mobileStats: StatProps[] } => {
  // Calculate stats based on the centralized data
  const totalMilestones = milestones.length;
  
  // Update the completion criteria to check required photos instead of uploadedDocs/requiredDocs
  const completedMilestones = milestones.filter(m => {
    // A milestone is complete if all required photos are uploaded
    return m.requiredPhotos && 
           m.requiredPhotos.every(photo => photo.uploaded === true);
  }).length;
  
  const inProgressMilestones = milestones.filter(m => {
    // A milestone is in progress if some but not all required photos are uploaded
    return m.requiredPhotos && 
           m.requiredPhotos.some(photo => photo.uploaded === true) &&
           !m.requiredPhotos.every(photo => photo.uploaded === true);
  }).length;
  
  const pendingDocuments = documents.length;
  
  // Calculate total uploaded photos and required photos
  const documentsUploaded = milestones.reduce((total, milestone) => {
    return total + (milestone.requiredPhotos ? 
      milestone.requiredPhotos.filter(photo => photo.uploaded).length : 0);
  }, 0);
  
  const totalRequiredDocs = milestones.reduce((total, milestone) => {
    return total + (milestone.requiredPhotos ? milestone.requiredPhotos.length : 0);
  }, 0);

  // Check if daily report has been submitted today
  const todayReportSubmitted = activities.some(activity => 
    activity.action.includes('Laporan harian') && 
    activity.time.includes('jam lalu')
  );

  // Alternative check using the reports data
  // Update the date comparison logic
  const today = currentDate || new Date();
  const todayFormatted = formatDate(today);
  
  const reportSubmittedToday = dailyReports.some(report => 
    formatDate(report.submittedAt) === todayFormatted && 
    (report.status === 'approved' || report.status === 'in-review')
  );

  // Get active projects
  const activeProjects = projects.filter(p => !p.isCompleted);
  
  // Check daily reports status for each active project
  const projectReportsStatus = activeProjects.map(project => {
    const today = currentDate || new Date();
    const todayFormatted = formatDate(today);
    
    return dailyReports.some(report => 
      report.projectId === project.id &&
      formatDate(report.submittedAt) === todayFormatted &&
      (report.status === 'approved' || report.status === 'in-review')
    );
  });

  // Calculate overall daily reports status
  const submittedReports = projectReportsStatus.filter(status => status).length;
  const totalRequired = activeProjects.length;
  
  // Stats for the dashboard
  const stats: StatProps[] = [
    {
      title: 'Milestone Proyek',
      value: `${completedMilestones}/${totalMilestones}`,
      description: `${inProgressMilestones} sedang berjalan`,
      icon: React.createElement(BarChart3, { className: "h-5 w-5" }),
      color: 'primary'
    },
    {
      title: 'Laporan Harian',
      value: `${submittedReports}/${totalRequired}`,
      description: `${totalRequired - submittedReports} laporan belum dibuat`,
      icon: React.createElement(ClipboardList, { className: "h-5 w-5" }),
      color: submittedReports === totalRequired ? 'success' : 'warning'
    },
    {
      title: 'Dokumentasi',
      value: `${documentsUploaded}/${totalRequiredDocs}`,
      description: `${pendingDocuments} dokumen dibutuhkan`,
      icon: React.createElement(FileCheck, { className: "h-5 w-5" }),
      color: 'warning'
    }
  ];

  // Mobile-optimized stats (single row)
  const mobileStats: StatProps[] = [
    {
      title: 'Milestone',
      value: `${completedMilestones}/${totalMilestones}`,
      icon: React.createElement(BarChart3, { className: "h-4 w-4" }),
      color: 'primary'
    },
    {
      title: 'Laporan',
      value: `${submittedReports}/${totalRequired}`,
      icon: React.createElement(ClipboardList, { className: "h-4 w-4" }),
      color: submittedReports === totalRequired ? 'success' : 'warning'
    },
    {
      title: 'Dokumen',
      value: `${documentsUploaded}/${totalRequiredDocs}`,
      icon: React.createElement(FileCheck, { className: "h-4 w-4" }),
      color: 'warning'
    }
  ];

  return { stats, mobileStats };
};

// Helper function to get project-specific stats
export const getProjectStats = (projectId: number) => {
  // Get project data
  const project = getProjectById(projectId);
  
  // Filter milestones by project
  const projectMilestones = milestones.filter(m => m.projectId === projectId);
  const totalMilestones = projectMilestones.length;
  
  // Calculate completed milestones based on requiredPhotos
  const completedMilestones = projectMilestones.filter(m => {
    return m.requiredPhotos && 
           m.requiredPhotos.every(photo => photo.uploaded === true);
  }).length;
  
  // Filter documents by project
  const projectDocuments = documents.filter(d => d.projectId === projectId);
  const totalDocuments = projectDocuments.length;
  
  // Calculate required and uploaded photos
  const requiredPhotos = projectMilestones.reduce((total, milestone) => {
    return total + (milestone.requiredPhotos ? milestone.requiredPhotos.length : 0);
  }, 0);
  
  const uploadedPhotos = projectMilestones.reduce((total, milestone) => {
    return total + (milestone.requiredPhotos ? 
      milestone.requiredPhotos.filter(photo => photo.uploaded).length : 0);
  }, 0);
  
  // Filter reports by project
  const projectReports = dailyReports.filter(r => r.projectId === projectId);
  const totalReports = projectReports.length;
  const approvedReports = projectReports.filter(r => r.status === 'approved').length;
  
  return {
    milestones: {
      total: totalMilestones,
      completed: completedMilestones,
      progress: totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0
    },
    documents: {
      total: requiredPhotos,
      uploaded: uploadedPhotos,
      pending: requiredPhotos - uploadedPhotos
    },
    reports: {
      total: totalReports,
      approved: approvedReports,
      approvalRate: totalReports > 0 ? Math.round((approvedReports / totalReports) * 100) : 0
    }
  };
};