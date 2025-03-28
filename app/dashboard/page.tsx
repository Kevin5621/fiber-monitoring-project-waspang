"use client"

import React from 'react';
import { Calendar, Clipboard, Clock, FileText, Folder, MoreHorizontal, Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Selamat datang kembali, WasPang</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            March 2025
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Folder className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Dari total 5 proyek</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Milestone Terdekat</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Tenggat 3 hari lagi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Dokumentasi Tertunda</CardTitle>
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Perlu segera dilengkapi</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Milestones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Milestone Saat Ini</CardTitle>
          <Link href="/waspang/milestones" className="text-sm text-primary hover:underline">
            Lihat Semua
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {[
              { name: 'Persiapan Alat', project: 'Fiber Optik Jl. Sudirman', progress: 80, deadline: '25 Mar 2025' },
              { name: 'Pemasangan Kabel', project: 'Fiber Optik Tebet', progress: 45, deadline: '28 Mar 2025' },
              { name: 'Dokumentasi Penutupan', project: 'Fiber Optik Kemang', progress: 20, deadline: '01 Apr 2025' }
            ].map((milestone, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <div className="font-medium">{milestone.name}</div>
                  <div className="text-sm text-muted-foreground">{milestone.project}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-muted-foreground">{milestone.deadline}</span>
                    <div className="w-24 mt-1">
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Reports */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Laporan Harian</CardTitle>
              <Link href="/waspang/reports" className="text-sm text-primary hover:underline">
                Riwayat
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                <span>23 Maret 2025</span>
              </div>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                Belum Dibuat
              </Badge>
            </div>
            <Button className="w-full">
              Buat Laporan Hari Ini
            </Button>
          </CardContent>
        </Card>

        {/* Documentation Need */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dokumentasi Dibutuhkan</CardTitle>
              <Link href="/waspang/documentation" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { name: 'Foto Pemasangan Kabel', project: 'Fiber Optik Tebet' },
                { name: 'Foto Label Kabel', project: 'Fiber Optik Sudirman' }
              ].map((doc, i) => (
                <li key={i} className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-destructive/10 rounded-full flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.project}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full mt-4">
              Upload Dokumentasi
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Aktivitas Terakhir</CardTitle>
              <Link href="/waspang/activity" className="text-sm text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { action: 'Upload foto pemasangan', time: '2 jam lalu', project: 'Fiber Optik Kemang' },
                { action: 'Laporan harian dikirim', time: 'Kemarin, 16:32', project: 'Fiber Optik Sudirman' },
                { action: 'Milestone selesai', time: 'Kemarin, 10:15', project: 'Fiber Optik Menteng' }
              ].map((activity, i) => (
                <li key={i} className="flex">
                  <div className="mr-3 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time} • {activity.project}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;