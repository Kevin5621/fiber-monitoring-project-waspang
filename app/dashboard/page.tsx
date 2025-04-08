"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentCard } from '@/components/features/dashboard/common/document-card';
import { StatCard, StatProps } from '@/components/features/dashboard/common/stat-card';
import { MilestoneChart } from '@/components/features/dashboard/common/milestone-card';
import { useDateTimeFormatter } from '@/hooks/useDateTimeFormatter';
import { mockData } from '@/data/dashboardData';
import { MilestoneProps, DocumentProps } from '@/components/features/dashboard/types';
import { DashboardSkeleton } from '@/components/features/dashboard/DashboardSkeleton';
import { TabNotification } from '@/components/features/common/tab-notification';
import { DailyReportCard } from '@/components/features/dashboard/common/daily-report-card';
import { projects } from '@/data/project/projects';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { poleLocations } from '@/data/project/locations';
import { Card, CardContent } from '@/components/ui/card';
import { milestones } from '@/data/project/milestones';

// Define the dashboard data type
interface DashboardData {
  stats: StatProps[];
  mobileStats: StatProps[];
  milestones: MilestoneProps['milestone'][];
  documents: DocumentProps['doc'][];
}

// Define a type for pending photos
interface PendingPhoto {
  name: string;
  milestoneId: number;
  milestoneName: string;
  project: string;
}

// Import map component dynamically to avoid SSR issues
const ProjectMap = dynamic(
  () => import('@/components/features/common/map/project-map'),
  { ssr: false }
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { currentDate, formattedDate, formattedTime } = useDateTimeFormatter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [pendingPhotos, setPendingPhotos] = useState<PendingPhoto[]>([]);
  
  // Add this effect to handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Add type for the photo object
  interface MilestonePhoto {
    name: string;
    uploaded: boolean;
  }
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Get data directly without delay
        const data = mockData(currentDate);
        setDashboardData(data);
        
        // Extract pending photos from milestones
        if (data.milestones) {
          const photos: PendingPhoto[] = [];
          data.milestones.forEach(milestone => {
            if (milestone.requiredPhotos) {
              milestone.requiredPhotos
                .filter((photo: MilestonePhoto) => !photo.uploaded)
                .forEach((photo: MilestonePhoto) => {
                  photos.push({
                    name: photo.name,
                    milestoneId: milestone.id,
                    milestoneName: milestone.name,
                    project: milestone.project
                  });
                });
            }
          });
          setPendingPhotos(photos);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        // Set loading to false immediately
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [currentDate]);

  const handleUploadPhoto = (photoName: string, milestoneId: string) => {
    if (!dashboardData) return;
    
    const milestoneIdNum = parseInt(milestoneId, 10);
    
    // Update the milestone data to mark the photo as uploaded
    const updatedMilestones = dashboardData.milestones.map(milestone => {
      if (milestone.id === milestoneIdNum && milestone.requiredPhotos) {
        const updatedPhotos = milestone.requiredPhotos.map((photo: MilestonePhoto) => {
          if (photo.name === photoName) {
            return { ...photo, uploaded: true };
          }
          return photo;
        });
        
        return { ...milestone, requiredPhotos: updatedPhotos };
      }
      return milestone;
    });
    
    // Update dashboard data with the updated milestones
    setDashboardData({
      ...dashboardData,
      milestones: updatedMilestones
    });
    
    // Update pending photos list
    setPendingPhotos(prevPhotos => 
      prevPhotos.filter(photo => 
        !(photo.name === photoName && photo.milestoneId === milestoneIdNum)
      )
    );
    
    // Show success message
    const milestone = dashboardData.milestones.find(m => m.id === milestoneIdNum);
    alert(`Foto "${photoName}" berhasil diunggah untuk milestone "${milestone?.name}"`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      {/* Header with Date and Time */}
      <div className="mb-4 sm:mb-6 flex justify-end">
        <div className="flex flex-row gap-2 text-xs sm:text-sm">
          {['date', 'time'].map((type, i) => (
            <div key={i} className="bg-secondary/50 px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center">
              {type === 'date' ? 
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" /> : 
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
              }
              <span className="font-medium">
                {isMounted ? (type === 'date' ? formattedDate : formattedTime) : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          {/* Stats Overview - Desktop & Mobile */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 mb-6">
            {dashboardData?.stats.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4 sm:hidden">
            {dashboardData?.mobileStats.map((stat, i) => <StatCard key={i} stat={stat} />)}
          </div>    

          {/* Project Map Overview */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-semibold">Lokasi Proyek</h2>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="h-[600px] w-full">
                  <ProjectMap 
                    projectLocations={poleLocations}
                    milestones={milestones}
                    onPoleClick={(pole) => {}}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <div className="mb-6">
            <Tabs defaultValue="milestones" className="w-full">
              <div className="mb-4 sm:mb-6">
                <TabsList className="grid grid-cols-3 w-full">
                  {['milestones', 'reports', 'docs'].map((tab, i) => (
                    <TabsTrigger 
                      key={i} 
                      value={tab} 
                      className={cn(
                        "flex items-center justify-center gap-2",
                        "transition-all duration-200",
                        "whitespace-nowrap overflow-hidden",
                        tab === 'docs' && pendingPhotos.length > 0 && "text-destructive"
                      )}
                    >
                      <span className="truncate">
                        {tab === 'milestones' ? 'Milestone' : tab === 'reports' ? 'Laporan' : (
                          <div className="flex items-center">
                            <span className="truncate">Dokumentasi</span>
                            <TabNotification count={pendingPhotos.length} />
                          </div>
                        )}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {/* Update TabsContent wrapper styles */}
              <div className="overflow-hidden">

                {/* Milestones Tab */}
                <TabsContent value="milestones" className="pt-2">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold">Timeline Milestone</h3>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <MilestoneChart milestones={dashboardData?.milestones || []} />
                  </div>
                </TabsContent>
                
                {/* Reports Tab */}
                <TabsContent value="reports" className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects
                      .filter(project => !project.isCompleted)
                      .map((project) => (
                        <DailyReportCard 
                          key={project.id}
                          project={project}
                          currentDate={currentDate}
                        />
                      ))}
                  </div>
                </TabsContent>
                
                {/* Documentation Tab */}
                <TabsContent value="docs" className="pt-2">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-semibold">Dokumentasi Dibutuhkan</h3>
                  </div>
                  
                  {pendingPhotos.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Semua foto telah diunggah. Tidak ada dokumentasi yang dibutuhkan.</p>
                    </div>
                  ) : (
                    <div className="space-y-8 px-1">
                      {Object.entries(
                        pendingPhotos.reduce((acc, photo) => {
                          const key = `${photo.milestoneId}-${photo.milestoneName}`;
                          if (!acc[key]) acc[key] = [];
                          acc[key].push(photo);
                          return acc;
                        }, {} as Record<string, typeof pendingPhotos>)
                      ).map(([key, photos]) => {
                        const [, milestoneName] = key.split('-');
                        return (
                          <div key={key} className="space-y-4">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-lg">{milestoneName}</h4>
                              <Badge variant="outline" className="text-xs">
                                {photos.length} foto
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {photos.map((photo, i) => (
                                <DocumentCard 
                                  key={i} 
                                  doc={{
                                    name: photo.name,
                                    project: photo.project,
                                    milestoneId: photo.milestoneId.toString()
                                  }} 
                                  onUpload={handleUploadPhoto}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;