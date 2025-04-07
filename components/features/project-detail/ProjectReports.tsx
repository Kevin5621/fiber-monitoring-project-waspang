import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DailyReport } from "@/data/project/reports";
import { formatDate, formatDateTime } from "@/lib/utils";

interface ProjectReportsProps {
  reports: DailyReport[];
}

export default function ProjectReports({ reports }: ProjectReportsProps) {
  const getStatusBadge = (status: DailyReport['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'in-review':
        return <Badge className="bg-blue-500">In Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejected</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p className="text-muted-foreground">No reports found for this project.</p>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted by {report.submittedBy} at {formatDateTime(report.submittedAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(report.status)}
                        <Badge variant="outline">{report.progress}%</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Activities</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {report.activities.map((activity, index) => (
                          <li key={index} className="text-sm">{activity}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Issues</h4>
                      {report.issues.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                          {report.issues.map((issue, index) => (
                            <li key={index} className="text-sm">{issue}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No issues reported</p>
                      )}
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">Next Plan</h4>
                    <p className="text-sm">{report.nextPlan}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}