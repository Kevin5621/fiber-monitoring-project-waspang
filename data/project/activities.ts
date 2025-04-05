import { ActivityProps } from '@/components/dashboard/types';

export interface ProjectActivity {
  id: number;
  action: string;
  time: string;
  project: string;
  projectId: number;
  user?: string;
}

export const getActivities = (): ActivityProps['activity'][] => {
  return activities.map(activity => ({
    action: activity.action,
    time: activity.time,
    project: activity.project
  }));
};

// Centralized activities data
export const activities: ProjectActivity[] = [
  { 
    id: 1,
    action: 'Upload foto pemasangan', 
    time: '2 jam lalu', 
    project: 'Fiber Optik Kemang',
    projectId: 3,
    user: 'Bambang Kusumo'
  },
  { 
    id: 2,
    action: 'Laporan harian dikirim', 
    time: 'Kemarin, 16:32', 
    project: 'Fiber Optik Sudirman',
    projectId: 1,
    user: 'Ahmad Rizal'
  },
  { 
    id: 3,
    action: 'Milestone selesai', 
    time: 'Kemarin, 10:15', 
    project: 'Fiber Optik Menteng',
    projectId: 5,
    user: 'Siti Nuraini'
  },
  { 
    id: 4,
    action: 'Dokumen baru ditambahkan', 
    time: '3 jam lalu', 
    project: 'Fiber Optik Tebet',
    projectId: 2,
    user: 'Dewi Putri'
  },
  { 
    id: 5,
    action: 'Perubahan jadwal milestone', 
    time: '5 jam lalu', 
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    user: 'Budi Santoso'
  }
];

// Helper function to get activities by project ID
export const getActivitiesByProjectId = (projectId: number) => {
  return activities.filter(activity => activity.projectId === projectId);
};