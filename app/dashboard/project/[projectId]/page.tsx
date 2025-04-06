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
  Check, 
  AlertCircle, 
  Download,
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
import { PaginationControl } from '@/components/features/common/pagination-control';

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

  // Pagination states for different sections
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(8);
  const [documentsPage, setDocumentsPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(8);
  const [photosPage, setPhotosPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(8);

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
  
  // Pagination calculations for reports
  const reportsStartIndex = (reportsPage - 1) * reportsPerPage;
  const reportsEndIndex = Math.min(reportsStartIndex + reportsPerPage - 1, filteredReports.length - 1);
  const reportsTotalPages = Math.ceil(filteredReports.length / reportsPerPage);
  
  // Pagination calculations for documents
  const documentsStartIndex = (documentsPage - 1) * documentsPerPage;
  const documentsEndIndex = Math.min(documentsStartIndex + documentsPerPage - 1, filteredDocuments.length - 1);
  const documentsTotalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const paginatedDocuments = filteredDocuments.slice(documentsStartIndex, documentsStartIndex + documentsPerPage);

  return (
    <div className="container mx-auto p-4 sm:p-6 relative">
      {/* Back Button and Project Title */}
      <div className="flex items-center mb-6">
        <Link href="/dashboard/project" className="mr-4 p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold">{project.name}</h2>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Ekspor
          </Button>
        </div>
      </div>

      {/* Project Overview Card */}
      <Card className="mb-6 overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Project Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-4">
                {getStatusBadge(project.status)}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Lokasi:</span> {project.location}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">{project.description}</p>
              
              <div className="bg-background/80 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progres Keseluruhan</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2 mb-3" />
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold">{projectMilestones.length}</div>
                    <div className="text-xs text-muted-foreground mt-1">Total Milestone</div>
                  </div>
                  <div className="text-center p-3 bg-success-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{projectMilestones.filter(m => m.status === 'Selesai').length}</div>
                    <div className="text-xs text-muted-foreground mt-1">Selesai</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').length}</div>
                    <div className="text-xs text-muted-foreground mt-1">Sedang Berjalan</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Team Info */}
            <div className="bg-background/80 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-base font-medium mb-4">Tim Proyek</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.pm}</p>
                    <p className="text-xs text-muted-foreground">Project Manager</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-success-100 flex items-center justify-center text-green-600 mr-3">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.waspang}</p>
                    <p className="text-xs text-muted-foreground">Pengawas Lapangan</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{team.admin}</p>
                    <p className="text-xs text-muted-foreground">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={handleTabChange}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="milestones">Milestone</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
            <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            {activeTab !== 'overview' && (
              <div className="relative w-full md:w-56">
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
          </div>
        </div>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Milestone Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').slice(0, 2).map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'Selesai' ? 'bg-success-100' : 
                        milestone.status === 'Pada Jadwal' ? 'bg-info-100' : 
                        milestone.status === 'Terlambat' ? 'bg-amber-100' :
                        'bg-muted/50-100'
                      }`}>
                        {getStatusIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium">{milestone.name}</h3>
                          <div>{getStatusBadge(milestone.status)}</div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Tenggat: {milestone.deadline}</div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{milestone.progress || 0}%</span>
                          </div>
                          <Progress value={milestone.progress || 0} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('milestones')}>
                    Lihat Semua Milestone
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectReports.slice(0, 2).map((report) => (
                    <div key={report.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{report.title}</h3>
                          <div className="text-sm text-muted-foreground mt-1">{report.date}</div>
                        </div>
                        <div>{getStatusBadge(report.status)}</div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {report.activities[0]}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('reports')}>
                    Lihat Semua Laporan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredMilestones.length > 0 ? (
                  filteredMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'Selesai' ? 'bg-success-100' : 
                        milestone.status === 'Pada Jadwal' ? 'bg-info-100' : 
                        milestone.status === 'Terlambat' ? 'bg-amber-100' :
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Milestone</DropdownMenuItem>
                                <DropdownMenuItem>Update Progress</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Upload Dokumentasi</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                          
                          {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 ? (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {milestone.requiredPhotos
                                  .slice((photosPage - 1) * photosPerPage, (photosPage - 1) * photosPerPage + photosPerPage)
                                  .map((photo, idx) => (
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
                              
                              {milestone.requiredPhotos.length > photosPerPage && (
                                <div className="mt-3">
                                  <PaginationControl
                                    currentPage={photosPage}
                                    totalPages={Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                    itemsPerPage={photosPerPage}
                                    totalItems={milestone.requiredPhotos.length}
                                    startIndex={(photosPage - 1) * photosPerPage}
                                    endIndex={Math.min((photosPage - 1) * photosPerPage + photosPerPage - 1, milestone.requiredPhotos.length - 1)}
                                    canGoBack={photosPage > 1}
                                    canGoForward={photosPage < Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                    onPageChange={setPhotosPage}
                                    onItemsPerPageChange={setPhotosPerPage}
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada dokumentasi foto yang diperlukan</p>
                          )}
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
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
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
                        <div className="bg-muted/30 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            Aktivitas
                          </h4>
                          <ul className="text-sm space-y-1">
                            {report.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-muted/30 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                            Kendala
                          </h4>
                          <ul className="text-sm space-y-1">
                            {report.issues && report.issues.length > 0 ? (
                              report.issues.map((issue, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                                  <span>{issue}</span>
                                </li>
                              ))
                            ) : (
                              <li className="text-muted-foreground">Tidak ada kendala</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded-md">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                          Rencana Selanjutnya
                        </h4>
                        <p className="text-sm">{report.nextPlan}</p>
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
                
                {filteredReports.length > 0 && (
                  <PaginationControl
                    currentPage={reportsPage}
                    totalPages={reportsTotalPages}
                    itemsPerPage={reportsPerPage}
                    totalItems={filteredReports.length}
                    startIndex={reportsStartIndex}
                    endIndex={reportsEndIndex}
                    canGoBack={reportsPage > 1}
                    canGoForward={reportsPage < reportsTotalPages}
                    onPageChange={setReportsPage}
                    onItemsPerPageChange={setReportsPerPage}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="documentation">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {paginatedDocuments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {paginatedDocuments.map((doc) => (
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
                
                {filteredDocuments.length > 0 && (
                  <PaginationControl
                    currentPage={documentsPage}
                    totalPages={documentsTotalPages}
                    itemsPerPage={documentsPerPage}
                    totalItems={filteredDocuments.length}
                    startIndex={documentsStartIndex}
                    endIndex={documentsEndIndex}
                    canGoBack={documentsPage > 1}
                    canGoForward={documentsPage < documentsTotalPages}
                    onPageChange={setDocumentsPage}
                    onItemsPerPageChange={setDocumentsPerPage}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6">
                {filteredMilestones.length > 0 ? (
                  filteredMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'Selesai' ? 'bg-success-100' : 
                        milestone.status === 'Pada Jadwal' ? 'bg-info-100' : 
                        milestone.status === 'Terlambat' ? 'bg-amber-100' :
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit Milestone</DropdownMenuItem>
                                <DropdownMenuItem>Update Progress</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Upload Dokumentasi</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
                          
                          {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 ? (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {milestone.requiredPhotos
                                  .slice((photosPage - 1) * photosPerPage, (photosPage - 1) * photosPerPage + photosPerPage)
                                  .map((photo, idx) => (
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
                              
                              {milestone.requiredPhotos.length > photosPerPage && (
                                <div className="mt-3">
                                  <PaginationControl
                                    currentPage={photosPage}
                                    totalPages={Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                    itemsPerPage={photosPerPage}
                                    totalItems={milestone.requiredPhotos.length}
                                    startIndex={(photosPage - 1) * photosPerPage}
                                    endIndex={Math.min((photosPage - 1) * photosPerPage + photosPerPage - 1, milestone.requiredPhotos.length - 1)}
                                    canGoBack={photosPage > 1}
                                    canGoForward={photosPage < Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                    onPageChange={setPhotosPage}
                                    onItemsPerPageChange={setPhotosPerPage}
                                  />
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada dokumentasi foto yang diperlukan</p>
                          )}
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
      </Tabs>
    </div>
  );
};

export default ProjectDetailPage;