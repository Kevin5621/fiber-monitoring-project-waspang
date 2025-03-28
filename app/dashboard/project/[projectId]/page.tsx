"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  MapPin, 
  MoreHorizontal, 
  UserCircle, 
  Plus, 
  Check, 
  AlertCircle, 
  Download,
  Upload,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectDetailPage = () => {
  const params = useParams();
  const projectId = params.projectId;
  const [activeTab, setActiveTab] = useState('overview');

  // Sample project data
  const project = {
    id: 1,
    name: 'Instalasi Fiber Optik Sudirman',
    location: 'Jl. Jendral Sudirman, Jakarta Pusat',
    startDate: '10 Mar 2025',
    endDate: '15 Apr 2025',
    status: 'in-progress',
    progress: 68,
    description: 'Proyek pemasangan jaringan fiber optik di sepanjang Jalan Sudirman dengan total panjang kabel 2.5 km dan 15 titik penggalian.',
    pm: 'Budi Santoso',
    admin: 'Dewi Putri',
    waspang: 'Ahmad Rizal'
  };

  // Sample milestones data
  const milestones = [
    { 
      id: 1, 
      name: 'Persiapan Alat dan Material',
      deadline: '15 Mar 2025',
      completedDate: '14 Mar 2025',
      status: 'completed',
      progress: 100,
      assignee: 'Ahmad Rizal'
    },
    { 
      id: 2, 
      name: 'Penggalian Jalur Kabel',
      deadline: '20 Mar 2025',
      completedDate: '19 Mar 2025',
      status: 'completed',
      progress: 100,
      assignee: 'Tim Penggalian' 
    },
    { 
      id: 3, 
      name: 'Pemasangan Kabel Feeder',
      deadline: '25 Mar 2025',
      completedDate: null,
      status: 'in-progress',
      progress: 75,
      assignee: 'Tim Instalasi'
    },
    { 
      id: 4, 
      name: 'Pemasangan ODP',
      deadline: '01 Apr 2025',
      completedDate: null,
      status: 'in-progress',
      progress: 40,
      assignee: 'Tim Instalasi'
    },
    { 
      id: 5, 
      name: 'Testing dan Commissioning',
      deadline: '10 Apr 2025',
      completedDate: null,
      status: 'not-started',
      progress: 0,
      assignee: 'Tim Teknikal'
    }
  ];

  // Sample reports data
  const reports = [
    {
      id: 1,
      date: '20 Mar 2025',
      submittedBy: 'Ahmad Rizal',
      status: 'completed',
      activities: [
        'Pemasangan kabel feeder 350m dari OLT ke ODP-01',
        'Konfigurasi junction box di 3 titik',
        'Setup peralatan instalasi untuk hari berikutnya'
      ],
      materials: [
        { name: 'Kabel Fiber 24 Core', quantity: '350m' },
        { name: 'Junction Box', quantity: '3 pcs' },
        { name: 'Klem Kabel', quantity: '15 pcs' }
      ],
      issues: 'Sempat terjadi keterlambatan material selama 30 menit'
    },
    {
      id: 2,
      date: '19 Mar 2025',
      submittedBy: 'Ahmad Rizal',
      status: 'completed',
      activities: [
        'Penggalian selesai untuk seluruh jalur 2.5km',
        'Pemasangan pipa pelindung di area perempatan',
        'Koordinasi dengan petugas lalin untuk pengaturan jalan'
      ],
      materials: [
        { name: 'Pipa HDPE', quantity: '50m' },
        { name: 'Pasir', quantity: '2 truk' }
      ],
      issues: 'Hujan deras sempat menghambat pekerjaan selama 2 jam'
    }
  ];

  // Sample documents data
  const documents = [
    {
      id: 1,
      name: 'Foto Penggalian.jpg',
      type: 'image',
      date: '19 Mar 2025',
      uploadedBy: 'Ahmad Rizal',
      size: '2.5 MB'
    },
    {
      id: 2,
      name: 'Laporan Progres Minggu 1.pdf',
      type: 'document',
      date: '17 Mar 2025',
      uploadedBy: 'Budi Santoso',
      size: '1.2 MB'
    },
    {
      id: 3,
      name: 'Foto Pemasangan Kabel.jpg',
      type: 'image',
      date: '20 Mar 2025',
      uploadedBy: 'Ahmad Rizal',
      size: '3.1 MB'
    },
    {
      id: 4,
      name: 'Berita Acara Pertemuan.docx',
      type: 'document',
      date: '15 Mar 2025',
      uploadedBy: 'Dewi Putri',
      size: '850 KB'
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'not-started':
        return <Badge variant="outline" className="bg-muted/50-100 text-gray-800 hover:bg-muted/50-100">Belum Dimulai</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-info-100 text-blue-800 hover:bg-info-100">Sedang Berjalan</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-success-100 text-green-800 hover:bg-success-100">Selesai</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title and Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/project" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
            <p className="text-muted-foreground">{project.location}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Ekspor
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                Tambah Milestone
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Buat Laporan Harian
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Upload className="mr-2 h-4 w-4" />
                Upload Dokumentasi
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                {getStatusBadge(project.status)}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{project.description}</p>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progres Keseluruhan</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 mb-1" />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Tim Proyek</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.pm}</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center text-green-600 mr-3">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.waspang}</p>
                    <p className="text-xs text-muted-foreground">Pengawas Lapangan</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{project.admin}</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="milestones">Milestone</TabsTrigger>
            <TabsTrigger value="reports">Laporan Harian</TabsTrigger>
            <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            {activeTab !== 'overview' && (
              <div className="relative w-56">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Cari ${activeTab === 'milestones' ? 'milestone' : activeTab === 'reports' ? 'laporan' : 'dokumen'}...`}
                  className="pl-8"
                />
              </div>
            )}
            
            {activeTab === 'milestones' && (
              <Button size="sm">
                <Plus className="mr-2 h-3.5 w-3.5" />
                Tambah Milestone
              </Button>
            )}
            
            {activeTab === 'reports' && (
              <Button size="sm">
                <Plus className="mr-2 h-3.5 w-3.5" />
                Buat Laporan
              </Button>
            )}
            
            {activeTab === 'documentation' && (
              <Button size="sm">
                <Upload className="mr-2 h-3.5 w-3.5" />
                Upload Dokumen
              </Button>
            )}
          </div>
        </div>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center space-x-2 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-4xl font-bold">{milestones.filter(m => m.status === 'completed').length}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">Selesai</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-4xl font-bold">{milestones.filter(m => m.status === 'in-progress').length}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">Sedang Berjalan</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Milestone Berikutnya</h4>
                  {milestones.filter(m => m.status === 'in-progress').slice(0, 1).map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{milestone.name}</div>
                        <div className="text-sm text-muted-foreground">Tenggat: {milestone.deadline}</div>
                      </div>
                      <div>{milestone.progress}%</div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Link 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); setActiveTab('milestones'); }}
                      className="text-sm text-primary hover:underline"
                    >
                      Lihat semua milestone
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 2).map((report) => (
                    <div key={report.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">Laporan Harian</div>
                        <div className="text-sm text-muted-foreground">{report.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {report.activities[0]}
                      </p>
                      <Link 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('reports'); }}
                        className="text-xs text-primary hover:underline"
                      >
                        Lihat detail
                      </Link>
                    </div>
                  ))}
                  
                  {documents.slice(0, 2).map((doc) => (
                    <div key={doc.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">Dokumentasi Baru</div>
                        <div className="text-sm text-muted-foreground">{doc.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {doc.name} ({doc.size})
                      </p>
                      <Link 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); setActiveTab('documentation'); }}
                        className="text-xs text-primary hover:underline"
                      >
                        Lihat dokumen
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.status === 'completed' ? 'bg-success-100' : 
                      milestone.status === 'in-progress' ? 'bg-info-100' : 
                      'bg-muted/50-100'
                    }`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-base font-medium">{milestone.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <div className="text-sm text-muted-foreground">
                              Tenggat: {milestone.deadline}
                            </div>
                            {milestone.completedDate && (
                              <div className="text-sm text-muted-foreground">
                                Selesai: {milestone.completedDate}
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              PIC: {milestone.assignee}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(milestone.status)}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                {reports.map((report) => (
                  <div key={report.id} className="pb-8 border-b border-border last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">Laporan Harian - {report.date}</h3>
                          <Badge className="bg-success-100 text-green-800 hover:bg-success-100">
                            Selesai
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Disubmit oleh: {report.submittedBy}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Unduh Laporan
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Aktivitas</h4>
                        <ul className="space-y-2">
                          {report.activities.map((activity, idx) => (
                            <li key={idx} className="text-sm flex gap-2">
                              <span className="text-muted-foreground">•</span>
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Material Terpakai</h4>
                        <ul className="space-y-2">
                          {report.materials.map((material, idx) => (
                            <li key={idx} className="text-sm flex justify-between">
                              <span>{material.name}</span>
                              <span className="text-muted-foreground">{material.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {report.issues && (
                      <div>
                        <h4 className="text-sm font-medium mb-2">Kendala</h4>
                        <p className="text-sm text-muted-foreground">{report.issues}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className={`h-32 bg-muted flex items-center justify-center ${doc.type === 'image' ? 'bg-info-50' : 'bg-warning-50'}`}>
                        {doc.type === 'image' ? (
                          <FileText className="h-12 w-12 text-blue-400" />
                        ) : (
                          <FileText className="h-12 w-12 text-amber-400" />
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm truncate" title={doc.name}>{doc.name}</h3>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>{doc.date}</span>
                          <span>{doc.size}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-xs text-muted-foreground">
                            {doc.uploadedBy}
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Download className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;