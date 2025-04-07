export interface DailyReport {
  id: number;
  title: string;
  project: string;
  projectId: number;
  submittedBy: string;
  submittedAt: Date;
  status: 'draft' | 'in-review' | 'approved' | 'rejected';
  progress: number;
  activities: string[];
  issues: string[];
  nextPlan: string;
  materials?: { name: string; quantity: string }[];
  photos?: { 
    id: string; 
    url: string; 
    type: 'equipment' | 'process' | 'result' | 'location'; 
    caption: string 
  }[];
}

// Centralized daily reports data
export const dailyReports: DailyReport[] = [
  { 
    id: 1, 
    title: 'Laporan Harian - Penggalian Jalur Kabel',
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    submittedBy: 'Ahmad Rizal',
    submittedAt: new Date('2025-03-15T19:30:00'),
    status: 'approved',
    progress: 100,
    activities: [
      'Penggalian jalur kabel sepanjang 500m',
      'Pemasangan pipa pelindung kabel',
      'Koordinasi dengan Dinas PUPR'
    ],
    issues: [
      'Terkendala hujan selama 2 jam',
      'Terdapat jalur pipa PDAM yang tidak sesuai peta'
    ],
    nextPlan: 'Melanjutkan penggalian sampai Jl. Thamrin'
  },
  { 
    id: 2, 
    title: 'Laporan Harian - Penarikan Kabel',
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    submittedBy: 'Ahmad Rizal',
    submittedAt: new Date('2025-03-16T18:45:00'),
    status: 'approved',
    progress: 100,
    activities: [
      'Penarikan kabel fiber optik sepanjang 300m',
      'Penyambungan kabel di distribution point',
      'Pengujian awal transmisi'
    ],
    issues: [
      'Keterlambatan pengiriman konektor'
    ],
    nextPlan: 'Melanjutkan penarikan kabel sampai titik akhir'
  },
  { 
    id: 3, 
    title: 'Laporan Harian - Terminasi Kabel',
    project: 'Fiber Optik Jl. Sudirman',
    projectId: 1,
    submittedBy: 'Rudi Hartono',
    submittedAt: new Date('2025-03-16T18:20:10'),
    status: 'in-review',
    progress: 80,
    activities: [
      'Terminasi kabel di ODP',
      'Instalasi splitter',
      'Pengujian koneksi'
    ],
    issues: [
      'Beberapa konektor rusak dan perlu diganti'
    ],
    nextPlan: 'Pengujian menyeluruh dan perapihan instalasi'
  },
  { 
    id: 4, 
    title: 'Laporan Harian - Penggalian',
    project: 'Fiber Optik Tebet',
    projectId: 2,
    submittedBy: 'Dewi Putri',
    submittedAt: new Date('2025-03-16T18:19:15'),
    status: 'approved',
    progress: 100,
    activities: [
      'Penggalian jalur kabel sepanjang 400m',
      'Pemasangan pipa pelindung'
    ],
    issues: [
      'Terkendala izin warga setempat'
    ],
    nextPlan: 'Melanjutkan penggalian ke area berikutnya'
  },
  { 
    id: 5, 
    title: 'Laporan Harian - Instalasi ODP',
    project: 'Fiber Optik Tebet',
    projectId: 2,
    submittedBy: 'Bambang Kusumo',
    submittedAt: new Date('2025-03-16T18:17:30'),
    status: 'in-review',
    progress: 85,
    activities: [
      'Instalasi 5 unit ODP',
      'Perapihan kabel di tiang'
    ],
    issues: [
      'Terdapat 1 unit ODP yang rusak'
    ],
    nextPlan: 'Penggantian ODP yang rusak dan pengujian'
  },
  { 
    id: 6, 
    title: 'Laporan Harian - Survey Lokasi',
    project: 'Fiber Optik Kemang',
    projectId: 3,
    submittedBy: 'Ahmad Rizal',
    submittedAt: new Date('2025-03-16T18:16:45'),
    status: 'approved',
    progress: 100,
    activities: [
      'Survey lokasi pemasangan',
      'Pengukuran jarak dan plotting titik ODP',
      'Koordinasi dengan RT/RW setempat'
    ],
    issues: [
      'Beberapa titik perlu diubah karena medan sulit'
    ],
    nextPlan: 'Finalisasi desain jaringan'
  },
  { 
    id: 7, 
    title: 'Laporan Harian - Perapihan Kabel',
    project: 'Fiber Optik Kemang',
    projectId: 3,
    submittedBy: 'Siti Nuraini',
    submittedAt: new Date('2025-03-16T18:18:00'),
    status: 'rejected',
    progress: 30,
    activities: [
      'Perapihan kabel di tiang',
      'Pelabelan kabel'
    ],
    issues: [
      'Banyak kabel lama yang tidak teridentifikasi',
      'Kurangnya tenaga kerja'
    ],
    nextPlan: 'Melanjutkan perapihan dan pelabelan kabel'
  },
  { 
    id: 8, 
    title: 'Laporan Harian - Testing',
    project: 'Fiber Optik Kemang',
    projectId: 3,
    submittedBy: 'Bambang Kusumo',
    submittedAt: new Date('2025-03-16T18:19:45'),
    status: 'draft',
    progress: 20,
    activities: [
      'Pengujian kualitas transmisi',
      'Pengukuran loss pada sambungan'
    ],
    issues: [
      'Beberapa titik memiliki loss yang tinggi'
    ],
    nextPlan: 'Perbaikan sambungan dengan loss tinggi'
  }
];

// Helper function to get reports by project ID
export const getReportsByProjectId = (projectId: number) => {
  return dailyReports.filter(report => report.projectId === projectId);
};

// Helper function to get report by ID
export const getReportById = (reportId: number) => {
  return dailyReports.find(report => report.id === reportId);
};

// Helper function to calculate report statistics
export const calculateReportStats = () => {
  const totalReports = dailyReports.length;
  const approvedReports = dailyReports.filter(r => r.status === 'approved').length;
  const inReviewReports = dailyReports.filter(r => r.status === 'in-review').length;
  const rejectedReports = dailyReports.filter(r => r.status === 'rejected').length;
  const draftReports = dailyReports.filter(r => r.status === 'draft').length;
  
  return {
    totalReports,
    approvedReports,
    inReviewReports,
    rejectedReports,
    draftReports,
    approvalRate: Math.round((approvedReports / totalReports) * 100)
  };
};