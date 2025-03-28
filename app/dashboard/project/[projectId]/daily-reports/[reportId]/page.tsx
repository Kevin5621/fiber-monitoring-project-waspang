// app/(dashboard)/projects/[projectId]/daily-reports/[reportId]/page.tsx
import React from 'react';
import { ArrowLeft, Calendar, Check, Clock, Download, FileText, MapPin, Printer, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function DailyReportDetailPage({ params }: { params: { projectId: string, reportId: string } }) {
  // Sample report data
  const report = {
    id: params.reportId,
    date: '22 Mar 2025',
    submitted: '22 Mar 2025, 17:45',
    author: 'Ahmad Rizal',
    location: 'Jl. Jendral Sudirman KM 4.5, Jakarta Pusat',
    progress: 12,
    status: 'approved',
    approvedBy: 'Budi Santoso',
    approvedAt: '22 Mar 2025, 19:20',
    summary: 'Hari ini tim melakukan pengerjaan pemasangan kabel fiber optic di area Sudirman. Pekerjaan meliputi penarikan kabel sepanjang 300 meter dan pemeriksaan jalur kabel yang sudah dipasang sebelumnya.',
    workItems: [
      'Penarikan kabel fiber optic sepanjang 300 meter',
      'Pemeriksaan dan testing jalur fiber optik',
      'Persiapan lokasi pemasangan tiang baru'
    ],
    challenges: 'Terdapat beberapa titik yang sulit dijangkau karena berada di area padat penduduk. Tim harus koordinasi dengan warga sekitar untuk mendapatkan izin akses.',
    materials: [
      { name: 'Kabel Fiber Optik', quantity: '300 meter' },
      { name: 'Tiang Pancang', quantity: '5 unit' },
      { name: 'Konektor SC', quantity: '10 buah' }
    ],
    photos: [
      { 
        id: 'p1', 
        url: '/api/placeholder/400/300', 
        type: 'equipment', 
        caption: 'Peralatan yang digunakan' 
      },
      { 
        id: 'p2', 
        url: '/api/placeholder/400/300', 
        type: 'process', 
        caption: 'Proses penarikan kabel' 
      },
      { 
        id: 'p3', 
        url: '/api/placeholder/400/300', 
        type: 'process', 
        caption: 'Tim melakukan testing jalur' 
      },
      { 
        id: 'p4', 
        url: '/api/placeholder/400/300', 
        type: 'result', 
        caption: 'Hasil pemasangan kabel' 
      },
      { 
        id: 'p5', 
        url: '/api/placeholder/400/300', 
        type: 'location', 
        caption: 'Lokasi pemasangan tiang baru' 
      }
    ]
  };

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
            <Link href={`/projects/${params.projectId}/daily-reports`} className="mr-3 text-gray-400 hover:text-muted-foreground">
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
              <h2 className="text-lg font-medium text-foreground">Laporan Harian #{report.id}</h2>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{report.date}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>Disubmit: {report.submitted}</span>
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
              <p className="text-foreground/80">{report.summary}</p>
            </div>

            {/* Work Items Card */}
            <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">Detail Pekerjaan</h3>
              <ul className="space-y-2">
                {report.workItems.map((item, index) => (
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
              <p className="text-foreground/80">{report.challenges}</p>
            </div>

            {/* Materials Card */}
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
                    {report.materials.map((material, index) => (
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
                  <p className="text-sm text-muted-foreground">Lokasi</p>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-foreground/80">{report.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dibuat oleh</p>
                  <div className="flex items-center mt-1">
                    <UserCircle className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-foreground/80">{report.author}</span>
                  </div>
                </div>
                {report.status === 'approved' && (
                  <div>
                    <p className="text-sm text-muted-foreground">Disetujui oleh</p>
                    <div className="flex items-center mt-1">
                      <UserCircle className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-foreground/80">{report.approvedBy}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-muted-foreground">{report.approvedAt}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Photos Section */}
        <div className="bg-card rounded-lg shadow-sm border border-border-100 p-6 mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Dokumentasi Foto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {report.photos.map((photo) => (
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
      </main>
    </div>
  );
}