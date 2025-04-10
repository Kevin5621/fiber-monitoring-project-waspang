import { DocumentProps } from '@/components/features/pages/dashboard/types';

// Define a more comprehensive document type that includes all needed fields
export interface ProjectDocument {
  id: number;
  name: string;
  project: string;
  projectId: number;
  type: 'document' | 'image';
  category: string;
  fileType: string;
  size: string;
  uploadedBy: string;
  uploadDate: Date;
  description: string;
}

export const getDocuments = (currentDate: Date): DocumentProps['doc'][] => {
  return documents.map(doc => ({
    name: doc.name,
    project: doc.project,
  }));
};

// Centralized document data
export const documents: ProjectDocument[] = [
  { 
    id: 1, 
    name: 'Foto Pemasangan Kabel', 
    project: 'Fiber Optik Tebet', 
    projectId: 2,
    type: 'image',
    category: 'Dokumentasi',
    fileType: 'JPG', 
    size: '3.2 MB',
    uploadedBy: 'Ahmad Rizal',
    uploadDate: new Date('2025-0)3-18'),
    description: 'Dokumentasi proses pemasangan kabel fiber optik di area Tebet'
  },
  { 
    id: 2, 
    name: 'Foto Label Kabel', 
    project: 'Fiber Optik Sudirman', 
    projectId: 1,
    type: 'image',
    category: 'Dokumentasi',
    fileType: 'JPG', 
    size: '2.8 MB',
    uploadedBy: 'Dewi Putri',
    uploadDate: new Date('20 Mar 2025'),
    description: 'Foto pelabelan kabel fiber optik di junction box Sudirman'
  },
  { 
    id: 3, 
    name: 'Foto Penutupan Galian', 
    project: 'Fiber Optik Kemang', 
    projectId: 3,
    type: 'image',
    category: 'Dokumentasi',
    fileType: 'JPG', 
    size: '4.1 MB',
    uploadedBy: 'Bambang Kusumo',
    uploadDate: new Date('22 Mar 2025'),
    description: 'Dokumentasi proses penutupan galian kabel di area Kemang'
  },
  { 
    id: 4, 
    name: 'Foto Survey Lokasi 1', 
    project: 'Fiber Optik Tebet', 
    projectId: 2,
    type: 'image',
    category: 'Survey',
    fileType: 'JPG', 
    size: '2.5 MB',
    uploadedBy: 'Ahmad Rizal',
    uploadDate: new Date('15 Mar 2025'),
    description: 'Foto survey lokasi pemasangan fiber optik di Tebet bagian utara'
  },
  { 
    id: 5, 
    name: 'Foto Survey Lokasi 2', 
    project: 'Fiber Optik Tebet', 
    projectId: 2,
    type: 'image',
    category: 'Survey',
    fileType: 'JPG', 
    size: '2.7 MB',
    uploadedBy: 'Ahmad Rizal',
    uploadDate: new Date('15 Mar 2025'),
    description: 'Foto survey lokasi pemasangan fiber optik di Tebet bagian selatan'
  },
  { 
    id: 6, 
    name: 'Foto Persiapan Alat 1', 
    project: 'Fiber Optik Jl. Sudirman', 
    projectId: 1,
    type: 'image',
    category: 'Persiapan',
    fileType: 'JPG', 
    size: '3.0 MB',
    uploadedBy: 'Rudi Hartono',
    uploadDate: new Date('12 Mar 2025'),
    description: 'Dokumentasi persiapan peralatan untuk instalasi fiber optik di Sudirman'
  },
  { 
    id: 7, 
    name: 'Foto Persiapan Alat 2', 
    project: 'Fiber Optik Jl. Sudirman', 
    projectId: 1,
    type: 'image',
    category: 'Persiapan',
    fileType: 'JPG', 
    size: '2.9 MB',
    uploadedBy: 'Rudi Hartono',
    uploadDate: new Date('12 Mar 2025'),
    description: 'Dokumentasi persiapan material untuk instalasi fiber optik di Sudirman'
  },
  { 
    id: 8, 
    name: 'Site Survey Report.pdf',
    project: 'Fiber Optik Jl. Sudirman', 
    projectId: 1,
    type: 'document',
    category: 'Survey',
    fileType: 'PDF', 
    size: '2.4 MB',
    uploadedBy: 'Ahmad Rizal',
    uploadDate: new Date('12 Mar 2025'), 
    description: 'Laporan hasil survey lokasi pemasangan fiber optik di Jl. Sudirman'
  },
  { 
    id: 9, 
    name: 'Material List.xlsx',
    project: 'Fiber Optik Jl. Sudirman', 
    projectId: 1,
    type: 'document',
    category: 'Perencanaan',
    fileType: 'Excel', 
    size: '1.7 MB',
    uploadedBy: 'Budi Santoso',
    uploadDate: new Date('14 Mar 2025'), 
    description: 'Daftar material yang dibutuhkan untuk proyek fiber optik'
  },
  { 
    id: 10, 
    name: 'Network Diagram.pdf',
    project: 'Fiber Optik Jl. Sudirman', 
    projectId: 1,
    type: 'document',
    category: 'Teknikal',
    fileType: 'PDF', 
    size: '4.2 MB',
    uploadedBy: 'Rudi Hartono',
    uploadDate: new Date('16 Mar 2025'), 
    description: 'Diagram jaringan fiber optik di Jl. Sudirman'
  },
  { 
    id: 11, 
    name: 'Implementation Plan.docx',
    project: 'Fiber Optik Tebet', 
    projectId: 2,
    type: 'document',
    category: 'Perencanaan',
    fileType: 'Word', 
    size: '1.5 MB',
    uploadedBy: 'Ahmad Rizal',
    uploadDate: new Date('10 Mar 2025'), 
    description: 'Rencana implementasi proyek fiber optik di Tebet'
  },
  { 
    id: 12, 
    name: 'MoM Kick-off Meeting.pdf',
    project: 'Fiber Optik Kemang', 
    projectId: 3,
    type: 'document',
    category: 'Administrasi',
    fileType: 'PDF', 
    size: '1.1 MB',
    uploadedBy: 'Siti Nuraini',
    uploadDate: new Date('05 Mar 2025'), 
    description: 'Notulensi rapat kick-off proyek fiber optik di Kemang'
  },
  { 
    id: 13, 
    name: 'Quality Check Report.pdf',
    project: 'Fiber Optik Kemang', 
    projectId: 3,
    type: 'document',
    category: 'QC',
    fileType: 'PDF', 
    size: '3.5 MB',
    uploadedBy: 'Bambang Kusumo',
    uploadDate: new Date('22 Mar 2025'), 
    description: 'Laporan hasil pemeriksaan kualitas pemasangan fiber optik di Kemang'
  }
];