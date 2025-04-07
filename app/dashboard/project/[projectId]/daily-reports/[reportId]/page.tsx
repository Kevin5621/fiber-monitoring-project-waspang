"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Check, Clock, Download, FileText, MapPin, Printer, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { dailyReports } from '@/data/project/reports';
import { projects } from '@/data/project/projects';
import { formatDate, formatTime } from "@/lib/utils";

export default function DailyReportDetailPage() {
  const params = useParams();
  const projectId = Number(params.projectId);
  const reportId = Number(params.reportId);
  const [report, setReport] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get report from centralized data
    const foundReport = dailyReports.find(r => r.id === reportId);
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundReport) {
      setReport(foundReport);
    }
    
    if (foundProject) {
      setProject(foundProject);
    }
    
    setLoading(false);
  }, [projectId, reportId]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-muted/50-100 text-gray-800">Draft</span>;
      case 'in-review':
        return <span className="px-2 py-1 text-xs rounded-full bg-warning/10 text-warning">Menunggu</span>;
      case 'approved':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-green-800">Disetujui</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Ditolak</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Memuat data laporan...</p>
      </div>
    </div>;
  }

  if (!report) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">Laporan Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-4">Laporan dengan ID {reportId} tidak ditemukan.</p>
        <Link 
          href={`/dashboard/project/${projectId}`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
        >
          Kembali ke Proyek
        </Link>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-muted/50-50">
      {/* Header */}
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href={`/dashboard/project/${projectId}`} className="mr-3 text-gray-400 hover:text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium text-foreground">Detail Laporan Harian</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-card p-4 rounded-lg shadow-sm border border-border-100">
            <div className="flex flex-col mb-4 md:mb-0">
              <h2 className="text-lg font-medium text-foreground">{report.title}</h2>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(report.date)}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>Disubmit: {formatTime(report.submittedAt)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-border-300 text-sm font-medium rounded-md bg-card text-foreground/80 hover:bg-muted/50-50">
                <Printer className="h-4 w-4 mr-2" />
                Cetak
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-border-300 text-sm font-medium rounded-md bg-card text-foreground/80 hover:bg-muted/50-50">
                <Download className="h-4 w-4 mr-2" />
                Unduh PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Summary Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Ringkasan</h3>
              <p className="text-foreground/80">{report.title}</p>
            </div>

            {/* Work Items Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Detail Pekerjaan</h3>
              <ul className="space-y-2">
                {report.activities.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Kendala</h3>
              {report.issues && report.issues.length > 0 ? (
                <ul className="space-y-2">
                  {report.issues.map((issue: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-foreground/80">• {issue}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-foreground/80">Tidak ada kendala yang dilaporkan.</p>
              )}
            </div>

            {/* Next Plan Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Rencana Selanjutnya</h3>
              <p className="text-foreground/80">{report.nextPlan}</p>
            </div>

            {/* Materials Card */}
            {report.materials && report.materials.length > 0 && (
              <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
                <h3 className="text-lg font-medium text-foreground mb-4">Material yang Digunakan</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted/50-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Material
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Jumlah
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-gray-200">
                      {report.materials.map((material: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {material.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                            {material.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Status</h3>
              <div className="mb-4">
                {getStatusBadge(report.status)}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <div className="mt-1 relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-muted/50-200">
                      <div style={{ width: `${report.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-info-foreground justify-center bg-info-500"></div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-semibold text-info">{report.progress}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Proyek</p>
                  <div className="flex items-center mt-1">
                    <FileText className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-foreground/80">{report.project}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-foreground/80">{project?.location || 'Tidak tersedia'}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dibuat oleh</p>
                  <div className="flex items-center mt-1">
                    <UserCircle className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-foreground/80">{report.submittedBy}</span>
                  </div>
                </div>
                {report.status === 'approved' && report.approvedBy && (
                  <div>
                    <p className="text-sm text-muted-foreground">Disetujui oleh</p>
                    <div className="flex items-center mt-1">
                      <UserCircle className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-foreground/80">{report.approvedBy}</span>
                    </div>
                    {report.approvedAt && (
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-muted-foreground">{report.approvedAt}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photos Section */}
        {report.photos && report.photos.length > 0 && (
          <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6 mb-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Dokumentasi Foto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.photos.map((photo: any) => (
                <div key={photo.id} className="border border-border-200 rounded-lg overflow-hidden">
                  <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
                  <div className="p-3">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-info-100 text-blue-800 mb-2">
                      {photo.type === 'equipment' && 'Peralatan'}
                      {photo.type === 'process' && 'Proses'}
                      {photo.type === 'result' && 'Hasil'}
                      {photo.type === 'location' && 'Lokasi'}
                    </span>
                    <p className="text-sm text-foreground/80">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}