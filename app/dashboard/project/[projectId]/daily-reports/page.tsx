import React from 'react';
import { ArrowLeft, Calendar, Check, ChevronRight, Clock, FileText, Filter, Plus, Search } from 'lucide-react';
import Link from 'next/link';

export default function DailyReportsPage({ params }: { params: { projectId: string } }) {
  // Sample daily reports data
  const dailyReports = [
    {
      id: 'dr-001',
      date: '22 Mar 2025',
      submitted: '22 Mar 2025, 17:45',
      author: 'Ahmad Rizal',
      progress: 12,
      status: 'approved',
      photoCount: 5,
    },
    {
      id: 'dr-002',
      date: '21 Mar 2025',
      submitted: '21 Mar 2025, 16:30',
      author: 'Ahmad Rizal',
      progress: 15,
      status: 'approved',
      photoCount: 7,
    },
    {
      id: 'dr-003',
      date: '20 Mar 2025',
      submitted: '20 Mar 2025, 18:05',
      author: 'Ahmad Rizal',
      progress: 10,
      status: 'approved',
      photoCount: 4,
    },
    {
      id: 'dr-004',
      date: '19 Mar 2025',
      submitted: '19 Mar 2025, 17:10',
      author: 'Ahmad Rizal',
      progress: 8,
      status: 'approved',
      photoCount: 6,
    },
    {
      id: 'dr-005',
      date: '18 Mar 2025',
      submitted: '18 Mar 2025, 16:55',
      author: 'Ahmad Rizal',
      progress: 12,
      status: 'approved',
      photoCount: 5,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-warning/10 text-warning">Menunggu</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-green-800">Disetujui</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Ditolak</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/50-50">
      {/* Header */}
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href={`/projects/${params.projectId}`} className="mr-3 text-gray-400 hover:text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium text-foreground">Laporan Harian</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex border-b border-border-200 mb-6">
          <Link href={`/projects/${params.projectId}`} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground/80 border-b-2 border-transparent hover:border-border-300">
            Ringkasan
          </Link>
          <Link href={`/projects/${params.projectId}/milestones`} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground/80 border-b-2 border-transparent hover:border-border-300">
            Milestone
          </Link>
          <Link href={`/projects/${params.projectId}/daily-reports`} className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Laporan Harian
          </Link>
          <Link href={`/projects/${params.projectId}/documentation`} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground/80 border-b-2 border-transparent hover:border-border-300">
            Dokumentasi
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="mb-4 md:mb-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari laporan..."
              className="pl-10 pr-4 py-2 border border-border-300 rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-2 border border-border-300 text-sm font-medium rounded-md bg-card text-foreground/80 hover:bg-muted/50-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <Link href={`/projects/${params.projectId}/daily-reports/new`} className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md bg-info-600 text-info-foreground hover:bg-info-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Plus className="h-4 w-4 mr-2" />
              Buat Laporan
            </Link>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-card rounded-lg shadow-sm border border-border-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-muted/50-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Progres
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Dokumentasi
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Penyusun
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-gray-200">
                {dailyReports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/50-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{report.date}</div>
                          <div className="text-xs text-muted-foreground">{report.submitted}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">+{report.progress}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-foreground">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        {report.photoCount} foto
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {report.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/projects/${params.projectId}/daily-reports/${report.id}`} className="text-blue-600 hover:text-blue-900">
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between bg-card px-4 py-3 sm:px-6 mt-4 rounded-md shadow-sm border border-border-100">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-border-300 text-sm font-medium rounded-md text-foreground/80 bg-card hover:bg-muted/50-50">
              Sebelumnya
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-border-300 text-sm font-medium rounded-md text-foreground/80 bg-card hover:bg-muted/50-50">
              Selanjutnya
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-foreground/80">
                Menampilkan <span className="font-medium">1</span> hingga <span className="font-medium">5</span> dari <span className="font-medium">12</span> laporan
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-border-300 bg-card text-sm font-medium text-muted-foreground hover:bg-muted/50-50">
                  <span className="sr-only">Sebelumnya</span>
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-border-300 bg-info-50 text-sm font-medium text-blue-600">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-border-300 bg-card text-sm font-medium text-muted-foreground hover:bg-muted/50-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-border-300 bg-card text-sm font-medium text-muted-foreground hover:bg-muted/50-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-border-300 bg-card text-sm font-medium text-muted-foreground hover:bg-muted/50-50">
                  <span className="sr-only">Selanjutnya</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}