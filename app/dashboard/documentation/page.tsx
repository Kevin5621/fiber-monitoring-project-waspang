"use client"

import React, { useState, useEffect } from 'react';
import { File, FileText, Image, MoreHorizontal, Search, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/ui/card';
import { Button } from '@/components/common/ui/button';
import { Badge } from '@/components/common/ui/badge';
import { Input } from '@/components/common/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/common/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/common/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/ui/tabs";
import Link from 'next/link';
import { documents } from '@/data/project/documents';
import { projects } from '@/data/project/projects';
import { PaginationControl } from '@/components/features/common/pagination-control';
import { formatDate } from '@/lib/utils';

const DocumentationPage = () => {
  const [filterProject, setFilterProject] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<any[]>([]);
  const [documentList, setDocumentList] = useState<any[]>([]);
  
  // Pagination states for different tabs
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const [docsCurrentPage, setDocsCurrentPage] = useState(1);
  const [docsItemsPerPage, setDocsItemsPerPage] = useState(5);
  
  const [imagesCurrentPage, setImagesCurrentPage] = useState(1);
  const [imagesItemsPerPage, setImagesItemsPerPage] = useState(6);
  
  const [projectsCurrentPage, setProjectsCurrentPage] = useState(1);
  const [projectsItemsPerPage, setProjectsItemsPerPage] = useState(3);

  useEffect(() => {
    // Load data from centralized sources
    setProjectList(projects);
    setDocumentList(documents);
    setLoading(false);
  }, []);

  // Filter documents
  const filteredDocuments = documentList
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

  // Calculate document counts per project
  const projectDocCounts = projectList.map(project => {
    const count = documentList.filter(doc => doc.projectId === project.id).length;
    return { ...project, docCount: count };
  });

  // Calculate document counts by category
  const categories = Array.from(new Set(documentList.map(doc => doc.category)));
  const categoryStats = categories.map(category => {
    const count = documentList.filter(doc => doc.category === category).length;
    return { category, count };
  }).sort((a, b) => b.count - a.count);

  // Get icon based on file type
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
        return <File className="h-6 w-6 text-muted-foreground" />;
    }
  };

  // Pagination calculations for all documents
  const totalItems = filteredDocuments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);
  const paginatedDocuments = filteredDocuments.slice(startIndex, startIndex + itemsPerPage);
  
  // Pagination calculations for documents tab
  const filteredDocsOnly = filteredDocuments.filter(doc => doc.type === 'document');
  const totalDocsItems = filteredDocsOnly.length;
  const totalDocsPages = Math.ceil(totalDocsItems / docsItemsPerPage);
  const docsStartIndex = (docsCurrentPage - 1) * docsItemsPerPage;
  const docsEndIndex = Math.min(docsStartIndex + docsItemsPerPage - 1, totalDocsItems - 1);
  const paginatedDocsOnly = filteredDocsOnly.slice(docsStartIndex, docsStartIndex + docsItemsPerPage);
  
  // Pagination calculations for images tab
  const filteredImagesOnly = filteredDocuments.filter(doc => doc.type === 'image');
  const totalImagesItems = filteredImagesOnly.length;
  const totalImagesPages = Math.ceil(totalImagesItems / imagesItemsPerPage);
  const imagesStartIndex = (imagesCurrentPage - 1) * imagesItemsPerPage;
  const imagesEndIndex = Math.min(imagesStartIndex + imagesItemsPerPage - 1, totalImagesItems - 1);
  const paginatedImagesOnly = filteredImagesOnly.slice(imagesStartIndex, imagesStartIndex + imagesItemsPerPage);
  
  // Pagination calculations for projects tab
  const filteredProjects = projectDocCounts.filter(p => p.docCount > 0);
  const totalProjectsItems = filteredProjects.length;
  const totalProjectsPages = Math.ceil(totalProjectsItems / projectsItemsPerPage);
  const projectsStartIndex = (projectsCurrentPage - 1) * projectsItemsPerPage;
  const projectsEndIndex = Math.min(projectsStartIndex + projectsItemsPerPage - 1, totalProjectsItems - 1);
  const paginatedProjects = filteredProjects.slice(projectsStartIndex, projectsStartIndex + projectsItemsPerPage);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Memuat data dokumentasi...</p>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="space-y-6">
        {/* Overview Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Total Dokumentasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <span className="text-2xl font-bold">{documentList.length}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {documentList.filter(d => d.type === 'document').length} dokumen, {documentList.filter(d => d.type === 'image').length} gambar
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Dokumentasi Terbaru</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documentList
                  .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                  .slice(0, 2)
                  .map(doc => (
                    <div key={doc.id} className="flex items-center">
                      {getFileIcon(doc.fileType, doc.type)}
                      <div className="ml-2">
                        <p className="text-sm font-medium line-clamp-1">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</p>
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
                    {projectList.map(project => (
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
                  Menampilkan {paginatedDocuments.length > 0 ? `${startIndex + 1}-${endIndex + 1} dari` : "0 dari"} {filteredDocuments.length} item
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedDocuments.length > 0 ? (
                    paginatedDocuments.map((doc) => (
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
                            <span>Diunggah: {formatDate(doc.uploadDate)}</span>
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
                
                {/* Pagination for All Documents */}
                {filteredDocuments.length > 0 && (
                  <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    startIndex={startIndex}
                    endIndex={endIndex}
                    canGoBack={currentPage > 1}
                    canGoForward={currentPage < totalPages}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={(items) => {
                      setItemsPerPage(items);
                      setCurrentPage(1);
                    }}
                    itemsPerPageOptions={[5, 10, 20, 50]}
                  />
                )}
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
                <CardDescription>
                  Menampilkan {paginatedDocsOnly.length > 0 ? `${docsStartIndex + 1}-${docsEndIndex + 1} dari` : "0 dari"} {filteredDocsOnly.length} dokumen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedDocsOnly.length > 0 ? (
                    paginatedDocsOnly.map((doc) => (
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
                            <span>Diunggah: {formatDate(doc.uploadDate)}</span>
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
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Tidak ada dokumen ditemukan</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Tidak ada dokumen yang sesuai dengan filter yang dipilih.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Pagination for Documents */}
                {filteredDocsOnly.length > 0 && (
                  <PaginationControl
                    currentPage={docsCurrentPage}
                    totalPages={totalDocsPages}
                    itemsPerPage={docsItemsPerPage}
                    totalItems={totalDocsItems}
                    startIndex={docsStartIndex}
                    endIndex={docsEndIndex}
                    canGoBack={docsCurrentPage > 1}
                    canGoForward={docsCurrentPage < totalDocsPages}
                    onPageChange={setDocsCurrentPage}
                    onItemsPerPageChange={(items) => {
                      setDocsItemsPerPage(items);
                      setDocsCurrentPage(1);
                    }}
                    itemsPerPageOptions={[5, 10, 20, 50]}
                  />
                )}
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
                <CardDescription>
                  Menampilkan {paginatedImagesOnly.length > 0 ? `${imagesStartIndex + 1}-${imagesEndIndex + 1} dari` : "0 dari"} {filteredImagesOnly.length} foto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedImagesOnly.length > 0 ? (
                    paginatedImagesOnly.map((doc) => (
                      <div key={doc.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-40 bg-muted flex items-center justify-center">
                          <Image className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium line-clamp-1">{doc.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 mb-2">{doc.project}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</span>
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
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8">
                      <Image className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Tidak ada foto ditemukan</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Tidak ada foto yang sesuai dengan filter yang dipilih.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Pagination for Images */}
                {filteredImagesOnly.length > 0 && (
                  <PaginationControl
                    currentPage={imagesCurrentPage}
                    totalPages={totalImagesPages}
                    itemsPerPage={imagesItemsPerPage}
                    totalItems={totalImagesItems}
                    startIndex={imagesStartIndex}
                    endIndex={imagesEndIndex}
                    canGoBack={imagesCurrentPage > 1}
                    canGoForward={imagesCurrentPage < totalImagesPages}
                    onPageChange={setImagesCurrentPage}
                    onItemsPerPageChange={(items) => {
                      setImagesItemsPerPage(items);
                      setImagesCurrentPage(1);
                    }}
                    itemsPerPageOptions={[6, 12, 24, 48]}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects View */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProjects.length > 0 ? (
                paginatedProjects.map(project => (
                  <Card key={project.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <CardDescription>{project.docCount} dokumentasi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {documentList
                          .filter(doc => doc.projectId === project.id)
                          .slice(0, 3)
                          .map(doc => (
                            <div key={doc.id} className="flex items-center">
                              {getFileIcon(doc.fileType, doc.type)}
                              <div className="ml-2 overflow-hidden">
                                <p className="text-sm font-medium truncate">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(doc.uploadDate)}</p>
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
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Tidak ada proyek ditemukan</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Tidak ada proyek yang sesuai dengan filter yang dipilih.
                  </p>
                </div>
              )}
            </div>
            
            {/* Pagination for Projects */}
            {filteredProjects.length > 0 && (
              <PaginationControl
                currentPage={projectsCurrentPage}
                totalPages={totalProjectsPages}
                itemsPerPage={projectsItemsPerPage}
                totalItems={totalProjectsItems}
                startIndex={projectsStartIndex}
                endIndex={projectsEndIndex}
                canGoBack={projectsCurrentPage > 1}
                canGoForward={projectsCurrentPage < totalProjectsPages}
                onPageChange={setProjectsCurrentPage}
                onItemsPerPageChange={(items) => {
                  setProjectsItemsPerPage(items);
                  setProjectsCurrentPage(1);
                }}
                itemsPerPageOptions={[3, 6, 9, 12]}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Floating Upload Button */}
      <Button 
        className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0"
        size="icon"
      >
        <Upload className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default DocumentationPage;