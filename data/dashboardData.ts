import { Clock, CheckCircle, AlertCircle, BarChart3, FileCheck, ClipboardList } from 'lucide-react';
import React from 'react';
import { MilestoneProps, DocumentProps, ActivityProps } from '@/components/dashboard/types';
import { StatProps } from '@/components/dashboard/StatCard';

// Add project location type
export type ProjectLocation = {
  id: number;
  projectId: string; // Format: FO-[CITY_CODE]-[NUMBER]
  name: string;
  location: string;
  status: 'Selesai' | 'Pada Jadwal' | 'Terlambat' | 'Belum Dimulai';
  position: [number, number]; // [latitude, longitude]
  isDocumented: boolean; // Boolean to indicate if project is documented
  category: 'backbone' | 'distribution' | 'access' | 'maintenance'; // Type of fiber installation
};

// Define project locations for fiber optic installations
const projectLocations: ProjectLocation[] = [
  {
    id: 1,
    projectId: "FO-JKT-001",
    name: "Fiber Optik Tebet",
    location: "Jakarta Selatan",
    status: "Pada Jadwal",
    position: [-6.2265, 106.8536], // Tebet, Jakarta
    isDocumented: true,
    category: 'distribution'
  },
  {
    id: 2,
    projectId: "FO-JKT-002",
    name: "Fiber Optik Sudirman",
    location: "Jakarta Pusat",
    status: "Pada Jadwal",
    position: [-6.2088, 106.8186], // Sudirman, Jakarta
    isDocumented: true,
    category: 'backbone'
  },
  {
    id: 3,
    projectId: "FO-JKT-003",
    name: "Fiber Optik Kemang",
    location: "Jakarta Selatan",
    status: "Terlambat",
    position: [-6.2601, 106.8130], // Kemang, Jakarta
    isDocumented: false,
    category: 'access'
  },
  {
    id: 4,
    projectId: "FO-JKT-004",
    name: "Fiber Optik Menteng",
    location: "Jakarta Pusat",
    status: "Selesai",
    position: [-6.1957, 106.8303], // Menteng, Jakarta
    isDocumented: true,
    category: 'backbone'
  },
  {
    id: 5,
    projectId: "FO-BDG-001",
    name: "Fiber Optik Dago",
    location: "Bandung",
    status: "Belum Dimulai",
    position: [-6.8915, 107.6107], // Dago, Bandung
    isDocumented: false,
    category: 'distribution'
  },
  {
    id: 6,
    projectId: "FO-BDG-002",
    name: "Fiber Optik Pasteur",
    location: "Bandung",
    status: "Pada Jadwal",
    position: [-6.8969, 107.5961], // Pasteur, Bandung
    isDocumented: true,
    category: 'access'
  },
  {
    id: 7,
    projectId: "FO-SMG-001",
    name: "Fiber Optik Simpang Lima",
    location: "Semarang",
    status: "Pada Jadwal",
    position: [-6.9932, 110.4203], // Simpang Lima, Semarang
    isDocumented: false,
    category: 'maintenance'
  },
  {
    id: 8,
    projectId: "FO-SBY-001",
    name: "Fiber Optik Tunjungan",
    location: "Surabaya",
    status: "Selesai",
    position: [-7.2575, 112.7381], // Tunjungan, Surabaya
    isDocumented: true,
    category: 'backbone'
  },
];

