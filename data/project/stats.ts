import React from 'react';
import { BarChart3, ClipboardList, FileCheck } from 'lucide-react';
import { StatProps } from '@/components/dashboard/StatCard';
import { documents } from './documents';
import { milestones } from './milestones';
import { activities } from './activities';
import { dailyReports } from './reports';

// Function to calculate stats using our centralized data
export const calculateStats = (
  currentDate?: Date
): { stats: StatProps[], mobileStats: StatProps[] } => {
  // Calculate stats based on the centralized data
  const totalMilestones = milestones.length;
  
  // Update the completion criteria to match the logic in MilestoneFooter component
  const completedMilestones = milestones.filter(m => 
    m.status === 'Selesai' || m.uploadedDocs >= m.requiredDocs
  ).length;
  
  const inProgressMilestones = milestones.filter(m => 
    (m.status === 'Pada Jadwal' || m.status === 'Terlambat') && 
    m.uploadedDocs > 0
  ).length;
  
  const pendingDocuments = documents.length;
  const documentsUploaded = milestones.reduce((total, milestone) => total + milestone.uploadedDocs, 0);
  const totalRequiredDocs = milestones.reduce((total, milestone) => total + milestone.requiredDocs, 0);

  // Check if daily report has been submitted today
  const todayReportSubmitted = activities.some(activity => 
    activity.action.includes('Laporan harian') && 
    activity.time.includes('jam lalu')
  );

  // Alternative check using the reports data
  const today = currentDate || new Date();
  const todayFormatted = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  const reportSubmittedToday = dailyReports.some(report => 
    report.date === todayFormatted && 
    (report.status === 'approved' || report.status === 'in-review')
  );

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
      value: todayReportSubmitted || reportSubmittedToday ? 'Terkirim' : 'Belum Dibuat',
      description: 'Status laporan hari ini',
      icon: React.createElement(ClipboardList, { className: "h-5 w-5" }),
      color: (todayReportSubmitted || reportSubmittedToday) ? 'success' : 'warning'
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
      value: (todayReportSubmitted || reportSubmittedToday) ? '✓' : '✗',
      icon: React.createElement(ClipboardList, { className: "h-4 w-4" }),
      color: (todayReportSubmitted || reportSubmittedToday) ? 'success' : 'warning'
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
  // Filter milestones by project
  const projectMilestones = milestones.filter(m => m.projectId === projectId);
  const totalMilestones = projectMilestones.length;
  const completedMilestones = projectMilestones.filter(m => 
    m.status === 'Selesai' || m.uploadedDocs >= m.requiredDocs
  ).length;
  
  // Filter documents by project
  const projectDocuments = documents.filter(d => d.projectId === projectId);
  const totalDocuments = projectDocuments.length;
  
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
      total: totalDocuments,
      uploaded: projectDocuments.length, // Assuming all documents in the array are uploaded
      pending: 0 // This would need to be calculated based on required docs
    },
    reports: {
      total: totalReports,
      approved: approvedReports,
      approvalRate: totalReports > 0 ? Math.round((approvedReports / totalReports) * 100) : 0
    }
  };
};