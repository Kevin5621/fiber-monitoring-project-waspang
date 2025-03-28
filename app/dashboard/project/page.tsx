"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, FileText, Filter, MapPin, MoreHorizontal, Plus, Search, Check, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('milestones');
  
  const projects = [
    {
      id: 1,
      name: 'Instalasi Fiber Optik Sudirman',
      location: 'Jl. Jendral Sudirman, Jakarta Pusat',
      startDate: '10 Mar 2025',
      endDate: '15 Apr 2025',
      status: 'in-progress',
      progress: 68,
      milestones: 5,
      completedMilestones: 3,
      pendingDocuments: 2
    },
    {
      id: 2,
      name: 'Pemasangan Jaringan Fiber Tebet',
      location: 'Jl. Tebet Raya, Jakarta Selatan',
      startDate: '15 Mar 2025',
      endDate: '20 Apr 2025',
      status: 'in-progress',
      progress: 45,
      milestones: 4,
      completedMilestones: 1,
      pendingDocuments: 3
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
      pendingDocuments: 0
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
      pendingDocuments: 0
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
      pendingDocuments: 0
    }
  ];

  // Data milestone
  const milestones = [
    { 
      id: 1, 
      name: 'Persiapan Alat', 
      project: 'Fiber Optik Jl. Sudirman',
      projectId: 1,
      deadline: '25 Mar 2025',
      status: 'in-progress',
      progress: 80
    },
    { 
      id: 2, 
      name: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet',
      projectId: 2,
      deadline: '28 Mar 2025',
      status: 'in-progress',
      progress: 45 
    },
    { 
      id: 3, 
      name: 'Dokumentasi Penutupan', 
      project: 'Fiber Optik Kemang',
      projectId: 3,
      deadline: '01 Apr 2025',
      status: 'in-progress',
      progress: 20 
    },
    { 
      id: 4, 
      name: 'Penyelesaian Jaringan', 
      project: 'Fiber Optik Jl. Sudirman',
      projectId: 1,
      deadline: '10 Apr 2025',
      status: 'not-started',
      progress: 0
    },
    { 
      id: 5, 
      name: 'Testing Koneksi', 
      project: 'Fiber Optik Tebet',
      projectId: 2,
      deadline: '05 Apr 2025',
      status: 'not-started',
      progress: 0
    }
  ];

  // Data laporan harian
  const dailyReports = [
    {
      id: 1,
      date: '22 Mar 2025',
      project: 'Fiber Optik Jl. Sudirman',
      projectId: 1,
      status: 'completed',
      highlights: 'Pemasangan 500m kabel fiber, 3 titik junction box'
    },
    {
      id: 2,
      date: '21 Mar 2025',
      project: 'Fiber Optik Tebet',
      projectId: 2,
      status: 'completed',
      highlights: 'Penggalian 200m jalur kabel, persiapan pemasangan'
    },
    {
      id: 3,
      date: '20 Mar 2025',
      project: 'Fiber Optik Kemang',
      projectId: 3,
      status: 'completed',
      highlights: 'Survey lokasi dan penandaan titik penggalian'
    },
    {
      id: 4,
      date: '19 Mar 2025',
      project: 'Fiber Optik Jl. Sudirman',
      projectId: 1,
      status: 'completed',
      highlights: 'Pemasangan 450m kabel fiber, konfigurasi 2 ODP'
    },
    {
      id: 5,
      date: '18 Mar 2025',
      project: 'Fiber Optik Tebet',
      projectId: 2,
      status: 'completed',
      highlights: 'Pengecekan material dan koordinasi dengan tim lapangan'
    }
  ];

  const filteredProjects = filterStatus === 'all' 
    ? projects 
    : projects.filter(project => project.status === filterStatus);

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

  // Determine active navigation item based on path
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Proyek</h2>
          <p className="text-muted-foreground">Kelola semua proyek fiber optik</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Proyek Baru
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Cari proyek..."
            className="pl-8"
          />
        </div>
        
        <div className="w-full sm:w-40">
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="not-started">Belum Dimulai</SelectItem>
              <SelectItem value="in-progress">Sedang Berjalan</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold line-clamp-2">{project.name}</h3>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">{project.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-5">
                <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progres</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-muted/50 rounded p-3">
                  <div className="text-xs text-muted-foreground mb-1">Milestone</div>
                  <div className="text-lg font-semibold">{project.completedMilestones}/{project.milestones}</div>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <div className="text-xs text-muted-foreground mb-1">Dok. Tertunda</div>
                  <div className="text-lg font-semibold">{project.pendingDocuments}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                {getStatusBadge(project.status)}
                <Link 
                  href={`/dashboard/project/${project.id}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Lihat Detail
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <Card className="py-8">
          <div className="text-center">
            <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <CardTitle className="mb-2">Tidak ada proyek ditemukan</CardTitle>
            <p className="text-muted-foreground">Tidak ada proyek yang sesuai dengan filter yang dipilih</p>
          </div>
        </Card>
      )}

      {/* Tabs untuk Milestone dan Laporan Harian */}
      <div className="mt-12 pt-6 border-t border-border">
        <Tabs defaultValue="milestones" className="w-full" onValueChange={handleTabChange}>
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="milestones">Milestone</TabsTrigger>
              <TabsTrigger value="reports">Laporan Harian</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-3.5 w-3.5" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-3.5 w-3.5" />
                {activeTab === 'milestones' ? 'Tambah Milestone' : 'Buat Laporan'}
              </Button>
            </div>
          </div>
          
          <TabsContent value="milestones">
            <Card>
              <CardHeader>
                <CardTitle>Milestone Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-5 pb-5 border-b border-border last:border-0 last:pb-0">
                      <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'completed' 
                          ? 'bg-success-100' 
                          : milestone.status === 'in-progress' 
                            ? 'bg-info-100' 
                            : 'bg-muted/50-100'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : milestone.status === 'in-progress' ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-base">{milestone.name}</h4>
                            <Link 
                              href={`/dashboard/project/${milestone.projectId}`} 
                              className="text-sm text-muted-foreground hover:underline"
                            >
                              {milestone.project}
                            </Link>
                          </div>
                          <div className="text-sm text-muted-foreground whitespace-nowrap ml-2">{milestone.deadline}</div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div>{getStatusBadge(milestone.status)}</div>
                            <div>{milestone.progress}%</div>
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
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Laporan Harian Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {dailyReports.map((report) => (
                    <div key={report.id} className="flex items-start gap-5 pb-5 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-shrink-0 w-16 h-16 bg-muted/50 rounded-md flex flex-col items-center justify-center">
                        <span className="text-xs text-muted-foreground">MAR</span>
                        <span className="text-xl font-bold">{report.date.split(' ')[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <Link 
                              href={`/dashboard/project/${report.projectId}`} 
                              className="font-medium text-base hover:underline"
                            >
                              {report.project}
                            </Link>
                            <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{report.highlights}</div>
                          </div>
                          <Badge className="ml-2 bg-success-100 text-green-800 hover:bg-success-100">
                            Selesai
                          </Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-2 h-3.5 w-3.5" />
                            Lihat Detail
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectsPage;