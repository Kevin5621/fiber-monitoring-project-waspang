import React from 'react';
import { ArrowLeft, Calendar, Check, FileText, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const MilestonesPage = ({ params }: { params: { projectId: string } }) => {
  // Mock data for this example
  const project = {
    id: params.projectId,
    name: 'Instalasi Fiber Optik Sudirman',
    milestones: [
      { 
        id: 1, 
        name: 'Persiapan dan Pengadaan Alat', 
        status: 'completed', 
        date: '10-15 Mar 2025', 
        progress: 100,
        description: 'Persiapan peralatan dan bahan yang dibutuhkan untuk instalasi fiber optik',
        requiredDocs: [
          { name: 'Foto inventaris peralatan', status: 'completed' },
          { name: 'Dokumen pengadaan material', status: 'completed' }
        ]
      },
      { 
        id: 2, 
        name: 'Survei Lokasi', 
        status: 'completed', 
        date: '16-20 Mar 2025', 
        progress: 100,
        description: 'Melakukan survei lokasi untuk menentukan titik-titik pemasangan dan rute kabel',
        requiredDocs: [
          { name: 'Foto lokasi survei', status: 'completed' },
          { name: 'Peta rute kabel', status: 'completed' },
          { name: 'Dokumen perizinan lokasi', status: 'completed' }
        ]
      },
      { 
        id: 3, 
        name: 'Penggalian dan Persiapan Lahan', 
        status: 'completed', 
        date: '21-25 Mar 2025', 
        progress: 100,
        description: 'Penggalian jalur kabel dan persiapan lahan untuk instalasi',
        requiredDocs: [
          { name: 'Foto proses penggalian', status: 'completed' },
          { name: 'Foto lubang galian', status: 'completed' },
          { name: 'Dokumentasi kedalaman galian', status: 'completed' }
        ]
      },
      { 
        id: 4, 
        name: 'Pemasangan Kabel Fiber', 
        status: 'in-progress', 
        date: '26-30 Mar 2025', 
        progress: 40,
        description: 'Pemasangan kabel fiber optik sepanjang jalur yang telah digali',
        requiredDocs: [
          { name: 'Foto pemasangan kabel', status: 'in-progress' },
          { name: 'Foto label kabel', status: 'not-started' },
          { name: 'Dokumentasi sambungan kabel', status: 'not-started' }
        ]
      },
      { 
        id: 5, 
        name: 'Pengujian dan Serah Terima', 
        status: 'not-started', 
        date: '1-15 Apr 2025', 
        progress: 0,
        description: 'Melakukan pengujian konektivitas dan serah terima kepada client',
        requiredDocs: [
          { name: 'Hasil pengujian konektivitas', status: 'not-started' },
          { name: 'Foto final instalasi', status: 'not-started' },
          { name: 'Berita acara serah terima', status: 'not-started' }
        ]
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'not-started': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'not-started':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Belum Dimulai</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Sedang Berjalan</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Selesai</span>;
      default:
        return null;
    }
  };

  const getDocStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': 
        return <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <Check className="h-3 w-3" />
        </div>;
      case 'in-progress':
        return <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <FileText className="h-3 w-3" />
        </div>;
      case 'not-started':
        return <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <PlusCircle className="h-3 w-3" />
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href={`/projects/${project.id}`} className="mr-4 text-gray-400 hover:text-gray-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-medium text-gray-900">Milestone</h1>
              <p className="text-sm text-gray-500">{project.name}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {/* Milestone items */}
          <div className="space-y-8">
            {project.milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                {/* Timeline dot */}
                <div className={`absolute left-4 w-4 h-4 rounded-full ${getStatusColor(milestone.status)} transform -translate-x-1/2`}></div>
                
                {/* Content card */}
                <div className="ml-10 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{milestone.name}</h2>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{milestone.date}</span>
                        </div>
                      </div>
                      {getStatusBadge(milestone.status)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Progres</span>
                        <span className="text-sm font-medium text-gray-700">{milestone.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Dokumentasi yang Dibutuhkan</h3>
                      <ul className="space-y-2">
                        {milestone.requiredDocs.map((doc, docIndex) => (
                          <li key={docIndex} className="flex items-center text-sm">
                            {getDocStatusIcon(doc.status)}
                            <span className="ml-2 text-gray-700">{doc.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 flex justify-end">
                      <Link 
                        href={`/projects/${project.id}/milestones/${milestone.id}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MilestonesPage;