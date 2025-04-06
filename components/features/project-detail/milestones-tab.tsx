import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Check, MoreHorizontal, AlertCircle } from 'lucide-react';
import { PaginationControl } from '@/components/features/common/pagination-control';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Milestone } from './types';
import CircularProgress from '../common/circulral-progress';

interface MilestonesTabProps {
  filteredMilestones: Milestone[];
}

// Simple function to determine milestone status based on progress and deadline
const getMilestoneStatus = (milestone: { progress?: number, deadline: string }) => {
  const progress = milestone.progress || 0;
  const deadlineDate = new Date(milestone.deadline);
  const today = new Date();
  
  if (progress >= 100) return 'completed';
  if (deadlineDate < today) return 'at-risk';
  
  // Calculate days remaining
  const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // If less than 3 days remaining and progress < 80%, consider at risk
  if (daysRemaining <= 3 && progress < 80) return 'at-risk';
  
  return 'in-progress';
};

const MilestonesTab = ({ filteredMilestones }: MilestonesTabProps) => {
  const [photosPage, setPhotosPage] = useState(1);
  const [photosPerPage, setPhotosPerPage] = useState(8);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {filteredMilestones.length > 0 ? (
            filteredMilestones.map((milestone) => {
              // Calculate documentation percentage for this milestone
              const totalPhotos = milestone.requiredPhotos?.length || 0;
              const uploadedPhotos = milestone.requiredPhotos?.filter(p => p.uploaded)?.length || 0;
              const docPercentage = totalPhotos > 0 ? Math.round((uploadedPhotos / totalPhotos) * 100) : 0;
              
              // Use milestone progress or documentation percentage
              const progressPercentage = milestone.progress || docPercentage;
              
              return (
                <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10">
                    {/* Replace icon with circular progress */}
                    <CircularProgress percentage={progressPercentage} size="md" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-base font-medium">{milestone.name}</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <div className="text-sm text-muted-foreground">
                            Tenggat: {milestone.deadline}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Mulai: {milestone.startDate}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs bg-background/80 px-2 py-1 rounded-full">
                          {uploadedPhotos}/{totalPhotos} Dokumen
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Milestone</DropdownMenuItem>
                            <DropdownMenuItem>Update Progress</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Upload Dokumentasi</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{milestone.progress || 0}%</span>
                      </div>
                      <Progress value={milestone.progress || 0} className="h-1.5" />
                    </div>
                  
                    {/* Photo Requirements Section */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <h4 className="text-sm font-medium mb-2">Dokumentasi Foto</h4>
                      
                      {milestone.requiredPhotos && milestone.requiredPhotos.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {milestone.requiredPhotos
                              .slice((photosPage - 1) * photosPerPage, (photosPage - 1) * photosPerPage + photosPerPage)
                              .map((photo, idx) => (
                                <div 
                                  key={idx} 
                                  className={`text-xs p-2 rounded-md flex items-center gap-2 ${
                                    photo.uploaded ? 'bg-success-50 text-green-700' : 'bg-muted/30 text-muted-foreground'
                                  }`}
                                >
                                  {photo.uploaded ? (
                                    <Check className="h-3.5 w-3.5 text-green-600" />
                                  ) : (
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                  )}
                                  <span>{photo.name}</span>
                                </div>
                              ))}
                          </div>
                          
                          {milestone.requiredPhotos.length > photosPerPage && (
                            <div className="mt-3">
                              <PaginationControl
                                currentPage={photosPage}
                                totalPages={Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                itemsPerPage={photosPerPage}
                                totalItems={milestone.requiredPhotos.length}
                                startIndex={(photosPage - 1) * photosPerPage}
                                endIndex={Math.min((photosPage - 1) * photosPerPage + photosPerPage - 1, milestone.requiredPhotos.length - 1)}
                                canGoBack={photosPage > 1}
                                canGoForward={photosPage < Math.ceil(milestone.requiredPhotos.length / photosPerPage)}
                                onPageChange={setPhotosPage}
                                onItemsPerPageChange={setPhotosPerPage}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">Tidak ada dokumentasi foto yang diperlukan</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada milestone ditemukan</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Tidak ada milestone yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MilestonesTab;