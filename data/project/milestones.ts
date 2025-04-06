import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { MilestoneProps } from '@/components/features/dashboard/types';
import { documents } from './documents';

export interface ProjectMilestone {
  id: number;
  name: string;
  project: string;
  projectId: number;
  deadline: string;
  startDate: string;
  status: 'Belum Dimulai' | 'Pada Jadwal' | 'Terlambat' | 'Selesai';
  icon: React.ReactElement;
  requiredDocs: number;
  uploadedDocs: number;
  documents: any[];
  progress?: number;
  requiredPhotos: {
    name: string;
    uploaded: boolean;
  }[];
}

export const getMilestones = (currentDate: Date): MilestoneProps['milestone'][] => {
  return milestones.map(milestone => ({
    id: milestone.id,
    name: milestone.name,
    project: milestone.project,
    deadline: milestone.deadline,
    startDate: milestone.startDate,
    status: milestone.status,
    icon: milestone.icon,
    requiredDocs: milestone.requiredDocs,
    uploadedDocs: milestone.uploadedDocs,
    documents: milestone.documents,
    requiredPhotos: milestone.requiredPhotos
  }));
};

// Centralized milestones data
export const milestones: ProjectMilestone[] = [
  {
    id: 1,
    name: 'Persiapan Alat',
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    deadline: '25 Mar 2025',
    startDate: '20 Mar 2025',
    status: 'Pada Jadwal',
    icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
    requiredDocs: 2,
    uploadedDocs: 2,
    documents: documents.filter(doc => doc.name.includes('Persiapan Alat')),
    progress: 100,
    requiredPhotos: [
      { name: 'Foto Alat 1', uploaded: true },
      { name: 'Foto Alat 2', uploaded: true },
      { name: 'Foto Lokasi Persiapan', uploaded: true }
    ]
  },
  { 
    id: 2,
    name: 'Pemasangan Kabel', 
    project: 'Fiber Optik Tebet', 
    projectId: 2,
    deadline: '28 Mar 2025',
    startDate: '20 Mar 2025',
    status: 'Terlambat',
    icon: React.createElement(AlertCircle, { className: "h-4 w-4" }),
    requiredDocs: 3,
    uploadedDocs: 1,
    documents: documents.filter(doc => doc.name.includes('Pemasangan Kabel')),
    progress: 40,
    requiredPhotos: [
      { name: 'Foto Galian 1', uploaded: true },
      { name: 'Foto Galian 2', uploaded: false },
      { name: 'Foto Penarikan Kabel', uploaded: true },
      { name: 'Foto Sambungan', uploaded: false }
    ]
  },
  { 
    id: 3,
    name: 'Dokumentasi Penutupan', 
    project: 'Fiber Optik Kemang', 
    projectId: 3,
    deadline: '01 Apr 2025',
    startDate: '26 Mar 2025',
    status: 'Pada Jadwal',
    icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
    requiredDocs: 2,
    uploadedDocs: 1,
    documents: documents.filter(doc => doc.name.includes('Penutupan')),
    progress: 50,
    requiredPhotos: [
      { name: 'Foto Penutupan Galian 1', uploaded: true },
      { name: 'Foto Penutupan Galian 2', uploaded: false },
      { name: 'Foto Hasil Akhir', uploaded: false }
    ]
  },
  {
    id: 4,
    name: 'Survey Lokasi',
    project: 'Fiber Optik Tebet',
    projectId: 2,
    deadline: '25 Mar 2025',
    startDate: '22 Mar 2025',
    status: 'Selesai',
    icon: React.createElement(CheckCircle, { className: "h-4 w-4" }),
    requiredDocs: 2,
    uploadedDocs: 2,
    documents: documents.filter(doc => doc.name.includes('Survey')),
    progress: 100,
    requiredPhotos: [
      { name: 'Foto Lokasi 1', uploaded: true },
      { name: 'Foto Lokasi 2', uploaded: true },
      { name: 'Foto Pengukuran', uploaded: true }
    ]
  },
  {
    id: 5,
    name: 'Instalasi ODP',
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    deadline: '02 Apr 2025',
    startDate: '30 Mar 2025',
    status: 'Belum Dimulai',
    icon: React.createElement(Clock, { className: "h-4 w-4" }),
    requiredDocs: 3,
    uploadedDocs: 0,
    documents: [],
    progress: 0,
    requiredPhotos: [
      { name: 'Foto ODP 1', uploaded: false },
      { name: 'Foto ODP 2', uploaded: false },
      { name: 'Foto Pemasangan ODP', uploaded: false },
      { name: 'Foto Hasil Instalasi', uploaded: false }
    ]
  }
];

// Helper function to get milestones by project ID
export const getMilestonesByProjectId = (projectId: number) => {
  return milestones.filter(milestone => milestone.projectId === projectId);
};

// Helper function to get milestone by ID
export const getMilestoneById = (milestoneId: number) => {
  return milestones.find(milestone => milestone.id === milestoneId);
};