"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  FileText, 
  MoreHorizontal, 
  UserCircle, 
  Plus, 
  Check, 
  AlertCircle, 
  Download,
  Upload,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { projects } from '@/data/project/projects';
import { milestones } from '@/data/project/milestones';
import { dailyReports } from '@/data/project/reports';
import { documents } from '@/data/project/documents';
import { activities } from '@/data/project/activities';

const ProjectDetailPage = () => {
  const params = useParams();
  const projectId = Number(params.projectId);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Get project data from centralized data
  const project = projects.find(p => p.id === projectId) || {
    id: 0,
    name: 'Project Not Found',
    location: 'Unknown',
    startDate: '-',
    endDate: '-',
    status: 'not-started' as const,
    progress: 0,
    milestones: 0,
    completedMilestones: 0,
    pendingDocuments: 0,
    description: 'Project not found in the database.'
  };

  // Get project milestones from centralized data
  const projectMilestones = milestones.filter(m => m.projectId === projectId);
  
  // Get project reports from centralized data
  const projectReports = dailyReports.filter(r => r.projectId === projectId);
  
  // Get project documents from centralized data
  const projectDocuments = documents.filter(d => d.projectId === projectId);
  
  // Get project activities from centralized data
  const projectActivities = activities.filter(a => a.projectId === projectId);

  // Sample team data (this would come from a users database in a real app)
  const team = {
    pm: 'Budi Santoso',
    admin: 'Dewi Putri',
    waspang: 'Ahmad Rizal'
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchQuery('');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'not-started':
      case 'Belum Dimulai':
        return <Badge variant="outline" className="bg-muted/50-100 text-gray-800 hover:bg-muted/50-100">Belum Dimulai</Badge>;
      case 'in-progress':
      case 'Pada Jadwal':
      case 'Terlambat':
        return <Badge variant="outline" className="bg-info-100 text-blue-800 hover:bg-info-100">Sedang Berjalan</Badge>;
      case 'completed':
      case 'Selesai':
        return <Badge variant="outline" className="bg-success-100 text-green-800 hover:bg-success-100">Selesai</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-success-100 text-green-800 hover:bg-success-100">Disetujui</Badge>;
      case 'in-review':
        return <Badge variant="outline" className="bg-info-100 text-blue-800 hover:bg-info-100">Dalam Peninjauan</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Ditolak</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-muted/50-100 text-gray-800 hover:bg-muted/50-100">Draft</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
      case 'Selesai':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'in-progress':
      case 'Pada Jadwal':
      case 'Terlambat':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filter items based on search query
  const filteredMilestones = projectMilestones.filter(milestone => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return milestone.name.toLowerCase().includes(query);
  });

  const filteredReports = projectReports.filter(report => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      report.title.toLowerCase().includes(query) ||
      report.activities.some(activity => activity.toLowerCase().includes(query))
    );
  });

  const filteredDocuments = projectDocuments.filter(doc => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query);
  });

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
                    <p className="text-sm font-medium">{team.pm}</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center text-green-600 mr-3">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.waspang}</p>
                    <p className="text-xs text-muted-foreground">Pengawas Lapangan</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <UserCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.admin}</p>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                      <div className="text-4xl font-bold">{projectMilestones.filter(m => m.status === 'Selesai').length}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">Selesai</div>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-4xl font-bold">{projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').length}</div>
                      <div className="text-sm font-medium text-muted-foreground mt-1">Sedang Berjalan</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3">Milestone Berikutnya</h4>
                  {projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').slice(0, 1).map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{milestone.name}</div>
                        <div className="text-sm text-muted-foreground">Tenggat: {milestone.deadline}</div>
                      </div>
                      <div>{milestone.progress || 0}%</div>
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
                  {projectReports.slice(0, 2).map((report) => (
                    <div key={report.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">Laporan Harian</div>
                        <div className="text-sm text-muted-foreground">{report.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {report.title}
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
                  
                  {projectDocuments.slice(0, 2).map((doc) => (
                    <div key={doc.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-1">
                        <div className="font-medium">Dokumentasi Baru</div>
                        <div className="text-sm text-muted-foreground">{doc.uploadDate}</div>
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
                {filteredMilestones.length > 0 ? (
                  filteredMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'Selesai' ? 'bg-success-100' : 
                        milestone.status === 'Pada Jadwal' || milestone.status === 'Terlambat' ? 'bg-info-100' : 
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
                              <div className="text-sm text-muted-foreground">
                                Mulai: {milestone.startDate}
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
                            <span>{milestone.progress || 0}%</span>
                          </div>
                          <Progress value={milestone.progress || 0} className="h-1.5" />
                        </div>
                      
                        {/* Photo Requirements Section */}
                        <div className="mt-4 pt-3 border-t border-border">
                          <h4 className="text-sm font-medium mb-2">Dokumentasi Foto</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {milestone.requiredPhotos && milestone.requiredPhotos.map((photo, idx) => (
                              <div 
                                key={idx} 
                                className={`text-xs p-2 rounded-md flex items-center gap-2 ${
                                  photo.uploaded ? 'bg-success-50 text-green-700' : 'bg-muted/30 text-muted-foreground'
                                }`}
                              >
                                {photo.uploaded ? (
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                                <span>{photo.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada milestone ditemukan</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Tidak ada milestone yang sesuai dengan pencarian Anda.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="pb-8 border-b border-border last:border-0 last:pb-0">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">{report.title}</h3>
                            {getStatusBadge(report.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Disubmit oleh: {report.submittedBy} pada {report.date} ({report.submittedAt})
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
                          <h4 className="text-sm font-medium mb-2">Kendala</h4>
                          <ul className="space-y-2">
                            {report.issues && report.issues.length > 0 ? (
                              report.issues.map((issue, idx) => (
                                <li key={idx} className="text-sm flex gap-2">
                                  <span className="text-muted-foreground">•</span>
                                  <span>{issue}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-sm text-muted-foreground">Tidak ada kendala</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Rencana Selanjutnya</h4>
                        <p className="text-sm text-muted-foreground">{report.nextPlan}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada laporan ditemukan</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Tidak ada laporan yang sesuai dengan pencarian Anda.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredDocuments.map((doc) => (
                      <div key={doc.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                        <div className={`h-32 bg-muted flex items-center justify-center ${doc.type === 'image' ? 'bg-info-50' : 'bg-warning-50'}`}>
                          <FileText className={`h-12 w-12 ${doc.type === 'image' ? 'text-blue-400' : 'text-amber-400'}`} />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm truncate" title={doc.name}>{doc.name}</h3>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{doc.uploadDate}</span>
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
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada dokumen ditemukan</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Tidak ada dokumen yang sesuai dengan pencarian Anda.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;