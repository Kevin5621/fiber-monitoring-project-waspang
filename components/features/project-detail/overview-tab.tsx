import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Milestone, Report } from './types';
import DocumentationChart from './documentation-chart';
import { StatusIcon } from './status-badge';

interface OverviewTabProps {
  projectMilestones: Milestone[];
  projectReports: Report[];
  setActiveTab: (tab: string) => void;
  documentationPercentage: number;
}

const OverviewTab = ({ projectMilestones, projectReports, setActiveTab, documentationPercentage }: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Milestone Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectMilestones.filter(m => m.status === 'Pada Jadwal' || m.status === 'Terlambat').slice(0, 2).map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  milestone.status === 'Selesai' ? 'bg-success-100' : 
                  milestone.status === 'Pada Jadwal' ? 'bg-info-100' : 
                  milestone.status === 'Terlambat' ? 'bg-amber-100' :
                  'bg-muted/50-100'
                }`}>
                  {milestone.requiredPhotos ? (
                    <DocumentationChart 
                      percentage={
                        milestone.requiredPhotos.length > 0 
                          ? Math.round((milestone.requiredPhotos.filter(p => p.uploaded).length / milestone.requiredPhotos.length) * 100)
                          : 0
                      } 
                      size="sm" 
                    />
                  ) : (
                    <StatusIcon status={milestone.status} />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium">{milestone.name}</h3>
                    <div>
                      <div className="text-xs bg-background/80 px-2 py-1 rounded-full">
                        {milestone.requiredPhotos ? (
                          <span>
                            {milestone.requiredPhotos.filter(p => p.uploaded).length}/{milestone.requiredPhotos.length} Dokumen
                          </span>
                        ) : '0/0 Dokumen'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Tenggat: {milestone.deadline}</div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{milestone.progress || 0}%</span>
                    </div>
                    <Progress value={milestone.progress || 0} className="h-1.5" />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setActiveTab('milestones')}>
              Lihat Semua Milestone
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectReports.slice(0, 2).map((report) => (
              <div key={report.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1">{report.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DocumentationChart percentage={documentationPercentage} size="sm" />
                    <span className="text-xs">{documentationPercentage}%</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {report.activities[0]}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setActiveTab('reports')}>
              Lihat Semua Laporan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;