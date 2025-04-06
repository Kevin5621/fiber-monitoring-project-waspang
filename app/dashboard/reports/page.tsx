"use client"

import React, { useState } from 'react';
import { Calendar, Check, ClipboardList, Clock, FileText, MoreHorizontal, Plus, Search, AlertCircle, CalendarIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { dailyReports } from '@/data/project/reports';
import { projects } from '@/data/project/projects';
import { usePagination } from '@/hooks/usePagination';
import { PaginationControl } from '@/components/features/common/pagination-control';

const ReportsPage = () => {
  const [filterProject, setFilterProject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  
  // Use centralized data from reports.ts
  const reports = dailyReports;

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

  // Use the pagination hook
  const pagination = usePagination({
    totalItems: filteredReports.length,
    initialItemsPerPage: 5,
    initialPage: 1
  });
  
  // Get paginated reports
  const paginatedReports = pagination.paginatedItems(filteredReports);

  // Menghitung laporan berdasarkan status
  const approvedCount = reports.filter(r => r.status === 'approved').length;
  const inReviewCount = reports.filter(r => r.status === 'in-review').length;
  const rejectedCount = reports.filter(r => r.status === 'rejected').length;
  const draftCount = reports.filter(r => r.status === 'draft').length;
  
  // Fungsi untuk menampilkan badge status
  const getStatusBadge = (status: string) => {
    switch(status) {
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
    <div className="container mx-auto p-4 sm:p-6 relative">
      {/* Status Overview - Simplified without progress bars */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium mb-1">Total Laporan</h3>
            <span className="text-3xl font-bold">{reports.length}</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium mb-1">Disetujui</h3>
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedCount}</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium mb-1">Dalam Peninjauan</h3>
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{inReviewCount}</span>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <h3 className="text-sm font-medium mb-1">Ditolak</h3>
            <span className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Report Views */}
      <Card className="shadow-sm mb-8">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="grid grid-cols-5 rounded-lg bg-muted/60">
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
            <TabsContent value={activeTab} className="space-y-6 pt-4">
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="w-full max-w-[400px] mb-6 bg-background border">
                  <TabsTrigger value="list" className="flex-1 data-[state=active]:bg-muted">
                    <ClipboardList className="mr-2 h-4 w-4" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-muted">
                    <Calendar className="mr-2 h-4 w-4" />
                    Timeline
                  </TabsTrigger>
                </TabsList>
                
                {/* List View */}
                <TabsContent value="list" className="space-y-4">
                  <div>
                    <div className="space-y-4">
                      {paginatedReports.length > 0 ? (
                        <>
                          {paginatedReports.map((report) => (
                            <div key={report.id} className="flex flex-col border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md">
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
                                    {report.issues.length > 0 ? (
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
                                
                                <div className="bg-muted/30 p-3 rounded-md">
                                  <h4 className="text-sm font-medium mb-2 flex items-center">
                                    <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                                    Rencana Selanjutnya
                                  </h4>
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
                          ))}
                          
                          <PaginationControl
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            itemsPerPage={pagination.itemsPerPage}
                            totalItems={filteredReports.length}
                            startIndex={pagination.startIndex}
                            endIndex={pagination.endIndex}
                            canGoBack={pagination.canGoBack}
                            canGoForward={pagination.canGoForward}
                            onPageChange={pagination.setCurrentPage}
                            onItemsPerPageChange={pagination.setItemsPerPage}
                            itemsPerPageOptions={[5, 10, 20, 50]}
                          />
                        </>
                      ) : (
                        <div className="text-center py-12 bg-muted/20 rounded-lg">
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
                  </div>
                </TabsContent>
                
                {/* Timeline View */}
                <TabsContent value="timeline" className="space-y-4">
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
                              <div key={report.id} className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors shadow-sm hover:shadow-md">
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
                    <div className="text-center py-12 bg-muted/20 rounded-lg">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Tidak ada laporan ditemukan</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Tidak ada laporan yang sesuai dengan filter yang dipilih. Coba ubah filter atau buat laporan baru.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-10"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ReportsPage;