"use client"

import React, { useState } from 'react';
import { File, FileText, FolderOpen, Image, MoreHorizontal, Plus, Search, Upload, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

const DocumentationPage = () => {
  const [filterProject, setFilterProject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Data proyek
  const projects = [
    { id: 1, name: 'Fiber Optik Jl. Sudirman' },
    { id: 2, name: 'Fiber Optik Tebet' },
    { id: 3, name: 'Fiber Optik Kemang' },
    { id: 4, name: 'Instalasi Fiber BSD' },
    { id: 5, name: 'Jaringan Fiber Menteng' }
  ];

  // Data dokumentasi (contoh)
  const documents = [
    { 
      id: 1, 
      name: 'Site Survey Report.pdf',
      project: 'Fiber Optik Jl. Sudirman', 
      projectId: 1,
      type: 'document',
      category: 'Survey',
      fileType: 'PDF', 
      size: '2.4 MB',
      uploadedBy: 'Ahmad Rizal',
      uploadDate: '12 Mar 2025', 
      description: 'Laporan hasil survey lokasi pemasangan fiber optik di Jl. Sudirman'
    },
    { 
      id: 2, 
      name: 'Material List.xlsx',
      project: 'Fiber Optik Jl. Sudirman', 
      projectId: 1,
      type: 'document',
      category: 'Perencanaan',
      fileType: 'Excel', 
      size: '1.7 MB',
      uploadedBy: 'Budi Santoso',
      uploadDate: '14 Mar 2025', 
      description: 'Daftar material yang dibutuhkan untuk proyek fiber optik'
    },
    { 
      id: 3, 
      name: 'Foto Lokasi Sudirman.jpg',
      project: 'Fiber Optik Jl. Sudirman', 
      projectId: 1,
      type: 'image',
      category: 'Dokumentasi',
      fileType: 'JPG', 
      size: '3.1 MB',
      uploadedBy: 'Dewi Putri',
      uploadDate: '15 Mar 2025', 
      description: 'Foto lokasi yang akan dipasang fiber optik di Jl. Sudirman'
    },
    { 
      id: 4, 
      name: 'Network Diagram.pdf',
      project: 'Fiber Optik Jl. Sudirman', 
      projectId: 1,
      type: 'document',
      category: 'Teknikal',
      fileType: 'PDF', 
      size: '4.2 MB',
      uploadedBy: 'Rudi Hartono',
      uploadDate: '16 Mar 2025', 
      description: 'Diagram jaringan fiber optik di Jl. Sudirman'
    },
    { 
      id: 5, 
      name: 'Implementation Plan.docx',
      project: 'Fiber Optik Tebet', 
      projectId: 2,
      type: 'document',
      category: 'Perencanaan',
      fileType: 'Word', 
      size: '1.5 MB',
      uploadedBy: 'Ahmad Rizal',
      uploadDate: '10 Mar 2025', 
      description: 'Rencana implementasi proyek fiber optik di Tebet'
    },
    { 
      id: 6, 
      name: 'Foto Galian Kabel.jpg',
      project: 'Fiber Optik Tebet', 
      projectId: 2,
      type: 'image',
      category: 'Dokumentasi',
      fileType: 'JPG', 
      size: '2.8 MB',
      uploadedBy: 'Dewi Putri',
      uploadDate: '17 Mar 2025', 
      description: 'Foto proses penggalian untuk jalur kabel fiber optik di Tebet'
    },
    { 
      id: 7, 
      name: 'MoM Kick-off Meeting.pdf',
      project: 'Fiber Optik Kemang', 
      projectId: 3,
      type: 'document',
      category: 'Administrasi',
      fileType: 'PDF', 
      size: '1.1 MB',
      uploadedBy: 'Siti Nuraini',
      uploadDate: '05 Mar 2025', 
      description: 'Notulensi rapat kick-off proyek fiber optik di Kemang'
    },
    { 
      id: 8, 
      name: 'Quality Check Report.pdf',
      project: 'Fiber Optik Kemang', 
      projectId: 3,
      type: 'document',
      category: 'QC',
      fileType: 'PDF', 
      size: '3.5 MB',
      uploadedBy: 'Bambang Kusumo',
      uploadDate: '22 Mar 2025', 
      description: 'Laporan hasil pemeriksaan kualitas pemasangan fiber optik di Kemang'
    }
  ];

  // Filter dokumen
  const filteredDocuments = documents
    .filter(doc => filterProject === 'all' || doc.projectId.toString() === filterProject)
    .filter(doc => filterType === 'all' || doc.type === filterType)
    .filter(doc => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        doc.name.toLowerCase().includes(query) ||
        doc.project.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query)
      );
    });

  // Menghitung jumlah dokumen per proyek
  const projectDocCounts = projects.map(project => {
    const count = documents.filter(doc => doc.projectId === project.id).length;
    return { ...project, docCount: count };
  });

  // Menghitung jumlah dokumen berdasarkan kategori
  const categories = Array.from(new Set(documents.map(doc => doc.category)));
  const categoryStats = categories.map(category => {
    const count = documents.filter(doc => doc.category === category).length;
    return { category, count };
  }).sort((a, b) => b.count - a.count);

  // Mendapatkan icon berdasarkan tipe file
  const getFileIcon = (fileType: string, type: string) => {
    if (type === 'image') return <Image className="h-6 w-6 text-blue-500" />;
    
    switch(fileType) {
      case 'PDF':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'Excel':
        return <FileText className="h-6 w-6 text-green-500" />;
      case 'Word':
        return <FileText className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dokumentasi</h2>
          <p className="text-muted-foreground">Kelola dan akses semua dokumentasi proyek</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Unggah Dokumen
        </Button>
      </div>

      {/* Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Dokumentasi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <span className="text-2xl font-bold">{documents.length}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {documents.filter(d => d.type === 'document').length} dokumen, {documents.filter(d => d.type === 'image').length} gambar
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Dokumentasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents
                .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                .slice(0, 2)
                .map(doc => (
                  <div key={doc.id} className="flex items-center">
                    {getFileIcon(doc.fileType, doc.type)}
                    <div className="ml-2">
                      <p className="text-sm font-medium line-clamp-1">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Kategori Teratas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {categoryStats.slice(0, 3).map(cat => (
                <div key={cat.category} className="flex justify-between items-center">
                  <span className="text-sm">{cat.category}</span>
                  <Badge variant="outline">{cat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Document Views */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="images">Foto</TabsTrigger>
          <TabsTrigger value="projects">Per Proyek</TabsTrigger>
        </TabsList>
        
        {/* All View */}
        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari dokumen..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full sm:w-60">
              <Select
                value={filterProject}
                onValueChange={(value) => setFilterProject(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter Proyek" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Proyek</SelectItem>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id.toString()}>{project.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-40">
              <Select
                value={filterType}
                onValueChange={(value) => setFilterType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="document">Dokumen</SelectItem>
                  <SelectItem value="image">Foto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle>Semua Dokumentasi</CardTitle>
              <CardDescription>
                Menampilkan {filteredDocuments.length} dari {documents.length} item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-start p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <div className="mr-4 mt-1">
                        {getFileIcon(doc.fileType, doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="text-base font-medium truncate">{doc.name}</h3>
                            <Link 
                              href={`/dashboard/project/${doc.projectId}`}
                              className="text-sm text-muted-foreground hover:underline"
                            >
                              {doc.project}
                            </Link>
                          </div>
                          <Badge variant="outline">
                            {doc.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-4 gap-y-1">
                          <span>Tipe: {doc.fileType}</span>
                          <span>Ukuran: {doc.size}</span>
                          <span>Diunggah: {doc.uploadDate}</span>
                          <span>Oleh: {doc.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="ml-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Unduh</DropdownMenuItem>
                            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Bagikan</DropdownMenuItem>
                            <DropdownMenuItem>Hapus</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada dokumen ditemukan</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                      Tidak ada dokumen yang sesuai dengan filter yang dipilih. Coba ubah filter atau unggah dokumen baru.
                    </p>
                    <Button className="mt-4">
                      <Upload className="mr-2 h-4 w-4" />
                      Unggah Dokumen
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document View */}
        <TabsContent value="documents" className="space-y-6">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari dokumen..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments
                  .filter(doc => doc.type === 'document')
                  .map((doc) => (
                    <div key={doc.id} className="flex items-start p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <div className="mr-4 mt-1">
                        {getFileIcon(doc.fileType, doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="text-base font-medium truncate">{doc.name}</h3>
                            <Link 
                              href={`/dashboard/project/${doc.projectId}`}
                              className="text-sm text-muted-foreground hover:underline"
                            >
                              {doc.project}
                            </Link>
                          </div>
                          <Badge variant="outline">
                            {doc.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{doc.description}</p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-4 gap-y-1">
                          <span>Tipe: {doc.fileType}</span>
                          <span>Ukuran: {doc.size}</span>
                          <span>Diunggah: {doc.uploadDate}</span>
                          <span>Oleh: {doc.uploadedBy}</span>
                        </div>
                      </div>
                      <div className="ml-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Unduh</DropdownMenuItem>
                            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Bagikan</DropdownMenuItem>
                            <DropdownMenuItem>Hapus</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Images View */}
        <TabsContent value="images" className="space-y-6">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari foto..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Image Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Galeri Foto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments
                  .filter(doc => doc.type === 'image')
                  .map((doc) => (
                    <div key={doc.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 bg-muted flex items-center justify-center">
                        <Image className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-1">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 mb-2">{doc.project}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{doc.uploadDate}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <MoreHorizontal className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Lihat Foto</DropdownMenuItem>
                              <DropdownMenuItem>Unduh</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Hapus</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects View */}
        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectDocCounts
              .filter(p => p.docCount > 0)
              .map(project => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-base">{project.name}</CardTitle>
                    <CardDescription>{project.docCount} dokumentasi</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {documents
                        .filter(doc => doc.projectId === project.id)
                        .slice(0, 3)
                        .map(doc => (
                          <div key={doc.id} className="flex items-center">
                            {getFileIcon(doc.fileType, doc.type)}
                            <div className="ml-2 overflow-hidden">
                              <p className="text-sm font-medium truncate">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                            </div>
                          </div>
                        ))}
                      {project.docCount > 3 && (
                        <Link 
                          href={`/dashboard/project/${project.id}`}
                          className="block text-sm text-primary hover:underline text-center mt-3"
                        >
                          Lihat semua dokumentasi
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentationPage; 