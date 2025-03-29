import { Clock, FileText, Folder, CheckCircle, AlertCircle } from 'lucide-react';
import React from 'react';
import { StatProps, PriorityTaskProps, MilestoneProps, DocumentProps, ActivityProps } from '@/components/dashboard/types';

export const mockData = (currentDate: Date) => {
  const priorityTasks: PriorityTaskProps['task'][] = [
    { 
      title: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      progress: 45, 
      deadline: '3 hari tersisa', 
      badge: 'Tenggat Hari Ini', 
      badgeVariant: 'destructive' as const
    },
    { 
      title: 'Buat Laporan Harian', 
      project: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }), 
      badge: 'Segera', 
      badgeVariant: 'default' as const
    },
    { 
      title: 'Foto Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      badge: 'Dokumentasi', 
      badgeVariant: 'outline' as const
    }
  ];

  const stats: StatProps[] = [
    { 
      title: 'Proyek Aktif', 
      value: '3', 
      icon: React.createElement(Folder, { className: "h-5 w-5" }), 
      color: 'primary',
    },
    { 
      title: 'Milestone', 
      value: '2', 
      icon: React.createElement(Clock, { className: "h-5 w-5" }), 
      color: 'warning',
    },
    { 
      title: 'Dokumentasi Tertunda', 
      value: '5', 
      icon: React.createElement(FileText, { className: "h-5 w-5" }), 
      color: 'destructive',
    }
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
      progress: 100,
      status: 'Pada Jadwal',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" })
    },
    { 
      id: 2,
      name: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      deadline: '28 Mar 2025',
      startDate: '20 Mar 2025',
      progress: 70, 
      status: 'Terlambat',
      icon: React.createElement(AlertCircle, { className: "h-4 w-4" })
    },
    { 
      id: 3,
      name: 'Dokumentasi Penutupan', 
      project: 'Fiber Optik Kemang', 
      deadline: '01 Apr 2025',
      startDate: '26 Mar 2025',
      progress: 50,
      status: 'Pada Jadwal',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" })
    },
    {
      id: 4,
      name: 'Survey Lokasi',
      project: 'Fiber Optik Tebet',
      deadline: '25 Mar 2025',
      startDate: '22 Mar 2025',
      progress: 100,
      status: 'Selesai',
      icon: React.createElement(CheckCircle, { className: "h-4 w-4" })
    },
    {
      id: 5,
      name: 'Instalasi ODP',
      project: 'Fiber Optik Jl. Sudirman',
      deadline: '02 Apr 2025',
      startDate: '30 Mar 2025',
      progress: 0,
      status: 'Belum Dimulai',
      icon: React.createElement(Clock, { className: "h-4 w-4" })
    }
  ];

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
    { name: 'Foto Penutupan Galian', project: 'Fiber Optik Kemang', deadline: '01 Apr 2025' }
  ];

  const activities: ActivityProps['activity'][] = [
    { action: 'Upload foto pemasangan', time: '2 jam lalu', project: 'Fiber Optik Kemang' },
    { action: 'Laporan harian dikirim', time: 'Kemarin, 16:32', project: 'Fiber Optik Sudirman' },
    { action: 'Milestone selesai', time: 'Kemarin, 10:15', project: 'Fiber Optik Menteng' }
  ];

  return {
    priorityTasks,
    stats,
    milestones,
    documents,
    activities
  };
};