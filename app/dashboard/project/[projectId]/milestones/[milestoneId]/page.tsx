import React from 'react';
import { ArrowLeft, Calendar, Check, Clock, Download, FileText, PlusCircle, Upload, Camera } from 'lucide-react';
import Link from 'next/link';

const MilestoneDetailPage = ({ 
  params 
}: { 
  params: { 
    projectId: string,
    milestoneId: string 
  } 
}) => {
  // Mock data for this example
  const milestone = {
    id: params.milestoneId,
    name: 'Pemasangan Kabel Fiber',
    status: 'in-progress',
    date: '26-30 Mar 2025',
    progress: 40,
    description: 'Pemasangan kabel fiber optik sepanjang jalur yang telah digali',
    notes: 'Pastikan semua kabel diberi label sesuai dengan standar perusahaan. Dokumentasikan setiap sambungan dengan foto yang jelas.',
    lastUpdated: '27 Mar 2025, 10:45',
    project: {
      id: params.projectId,
      name: 'Instalasi Fiber Optik Sudirman'
    },
    requiredDocs: [
      { 
        id: 1,
        name: 'Foto pemasangan kabel', 
        status: 'in-progress',
        description: 'Foto proses dan hasil pemasangan kabel di sepanjang jalur',
        deadline: '28 Mar 2025',
        uploads: [
          { id: 1, name: 'pemasangan-kabel-1.jpg', date: '26 Mar 2025, 14:30', thumbnail: '/api/placeholder/300/200' },
          { id: 2, name: 'pemasangan-kabel-2.jpg', date: '27 Mar 2025, 09:15', thumbnail: '/api/placeholder/300/200' }
        ],
        required: 5,
        uploaded: 2
      },
      { 
        id: 2,
        name: 'Foto label kabel', 
        status: 'not-started',
        description: 'Foto label identifikasi pada setiap kabel yang dipasang',
        deadline: '29 Mar 2025',
        uploads: [],
        required: 10,
        uploaded: 0
      },
      { 
        id: 3,
        name: 'Dokumentasi sambungan kabel', 
        status: 'not-started',
        description: 'Foto sambungan kabel pada setiap junction box',
        deadline: '30 Mar 2025',
        uploads: [],
        required: 8,
        uploaded: 0
      }
    ],
    activities: [
      { action: 'Upload foto pemasangan-kabel-2.jpg', time: '27 Mar 2025, 09:15', user: 'Ahmad (WasPang)' },
      { action: 'Upload foto pemasangan-kabel-1.jpg', time: '26 Mar 2025, 14:30', user: 'Ahmad (WasPang)' },
      { action: 'Memulai milestone Pemasangan Kabel Fiber', time: '26 Mar 2025, 08:00', user: 'Budi (PM)' }
    ]
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
        return <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <Check className="h-4 w-4" />
        </div>;
      case 'in-progress':
        return <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <FileText className="h-4 w-4" />
        </div>;
      case 'not-started':
        return <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
          <PlusCircle className="h-4 w-4" />
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
            <Link href={`/projects/${milestone.project.id}/milestones`} className="mr-4 text-gray-400 hover:text-gray-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-medium text-gray-900">{milestone.name}</h1>
              <p className="text-sm text-gray-500">{milestone.project.name}</p>
            </div>
            <div>
              {getStatusBadge(milestone.status)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Milestone details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Detail Milestone</h2>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Jadwal Pelaksanaan</p>
                    <p className="text-sm text-gray-600">{milestone.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Deskripsi</p>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <PlusCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Catatan</p>
                    <p className="text-sm text-gray-600">{milestone.notes}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Terakhir Diperbarui</p>
                    <p className="text-sm text-gray-600">{milestone.lastUpdated}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">Progres Keseluruhan</span>
                  <span className="text-sm font-medium text-gray-700">{milestone.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${milestone.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Documentation Requirements */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Kebutuhan Dokumentasi</h2>
              
              {milestone.requiredDocs.map((doc, index) => (
                <div 
                  key={doc.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        {getDocStatusIcon(doc.status)}
                        <div className="ml-3">
                          <h3 className="text-base font-medium text-gray-900">{doc.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">Deadline: {doc.deadline}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Upload: {doc.uploaded}/{doc.required} foto
                      </span>
                    </div>
                    
                    {doc.uploads.length > 0 ? (
                      <div className="mb-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {doc.uploads.map((upload) => (
                            <div key={upload.id} className="relative group">
                              <img 
                                src={upload.thumbnail} 
                                alt={upload.name} 
                                className="h-24 w-full object-cover rounded-md"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Download className="h-5 w-5 text-white" />
                              </div>
                              <p className="text-xs text-gray-500 mt-1 truncate">{upload.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-24 bg-gray-50 rounded-md mb-4">
                        <div className="text-center text-gray-500">
                          <Camera className="h-6 w-6 mx-auto mb-1" />
                          <p className="text-sm">Belum ada foto diunggah</p>
                        </div>
                      </div>
                    )}
                    
                    <button className="w-full py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <div className="flex items-center justify-center">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Upload Foto Dokumentasi</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right sidebar - Activity log */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6 sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Aktivitas Milestone</h2>
              
              <div className="space-y-6">
                {milestone.activities.map((activity, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot and line */}
                    <div className="absolute left-0 w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                    {index < milestone.activities.length - 1 && (
                      <div className="absolute left-1 top-3 bottom-0 w-px bg-gray-200 h-12"></div>
                    )}
                    
                    {/* Content */}
                    <div className="ml-6">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-3 w-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MilestoneDetailPage;