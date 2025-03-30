"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { MilestoneChart } from '@/components/dashboard/milestone/MilestoneChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { PriorityTaskCard } from '@/components/dashboard/PriorityTaskCard';
import { MilestoneCard } from '@/components/dashboard/MilestoneCard';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { ActivityItem } from '@/components/dashboard/ActivityItem';
import { useDateTimeFormatter } from '@/hooks/useDateTimeFormatter';
import { mockData } from '@/data/dashboardData';
import { StatProps, PriorityTaskProps, MilestoneProps, DocumentProps, ActivityProps } from '@/components/dashboard/types';

// Define the dashboard data type
interface DashboardData {
  priorityTasks: PriorityTaskProps['task'][];
  stats: StatProps[];
  milestones: MilestoneProps['milestone'][];
  documents: DocumentProps['doc'][];
  activities: ActivityProps['activity'][];
}

const DashboardPage = () => {
  // State to hold dashboard data with proper typing
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  // Use custom hook for date/time formatting
  const { currentDate, formattedDate, formattedTime } = useDateTimeFormatter();
  
  // Initialize dashboard data on client-side only
  useEffect(() => {
    const data = mockData(currentDate);
    setDashboardData(data);
  }, [currentDate]);

  // Return loading state if data isn't ready
  if (!dashboardData) {
    return <div className="container mx-auto p-6">Loading dashboard...</div>;
  }

  // Destructure data after it's available
  const { priorityTasks, stats, milestones, documents, activities } = dashboardData;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header with Date and Time */}
      <div className="mb-4 sm:mb-6 flex justify-end">
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          <div className="bg-secondary/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="bg-secondary/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
            <span className="font-medium">{formattedTime}</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        {stats.map((stat: StatProps, i: number) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      {/* Priority Tasks */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-semibold">Prioritas Hari Ini</h2>
        </div>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 hidden">
          {priorityTasks.map((task: PriorityTaskProps['task'], i: number) => (
            <PriorityTaskCard key={i} task={task} />
          ))}
        </div>
        {/* Mobile horizontal scrollable version */}
        <div className="flex overflow-x-auto pb-2 gap-3 sm:hidden">
          {priorityTasks.map((task: PriorityTaskProps['task'], i: number) => (
            <div key={i} className="min-w-[280px] flex-shrink-0">
              <PriorityTaskCard task={task} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="mb-6">
        <Tabs defaultValue="milestones" className="w-full">
          <div className="border-b mb-4 sm:mb-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="milestones">Milestone</TabsTrigger>
              <TabsTrigger value="reports">Laporan</TabsTrigger>
              <TabsTrigger value="docs">Dokumentasi</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Milestones Tab */}
          <TabsContent value="milestones" className="pt-2">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">Timeline Milestone</h3>
            </div>
            
            {/* Milestone Timeline Chart */}
            <Card className="mb-6 transition-all duration-200 hover:shadow-lg">
              <CardContent className="p-3 sm:p-6">
                <div className="overflow-x-auto">
                  <MilestoneChart milestones={milestones} />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold">Milestone Aktif</h3>
              <div className="flex gap-2 text-xs sm:text-sm">
                <Badge variant="outline" className="bg-primary/10">
                  <CheckCircle className="h-3 w-3 mr-1" /> Pada Jadwal
                </Badge>
                <Badge variant="outline" className="bg-destructive/10 text-destructive">
                  <AlertCircle className="h-3 w-3 mr-1" /> Terlambat
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {milestones.slice(0, 3).map((milestone, i) => (
                <MilestoneCard key={i} milestone={milestone} />
              ))}
            </div>
          </TabsContent>
          
          {/* Reports Tab */}
          <TabsContent value="reports" className="pt-2">
            <Card className="transition-all duration-200 hover:shadow-lg border-t-4 border-t-warning">
              <CardHeader className="pb-2 pt-4 sm:pt-6">
                <CardTitle className="text-lg sm:text-xl">Laporan Harian</CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-lg bg-warning/10 flex items-center justify-center mr-3 sm:mr-4">
                      <Calendar className="h-5 w-5 sm:h-7 sm:w-7 text-warning" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base sm:text-lg">{formattedDate}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">Laporan belum dibuat</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-warning/10 text-warning">
                    Belum Dibuat
                  </Badge>
                </div>
                <Button className="w-full text-sm sm:text-base">
                  Buat Laporan Hari Ini
                </Button>
                
                <Separator className="my-4 sm:my-8" />
                
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-base sm:text-lg">Riwayat Laporan</h4>
                    <Link href="/dashboard/reports" className="text-xs sm:text-sm text-primary flex items-center hover:underline">
                      Lihat Semua <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {['28 Mar 2025', '27 Mar 2025'].map((date, i) => (
                    <div key={i} className="flex items-center justify-between py-2 sm:py-4 border-b border-border last:border-0">
                      <div className="flex items-center">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 sm:mr-4">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <span className="font-medium text-sm sm:text-base">{date}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary text-xs sm:text-sm">
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
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold">Dokumentasi Dibutuhkan</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {documents.map((doc, i) => (
                <DocumentCard key={i} doc={doc} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold">Aktivitas Terakhir</h3>
          <Link href="/dashboard/activity" className="text-xs sm:text-sm text-primary flex items-center hover:underline">
            Lihat Semua <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
        
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardContent className="p-3 sm:p-6">
            <ul className="divide-y divide-border">
              {activities.map((activity, i) => (
                <ActivityItem key={i} activity={activity} />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;