import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle, Calendar, Download, FileText } from 'lucide-react';
import { PaginationControl } from '@/components/features/common/pagination-control';
import { Report } from './types';
import { StatusBadge } from './status-badge';

interface ReportsTabProps {
  filteredReports: Report[];
}

const ReportsTab = ({ filteredReports }: ReportsTabProps) => {
  const [reportsPage, setReportsPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(8);
  
  // Pagination calculations for reports
  const reportsStartIndex = (reportsPage - 1) * reportsPerPage;
  const reportsEndIndex = Math.min(reportsStartIndex + reportsPerPage - 1, filteredReports.length - 1);
  const reportsTotalPages = Math.ceil(filteredReports.length / reportsPerPage);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          {filteredReports.length > 0 ? (
            filteredReports
              .slice(reportsStartIndex, reportsStartIndex + reportsPerPage)
              .map((report) => (
                <div key={report.id} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{report.title}</h3>
                        <StatusBadge status={report.status} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Disubmit oleh: {report.submittedBy} pada {report.date} ({report.submittedAt})
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Unduh Laporan
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        Aktivitas
                      </h4>
                      <ul className="text-sm space-y-1">
                        {report.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0"></span>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-muted/30 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                        Kendala
                      </h4>
                      <ul className="text-sm space-y-1">
                        {report.issues && report.issues.length > 0 ? (
                          report.issues.map((issue, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 mr-2 flex-shrink-0"></span>
                              <span>{issue}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-muted-foreground">Tidak ada kendala</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      Rencana Selanjutnya
                    </h4>
                    <p className="text-sm">{report.nextPlan}</p>
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada laporan ditemukan</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Tidak ada laporan yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
          
          {filteredReports.length > 0 && (
            <PaginationControl
              currentPage={reportsPage}
              totalPages={reportsTotalPages}
              itemsPerPage={reportsPerPage}
              totalItems={filteredReports.length}
              startIndex={reportsStartIndex}
              endIndex={reportsEndIndex}
              canGoBack={reportsPage > 1}
              canGoForward={reportsPage < reportsTotalPages}
              onPageChange={setReportsPage}
              onItemsPerPageChange={setReportsPerPage}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsTab;