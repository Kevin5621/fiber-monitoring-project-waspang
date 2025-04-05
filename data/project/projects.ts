import { documents } from './documents';
import { projectLocations } from './locations';

export interface Project {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;
  milestones: number;
  completedMilestones: number;
  pendingDocuments: number;
  description?: string;
}

// Centralized projects data
export const projects: Project[] = [
  {
    id: 1,
    name: 'Fiber Optik Jl. Sudirman',
    location: 'Jl. Jendral Sudirman, Jakarta Pusat',
    startDate: '10 Mar 2025',
    endDate: '15 Apr 2025',
    status: 'in-progress',
    progress: 68,
    milestones: 5,
    completedMilestones: 3,
    pendingDocuments: 2,
    description: 'Proyek pemasangan jaringan fiber optik di sepanjang Jl. Sudirman untuk meningkatkan konektivitas area bisnis.'
  },
  {
    id: 2,
    name: 'Fiber Optik Tebet',
    location: 'Jl. Tebet Raya, Jakarta Selatan',
    startDate: '15 Mar 2025',
    endDate: '20 Apr 2025',
    status: 'in-progress',
    progress: 45,
    milestones: 4,
    completedMilestones: 1,
    pendingDocuments: 3,
    description: 'Instalasi jaringan fiber optik di area Tebet untuk meningkatkan layanan internet perumahan dan perkantoran.'
  },
  {
    id: 3,
    name: 'Fiber Optik Kemang',
    location: 'Jl. Kemang Raya, Jakarta Selatan',
    startDate: '5 Mar 2025',
    endDate: '10 Apr 2025',
    status: 'in-progress',
    progress: 20,
    milestones: 6,
    completedMilestones: 1,
    pendingDocuments: 0,
    description: 'Pengembangan jaringan fiber optik di kawasan Kemang untuk mendukung kebutuhan internet kecepatan tinggi.'
  },
  {
    id: 4,
    name: 'Instalasi Fiber BSD',
    location: 'BSD City, Tangerang Selatan',
    startDate: '1 Feb 2025',
    endDate: '25 Feb 2025',
    status: 'completed',
    progress: 100,
    milestones: 4,
    completedMilestones: 4,
    pendingDocuments: 0,
    description: 'Proyek pemasangan jaringan fiber optik di kawasan BSD City yang telah selesai dilaksanakan.'
  },
  {
    id: 5,
    name: 'Jaringan Fiber Menteng',
    location: 'Menteng, Jakarta Pusat',
    startDate: '20 Feb 2025',
    endDate: '15 Mar 2025',
    status: 'completed',
    progress: 100,
    milestones: 5,
    completedMilestones: 5,
    pendingDocuments: 0,
    description: 'Proyek instalasi jaringan fiber optik di kawasan premium Menteng yang telah selesai dilaksanakan.'
  }
];

// Helper function to get project by ID
export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Helper function to get documents by project ID
export const getDocumentsByProjectId = (projectId: number) => {
  return documents.filter(doc => doc.projectId === projectId);
};

// Helper function to get project locations
export const getProjectLocations = () => {
  return projectLocations;
};

// Helper function to calculate project statistics
export const calculateProjectStats = () => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const inProgressProjects = projects.filter(p => p.status === 'in-progress').length;
  const notStartedProjects = projects.filter(p => p.status === 'not-started').length;
  
  return {
    totalProjects,
    completedProjects,
    inProgressProjects,
    notStartedProjects,
    completionRate: Math.round((completedProjects / totalProjects) * 100)
  };
};