export const mockData = (currentDate: Date) => {

  const documents: DocumentProps['doc'][] = [
    { 
      name: 'Foto Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      deadline: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) 
    },
    { name: 'Foto Label Kabel', project: 'Fiber Optik Sudirman', deadline: '30 Mar 2025' },
    { name: 'Foto Penutupan Galian', project: 'Fiber Optik Kemang', deadline: '01 Apr 2025' },
    { name: 'Foto Survey Lokasi 1', project: 'Fiber Optik Tebet', deadline: '25 Mar 2025' },
    { name: 'Foto Survey Lokasi 2', project: 'Fiber Optik Tebet', deadline: '25 Mar 2025' },
    { name: 'Foto Persiapan Alat 1', project: 'Fiber Optik Jl. Sudirman', deadline: '22 Mar 2025' },
    { name: 'Foto Persiapan Alat 2', project: 'Fiber Optik Jl. Sudirman', deadline: '22 Mar 2025' },
  ];

  const milestones: MilestoneProps['milestone'][] = [
    {
      id: 1,
      name: 'Persiapan Alat',
      project: 'Fiber Optik Jl. Sudirman',
      deadline: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      startDate: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: 'Pada Jadwal',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
      requiredDocs: 2,
      uploadedDocs: 2,
      documents: documents.filter(doc => doc.name.includes('Persiapan Alat'))
    },
    { 
      id: 2,
      name: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      deadline: '28 Mar 2025',
      startDate: '20 Mar 2025',
      status: 'Terlambat',
      icon: React.createElement(AlertCircle, { className: "h-4 w-4" }),
      requiredDocs: 3,
      uploadedDocs: 1,
      documents: documents.filter(doc => doc.name.includes('Pemasangan Kabel'))
    },
    { 
      id: 3,
      name: 'Dokumentasi Penutupan', 
      project: 'Fiber Optik Kemang', 
      deadline: '01 Apr 2025',
      startDate: '26 Mar 2025',
      status: 'Pada Jadwal',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
      requiredDocs: 2,
      uploadedDocs: 1,
      documents: documents.filter(doc => doc.name.includes('Penutupan'))
    },
    {
      id: 4,
      name: 'Survey Lokasi',
      project: 'Fiber Optik Tebet',
      deadline: '25 Mar 2025',
      startDate: '22 Mar 2025',
      status: 'Selesai',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
      requiredDocs: 2,
      uploadedDocs: 2,
      documents: documents.filter(doc => doc.name.includes('Survey'))
    },
    {
      id: 5,
      name: 'Instalasi ODP',
      project: 'Fiber Optik Jl. Sudirman',
      deadline: '02 Apr 2025',
      startDate: '30 Mar 2025',
      status: 'Belum Dimulai',
      icon: React.createElement(Clock, { className: "h-4 w-4" }),
      requiredDocs: 3,
      uploadedDocs: 0,
      documents: []
    }
  ];

  const activities: ActivityProps['activity'][] = [
    { action: 'Upload foto pemasangan', time: '2 jam lalu', project: 'Fiber Optik Kemang' },
    { action: 'Laporan harian dikirim', time: 'Kemarin, 16:32', project: 'Fiber Optik Sudirman' },
    { action: 'Milestone selesai', time: 'Kemarin, 10:15', project: 'Fiber Optik Menteng' }
  ];

  // Calculate stats based on the data
  const totalMilestones = milestones.length;
  // Update the completion criteria to match the logic in MilestoneFooter component
  const completedMilestones = milestones.filter(m => 
    m.status === 'Selesai' || m.uploadedDocs >= m.requiredDocs
  ).length;
  const inProgressMilestones = milestones.filter(m => 
    (m.status === 'Pada Jadwal' || m.status === 'Terlambat') && 
    m.uploadedDocs
  ).length;
  
  const pendingDocuments = documents.length;
  const documentsUploaded = milestones.reduce((total, milestone) => total + milestone.uploadedDocs, 0);
  const totalRequiredDocs = milestones.reduce((total, milestone) => total + milestone.requiredDocs, 0);

  // Check if daily report has been submitted today
  const todayReportSubmitted = activities.some(activity => 
    activity.action.includes('Laporan harian') && 
    activity.time.includes('jam lalu')
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
      value: todayReportSubmitted ? 'Terkirim' : 'Belum Dibuat',
      description: 'Status laporan hari ini',
      icon: React.createElement(ClipboardList, { className: "h-5 w-5" }),
      color: todayReportSubmitted ? 'success' : 'warning'
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
      value: todayReportSubmitted ? '✓' : '✗',
      icon: React.createElement(ClipboardList, { className: "h-4 w-4" }),
      color: todayReportSubmitted ? 'success' : 'warning'
    },
    {
      title: 'Dokumen',
      value: `${documentsUploaded}/${totalRequiredDocs}`,
      icon: React.createElement(FileCheck, { className: "h-4 w-4" }),
      color: 'warning'
    }
  ];

  return {
    stats,
    mobileStats,
    milestones,
    documents,
    activities,
    projectLocations
  };
};