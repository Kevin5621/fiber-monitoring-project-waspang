import React from 'react';
import { Calendar, ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import { Badge } from '@/components/common/ui/badge';
import { Button } from '@/components/common/ui/button';
import { Separator } from '@/components/common/ui/separator';
import { Project } from '@/data/project/projects';
import { checkMissingDailyReports, DailyReportCheck } from '@/data/project/reports';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface DailyReportCardProps {
  project: Project;
  currentDate: Date;
}

export const DailyReportCard = ({ project, currentDate }: DailyReportCardProps) => {
  const missingReports = checkMissingDailyReports(currentDate);
  const projectReport = missingReports.find((r: DailyReportCheck) => r.projectId === project.id);
  
  return (
    <Card className="overflow-hidden bg-gradient-to-b from-secondary/30 via-accent/20 to-background border-border shadow-md hover:shadow-lg transition-all duration-200">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-primary"></div>
      <CardHeader className="pb-2 pt-6 bg-gradient-to-b from-secondary/20 to-transparent">
        <CardTitle className="text-lg sm:text-xl font-semibold text-foreground/90">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 via-accent/5 to-background flex items-center justify-center backdrop-blur-sm">
              <Calendar className="h-6 w-6 text-primary/80" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground/80">{formatDate(currentDate)}</h4>
              <p className="text-xs text-muted-foreground">
                {projectReport?.hasSubmittedReport ? 'Laporan sudah dibuat' : 'Laporan belum dibuat'}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
              projectReport?.hasSubmittedReport 
                ? "bg-primary/10 text-primary border-primary/20" 
                : "bg-warning/10 text-warning border-warning/20"
            )}
          >
            {projectReport?.hasSubmittedReport ? 'Terkirim' : 'Belum Dibuat'}
          </Badge>
        </div>

        <Button 
          asChild 
          variant={projectReport?.hasSubmittedReport ? "outline" : "default"}
          className={cn(
            "w-full text-sm h-9 backdrop-blur-sm",
            projectReport?.hasSubmittedReport 
              ? "bg-background/50 hover:bg-primary/5" 
              : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary"
          )}
        >
          <Link href={`/dashboard/project/${project.id}/daily-reports/new`}>
            {projectReport?.hasSubmittedReport ? 'Lihat Laporan' : 'Buat Laporan'}
          </Link>
        </Button>
        
        <Separator className="my-6 bg-border/50" />
        
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-sm text-foreground/80">Riwayat Laporan</h4>
          <Link 
            href={`/dashboard/project/${project.id}/daily-reports`} 
            className="text-xs text-primary/80 hover:text-primary flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="space-y-3">
          {['28 Mar 2025', '27 Mar 2025'].map((date, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary/10 via-accent/5 to-background flex items-center justify-center backdrop-blur-sm">
                  <FileText className="h-4 w-4 text-primary/70" />
                </div>
                <span className="text-sm text-foreground/80">{date}</span>
              </div>
              <Badge variant="outline" className="bg-primary/5 text-primary/70 border-primary/10 text-xs backdrop-blur-sm">
                Terkirim
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};