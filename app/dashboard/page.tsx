"use client"

import React from 'react';
import { Calendar, Clock, FileText, Folder, ChevronRight, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const DashboardPage = () => {
  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
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
      project: '29 Mar 2025', 
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
      color: 'primary' 
    },
    { 
      title: 'Milestone', 
      value: '2', 
      icon: <Clock className="h-5 w-5" />, 
      color: 'warning' 
    },
    { 
      title: 'Dokumentasi Tertunda', 
      value: '5', 
      icon: <FileText className="h-5 w-5" />, 
      color: 'destructive' 
    }
  ];

  const milestones = [
    { 
      name: 'Persiapan Alat', 
      project: 'Fiber Optik Jl. Sudirman', 
      progress: 80, 
      deadline: '29 Mar 2025', 
      status: 'Pada Jadwal',
      icon: <CheckCircle className="h-4 w-4" />
    },
    { 
      name: 'Pemasangan Kabel', 
      project: 'Fiber Optik Tebet', 
      progress: 45, 
      deadline: '28 Mar 2025', 
      status: 'Terlambat',
      icon: <AlertCircle className="h-4 w-4" />
    },
    { 
      name: 'Dokumentasi Penutupan', 
      project: 'Fiber Optik Kemang', 
      progress: 20, 
      deadline: '01 Apr 2025', 
      status: 'Pada Jadwal',
      icon: <CheckCircle className="h-4 w-4" />
    }
  ];

  const documents = [
    { name: 'Foto Pemasangan Kabel', project: 'Fiber Optik Tebet', deadline: '29 Mar 2025' },
    { name: 'Foto Label Kabel', project: 'Fiber Optik Sudirman', deadline: '30 Mar 2025' },
    { name: 'Foto Penutupan Galian', project: 'Fiber Optik Kemang', deadline: '01 Apr 2025' }
  ];

  const activities = [
    { action: 'Upload foto pemasangan', time: '2 jam lalu', project: 'Fiber Optik Kemang' },
    { action: 'Laporan harian dikirim', time: 'Kemarin, 16:32', project: 'Fiber Optik Sudirman' },
    { action: 'Milestone selesai', time: 'Kemarin, 10:15', project: 'Fiber Optik Menteng' }
  ];

  return (
    <div className="space-y-6 px-6 py-6">
      {/* Header with Date */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="bg-secondary/50 px-4 py-2 rounded-lg flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
      </div>

      {/* Priority tasks */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* Stats Overview - Redesigned */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
                  {React.cloneElement(stat.icon, { className: `text-${stat.color}` })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground truncate">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
              </div>
              <div className={`h-1 w-full bg-${stat.color}/20 mt-3 rounded-full overflow-hidden`}>
                <div 
                  className={`h-full bg-${stat.color}`} 
                  style={{ 
                    width: stat.title === 'Proyek Aktif' ? '60%' : 
                           stat.title === 'Milestone' ? '40%' : '100%' 
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for content */}
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="milestones">Milestone</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
          <TabsTrigger value="docs">Dokumentasi</TabsTrigger>
        </TabsList>
        
        {/* Milestones Tab */}
        <TabsContent value="milestones" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Milestone Aktif</h3>
            <Link href="/dashboard/milestones" className="text-sm text-primary flex items-center hover:underline">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {milestones.map((milestone, i) => (
              <Card key={i} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center mr-4 ${
                      milestone.status === 'Terlambat' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{milestone.name}</h4>
                        <Badge variant={milestone.status === 'Terlambat' ? 'destructive' : 'outline'}>
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.project}</p>
                      <p className="text-xs text-muted-foreground mt-1">Tenggat: {milestone.deadline}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span>Progress</span>
                          <span className="font-medium">{milestone.progress}%</span>
                        </div>
                        <Progress 
                          value={milestone.progress} 
                          className={`h-2 ${
                            milestone.status === 'Terlambat' 
                              ? 'bg-destructive/20' 
                              : milestone.progress > 75 
                                ? 'bg-primary/20' 
                                : 'bg-warning/20'
                          }`} 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="pt-4">
          <Card className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Laporan Harian</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium">29 Maret 2025</h4>
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
              
              <Separator className="my-6" />
              
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Riwayat Laporan</h4>
                  <Link href="/dashboard/reports" className="text-sm text-primary flex items-center hover:underline">
                    Lihat Semua <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                {['28 Mar 2025', '27 Mar 2025'].map((date, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
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
        <TabsContent value="docs" className="pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Dokumentasi Dibutuhkan</h3>
            <Link href="/dashboard/documentation" className="text-sm text-primary flex items-center hover:underline">
              Lihat Semua <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {documents.map((doc, i) => (
              <Card key={i} className="transition-all duration-200 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{doc.name}</h4>
                        <Badge variant="destructive" className="ml-2">Diperlukan</Badge>
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

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Aktivitas Terakhir</h3>
          <Link href="/dashboard/activity" className="text-sm text-primary flex items-center hover:underline">
            Lihat Semua <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {activities.map((activity, i) => (
                <li key={i} className="flex items-start border-l-2 border-primary pl-4 py-1">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time} • {activity.project}</p>
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