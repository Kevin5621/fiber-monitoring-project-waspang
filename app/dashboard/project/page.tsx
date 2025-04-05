"use client"

import React, { useState } from 'react';
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
import { projects } from '@/data/project/projects';
import { milestones } from '@/data/project/milestones';
import { dailyReports } from '@/data/project/reports';

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('milestones');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter projects based on status and search query
  const filteredProjects = projects
    .filter(project => filterStatus === 'all' || project.status === filterStatus)
    .filter(project => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.location.toLowerCase().includes(query)
      );
    });

  // Get the latest milestones (top 5)
  const latestMilestones = [...milestones]
    .sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
    .slice(0, 5);

  // Get the latest daily reports (top 5)
  const latestReports = [...dailyReports]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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

  // Determine active navigation item based on path
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Format date for calendar display
  const formatCalendarDate = (dateString: string) => {
    const parts = dateString.split(' ');
    return {
      day: parts[0],
      month: parts[1].substring(0, 3).toUpperCase()
    };
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                  {latestMilestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-5 pb-5 border-b border-border last:border-0 last:pb-0">
                      <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        milestone.status === 'Selesai' 
                          ? 'bg-success-100' 
                          : milestone.status === 'Pada Jadwal' || milestone.status === 'Terlambat'
                            ? 'bg-info-100' 
                            : 'bg-muted/50-100'
                      }`}>
                        {milestone.status === 'Selesai' ? (
                          <Check className="h-4 w-4 text-green-600" />
                        ) : milestone.status === 'Pada Jadwal' || milestone.status === 'Terlambat' ? (
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
                            <div>{milestone.progress || 0}%</div>
                          </div>
                          <Progress value={milestone.progress || 0} className="h-1.5" />
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
                  {latestReports.map((report) => {
                    const dateObj = formatCalendarDate(report.date);
                    return (
                      <div key={report.id} className="flex items-start gap-5 pb-5 border-b border-border last:border-0 last:pb-0">
                        <div className="flex-shrink-0 w-16 h-16 bg-muted/50 rounded-md flex flex-col items-center justify-center">
                          <span className="text-xs text-muted-foreground">{dateObj.month}</span>
                          <span className="text-xl font-bold">{dateObj.day}</span>
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
                              <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {report.title}
                              </div>
                            </div>
                            {getStatusBadge(report.status)}
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
                    );
                  })}
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