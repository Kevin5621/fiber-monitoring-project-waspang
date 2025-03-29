"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Folder, ChevronRight, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const DashboardPage = () => {
  // State for real-time date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update date every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format current date
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Format current time
  const formattedTime = currentDate.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Sample data 
  const priorityTasks = [
    { 
      title: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      progress: 45, 
      deadline: '3 hari tersisa', 
      badge: 'Tenggat Hari Ini', 
      badgeVariant: 'destructive' as const
    },
    { 
      title: 'Buat Laporan Harian', 
      project: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }), 
      badge: 'Segera', 
      badgeVariant: 'default' as const
    },
    { 
      title: 'Foto Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      badge: 'Dokumentasi', 
      badgeVariant: 'outline' as const
    }
  ];

  const stats = [
    { 
      title: 'Proyek Aktif', 
      value: '3', 
      icon: <Folder className="h-5 w-5" />, 
      color: 'primary',
    },
    { 
      title: 'Milestone', 
      value: '2', 
      icon: <Clock className="h-5 w-5" />, 
      color: 'warning',
    },
    { 
      title: 'Dokumentasi Tertunda', 
      value: '5', 
      icon: <FileText className="h-5 w-5" />, 
      color: 'destructive',
    }
  ];

  const milestones = [
    { 
      name: 'Persiapan Alat', 
      project: 'Fiber Optik Jl. Sudirman', 
      deadline: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }), 
      status: 'Pada Jadwal',
      icon: <CheckCircle className="h-4 w-4" />
    },
    { 
      name: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      deadline: '28 Mar 2025', 
      status: 'Terlambat',
      icon: <AlertCircle className="h-4 w-4" />
    },
    { 
      name: 'Dokumentasi Penutupan', 
      project: 'Fiber Optik Kemang', 
      deadline: '01 Apr 2025', 
      status: 'Pada Jadwal',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const documents = [
    { 
      name: 'Foto Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      deadline: currentDate.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }) 
    },
    { name: 'Foto Label Kabel', project: 'Fiber Optik Sudirman', deadline: '30 Mar 2025' },
    { name: 'Foto Penutupan Galian', project: 'Fiber Optik Kemang', deadline: '01 Apr 2025' }
  ];

  const activities = [
    { action: 'Upload foto pemasangan', time: '2 jam lalu', project: 'Fiber Optik Kemang' },
    { action: 'Laporan harian dikirim', time: 'Kemarin, 16:32', project: 'Fiber Optik Sudirman' },
    { action: 'Milestone selesai', time: 'Kemarin, 10:15', project: 'Fiber Optik Menteng' }
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Header with Date and Time */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard Pemasangan</h1>
            <p className="text-muted-foreground">Pantau semua aktivitas dan progres proyek Anda</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
            <div className="bg-secondary/50 px-4 py-2 rounded-lg flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
            <div className="bg-secondary/50 px-4 py-2 rounded-lg flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm font-medium">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="shadow hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                  {React.cloneElement(stat.icon, { className: `text-${stat.color} h-5 w-5` })}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Priority Tasks */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Prioritas Hari Ini</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {priorityTasks.map((task, i) => (
            <Card key={i} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <Badge variant={task.badgeVariant}>{task.badge}</Badge>
                <span className="text-xs text-muted-foreground font-medium">{task.deadline || 'Segera'}</span>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <h4 className="font-medium text-base">{task.title}</h4>
                <p className="text-sm text-muted-foreground">{task.project}</p>
                {task.progress !== undefined && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              {task.title === 'Buat Laporan Harian' && (
                <CardFooter className="p-4 pt-0">
                  <Button size="sm" className="w-full">
                    Buat Sekarang
                  </Button>
                </CardFooter>
              )}
              {task.title === 'Foto Pemasangan Kabel' && (
                <CardFooter className="p-4 pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                </CardFooter>
              )}
              {task.title === 'Pemasangan Kabel' && (
                <CardFooter className="p-4 pt-0">
                  <Button variant="secondary" size="sm" className="w-full">
                    Lihat Detail
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Tabs - Redesigned */}
      <div className="mb-8">
        <Tabs defaultValue="milestones" className="w-full">
          <div className="border-b mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="milestones">Milestone</TabsTrigger>
              <TabsTrigger value="reports">Laporan</TabsTrigger>
              <TabsTrigger value="docs">Dokumentasi</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Milestones Tab */}
          <TabsContent value="milestones" className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Milestone Aktif</h3>
              <Link href="/dashboard/milestones" className="text-sm text-primary flex items-center hover:underline">
                Lihat Semua <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {milestones.map((milestone, i) => (
                <Card key={i} className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                        milestone.status === 'Terlambat' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {React.cloneElement(milestone.icon, { className: "h-5 w-5" })}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{milestone.name}</h4>
                          <Badge variant={milestone.status === 'Terlambat' ? 'destructive' : 'outline'}>
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.project}</p>
                        <p className="text-xs text-muted-foreground mt-2">Tenggat: {milestone.deadline}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports" className="pt-2">
            <Card className="transition-all duration-200 hover:shadow-lg border-t-4 border-t-warning">
              <CardHeader className="pb-2 pt-6">
                <CardTitle className="text-xl">Laporan Harian</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-lg bg-warning/10 flex items-center justify-center mr-4">
                      <Calendar className="h-7 w-7 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{formattedDate}</h4>
                      <p className="text-sm text-muted-foreground">Laporan belum dibuat</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    Belum Dibuat
                  </Badge>
                </div>
                <Button className="w-full">
                  Buat Laporan Hari Ini
                </Button>
                
                <Separator className="my-8" />
                
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Riwayat Laporan</h4>
                    <Link href="/dashboard/reports" className="text-sm text-primary flex items-center hover:underline">
                      Lihat Semua <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {['28 Mar 2025', '27 Mar 2025'].map((date, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{date}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Terkirim
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Documentation Tab */}
          <TabsContent value="docs" className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Dokumentasi Dibutuhkan</h3>
              <Link href="/dashboard/documentation" className="text-sm text-primary flex items-center hover:underline">
                Lihat Semua <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, i) => (
                <Card key={i} className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-destructive">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-destructive" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{doc.name}</h4>
                          <Badge variant="destructive">Diperlukan</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.project}</p>
                        <p className="text-xs text-destructive mt-2">Tenggat: {doc.deadline}</p>
                        
                        <Button variant="outline" className="w-full mt-4 flex items-center justify-center">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Sekarang
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Aktivitas Terakhir</h3>
          <Link href="/dashboard/activity" className="text-sm text-primary flex items-center hover:underline">
            Lihat Semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardContent className="p-6">
            <ul className="divide-y divide-border">
              {activities.map((activity, i) => (
                <li key={i} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start border-l-2 border-primary pl-4">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time} • {activity.project}</p>
                    </div>
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