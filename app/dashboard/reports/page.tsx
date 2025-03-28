"use client"

import React, { useState } from 'react';
import { Calendar, Check, ClipboardList, Clock, FileText, Filter, MoreHorizontal, Plus, Search, AlertCircle, CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReportsPage = () => {
  const [filterProject, setFilterProject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Data laporan harian
  const reports = [
    { 
      id: 1, 
      title: 'Laporan Harian - Penggalian Jalur Kabel',
      project: 'Fiber Optik Jl. Sudirman',
      projectId: 1,
      date: '15 Mar 2025',
      submittedBy: 'Ahmad Rizal',
      submittedAt: '19:30',
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
      date: '16 Mar 2025',
      submittedBy: 'Ahmad Rizal',
      submittedAt: '18:45',
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
      date: '17 Mar 2025',
      submittedBy: 'Rudi Hartono',
      submittedAt: '20:10',
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
      date: '14 Mar 2025',
      submittedBy: 'Dewi Putri',
      submittedAt: '19:15',
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
      date: '16 Mar 2025',
      submittedBy: 'Bambang Kusumo',
      submittedAt: '17:30',
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
      date: '03 Mar 2025',
      submittedBy: 'Ahmad Rizal',
      submittedAt: '16:45',
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
      date: '19 Mar 2025',
      submittedBy: 'Siti Nuraini',
      submittedAt: '18:00',
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
      date: '22 Mar 2025',
      submittedBy: 'Bambang Kusumo',
      submittedAt: '19:45',
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

  // Data proyek untuk filter
  const projects = [
    { id: 1, name: 'Fiber Optik Jl. Sudirman' },
    { id: 2, name: 'Fiber Optik Tebet' },
    { id: 3, name: 'Fiber Optik Kemang' },
    { id: 4, name: 'Instalasi Fiber BSD' },
    { id: 5, name: 'Jaringan Fiber Menteng' }
  ];

  // Filter laporan berdasarkan tanggal, proyek, status, dan pencarian
  const filteredReports = reports
    .filter(report => {
      if (activeTab === 'all') return true;
      if (activeTab === 'approved') return report.status === 'approved';
      if (activeTab === 'pending') return report.status === 'in-review';
      if (activeTab === 'rejected') return report.status === 'rejected';
      if (activeTab === 'draft') return report.status === 'draft';
      return true;
    })
    .filter(report => filterProject === 'all' || report.projectId.toString() === filterProject)
    .filter(report => filterDate === null || report.date === filterDate)
    .filter(report => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        report.title.toLowerCase().includes(query) ||
        report.project.toLowerCase().includes(query) ||
        report.submittedBy.toLowerCase().includes(query) ||
        report.activities.some(act => act.toLowerCase().includes(query))
      );
    });

  // Menghitung laporan berdasarkan status
  const approvedCount = reports.filter(r => r.status === 'approved').length;
  const inReviewCount = reports.filter(r => r.status === 'in-review').length;
  const rejectedCount = reports.filter(r => r.status === 'rejected').length;
  const draftCount = reports.filter(r => r.status === 'draft').length;
  
  // Fungsi untuk menampilkan badge status
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Disetujui</Badge>;
      case 'in-review':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Dalam Peninjauan</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Ditolak</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      default:
        return null;
    }
  };

  // Mendapatkan initial untuk avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Mengelompokkan laporan berdasarkan tanggal untuk timeline view
  const reportsByDate = filteredReports.reduce<Record<string, typeof reports>>((acc, report) => {
    if (!acc[report.date]) {
      acc[report.date] = [];
    }
    acc[report.date].push(report);
    return acc;
  }, {});

  const dates = Object.keys(reportsByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Laporan Harian</h2>
          <p className="text-muted-foreground">Kelola dan pantau laporan kemajuan harian proyek</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Buat Laporan
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Total Laporan</h3>
              <span className="text-2xl font-bold">{reports.length}</span>
            </div>
            <Progress value={100} className="h-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Disetujui</h3>
              <span className="text-2xl font-bold">{approvedCount}</span>
            </div>
            <Progress value={approvedCount / reports.length * 100} className="h-2 bg-muted" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Dalam Peninjauan</h3>
              <span className="text-2xl font-bold">{inReviewCount}</span>
            </div>
            <Progress value={inReviewCount / reports.length * 100} className="h-2 bg-muted" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Ditolak</h3>
              <span className="text-2xl font-bold">{rejectedCount}</span>
            </div>
            <Progress value={rejectedCount / reports.length * 100} className="h-2 bg-muted" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Report Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="pending">Dalam Peninjauan</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select
              value={filterProject}
              onValueChange={(value) => setFilterProject(value)}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter Proyek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Proyek</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari laporan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <TabsContent value={activeTab} className="space-y-6">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="w-full max-w-[400px] mb-6">
              <TabsTrigger value="list" className="flex-1">
                <ClipboardList className="mr-2 h-4 w-4" />
                List
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1">
                <Calendar className="mr-2 h-4 w-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
            
            {/* List View */}
            <TabsContent value="list" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Laporan Harian</CardTitle>
                  <CardDescription>
                    Menampilkan {filteredReports.length} dari {reports.length} laporan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <div key={report.id} className="flex flex-col border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                            <div>
                              <h3 className="text-base font-medium">{report.title}</h3>
                              <Link 
                                href={`/dashboard/project/${report.projectId}`}
                                className="text-sm text-muted-foreground hover:underline"
                              >
                                {report.project}
                              </Link>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(report.status)}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Lihat Detail
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Check className="mr-2 h-4 w-4" />
                                    Setujui Laporan
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Histori Revisi
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Aktivitas</h4>
                              <ul className="text-sm space-y-1">
                                {report.activities.map((activity, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                                    <span>{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Kendala</h4>
                              <ul className="text-sm space-y-1">
                                {report.issues.length > 0 ? (
                                  report.issues.map((issue, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                                      <span>{issue}</span>
                                    </li>
                                  ))
                                ) : (
                                  <li className="text-muted-foreground">Tidak ada kendala</li>
                                )}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-2">Rencana Selanjutnya</h4>
                              <p className="text-sm">{report.nextPlan}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between mt-2 pt-3 border-t border-border text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarFallback>{getInitials(report.submittedBy)}</AvatarFallback>
                              </Avatar>
                              <span>{report.submittedBy}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="flex items-center">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                                {report.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                {report.submittedAt}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Tidak ada laporan ditemukan</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                          Tidak ada laporan yang sesuai dengan filter yang dipilih. Coba ubah filter atau buat laporan baru.
                        </p>
                        <Button className="mt-4">
                          <Plus className="mr-2 h-4 w-4" />
                          Buat Laporan
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Timeline View */}
            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Timeline Laporan</CardTitle>
                </CardHeader>
                <CardContent>
                  {dates.length > 0 ? (
                    <div className="relative pl-6 border-l border-border space-y-8">
                      {dates.map((date) => (
                        <div key={date} className="relative">
                          <div className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium">{date}</h3>
                            <p className="text-xs text-muted-foreground">
                              {reportsByDate[date].length} laporan
                            </p>
                          </div>
                          <div className="space-y-4">
                            {reportsByDate[date].map((report) => (
                              <div key={report.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                                  <div>
                                    <h3 className="text-base font-medium">{report.title}</h3>
                                    <Link 
                                      href={`/dashboard/project/${report.projectId}`}
                                      className="text-sm text-muted-foreground hover:underline"
                                    >
                                      {report.project}
                                    </Link>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getStatusBadge(report.status)}
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                                  <div className="flex items-center">
                                    <Avatar className="h-6 w-6 mr-2">
                                      <AvatarFallback>{getInitials(report.submittedBy)}</AvatarFallback>
                                    </Avatar>
                                    <span>{report.submittedBy}</span>
                                  </div>
                                  <span>{report.submittedAt}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Tidak ada laporan ditemukan</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Tidak ada laporan yang sesuai dengan filter yang dipilih. Coba ubah filter atau buat laporan baru.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage; 