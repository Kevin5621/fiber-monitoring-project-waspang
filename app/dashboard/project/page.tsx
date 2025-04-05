"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, FileText, MapPin, MoreHorizontal, Plus, Search } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
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
import { projects } from '@/data/project/projects';

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('reports');
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

  // Get the latest daily reports (top 5)

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

  // Format date for calendar display

  return (
    <div className="container mx-auto p-4 sm:p-6 relative">
      <div className="space-y-6">
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
      </div>

      {/* Floating Action Button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ProjectsPage;