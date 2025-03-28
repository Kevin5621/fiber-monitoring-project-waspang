import React from 'react';
import { ArrowLeft, Calendar, Camera, Clock, FileText, Info, MapPin, Plus, Save, Trash2, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewDailyReportPage({ params }: { params: { projectId: string } }) {
  // Current date formatted for display
  const currentDate = '23 Mar 2025';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href={`/projects/${params.projectId}/daily-reports`} className="mr-3 text-gray-400 hover:text-gray-500">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium text-gray-900">Buat Laporan Harian</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form>
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informasi Dasar</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tanggal
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                        placeholder="Tanggal"
                        value={currentDate}
                        disabled
                      />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Laporan untuk hari ini</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Masukkan lokasi pekerjaan"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ringkasan Kegiatan
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jelaskan ringkasan kegiatan hari ini..."
                ></textarea>
              </div>
            </div>
            
            {/* Work Progress Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Progres Pekerjaan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Progres Hari Ini (%)
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full md:w-1/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Masukkan persentase kemajuan pekerjaan hari ini</p>
                </div>
                
                <div>
                  <div className="flex items-start">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Detail Pekerjaan
                    </label>
                    <div className="ml-1 mt-0.5">
                      <div className="flex items-center text-xs text-gray-500">
                        <Info className="h-3 w-3 mr-1" />
                        <span>Tambahkan item pekerjaan yang diselesaikan</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan item pekerjaan"
                      />
                      <button
                        type="button"
                        className="ml-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Item
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kendala
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Jelaskan kendala yang dihadapi (jika ada)..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Photo Documentation Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Dokumentasi Foto</h2>
                <span className="text-sm text-gray-500">Min. 3 foto</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Photo Upload Box */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Peralatan</p>
                  <p className="text-xs text-gray-500 text-center mb-3">Foto peralatan yang digunakan</p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Proses Kerja</p>
                  <p className="text-xs text-gray-500 text-center mb-3">Foto proses pengerjaan</p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500 transition-colors">
                  <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Hasil Pekerjaan</p>
                  <p className="text-xs text-gray-500 text-center mb-3">Foto hasil pekerjaan</p>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </button>
                </div>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Foto Lainnya
              </button>
            </div>
            
            {/* Buttons */}
            <div className="flex justify-end space-x-3">
              <Link
                href={`/projects/${params.projectId}/daily-reports`}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Simpan Laporan
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}