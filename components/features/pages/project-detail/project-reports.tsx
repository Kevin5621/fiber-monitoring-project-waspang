import { Card } from "@/components/common/ui/card";
import { DailyReport } from "@/data/project/reports";
import { formatDate, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Search, FileText, ChevronDown, ChevronUp, Calendar, User, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ProjectReportsProps {
  reports: DailyReport[];
}

export default function ProjectReports({ reports }: ProjectReportsProps) {
  const [expandedReports, setExpandedReports] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<DailyReport['status'] | 'all'>('all');

  // Sort reports by date (newest first)
  const sortedReports = [...reports].sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  // Filter reports based on search and status
  const filteredReports = sortedReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || report.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleReport = (reportId: number) => {
    setExpandedReports(prev => 
      prev.includes(reportId) ? prev.filter(id => id !== reportId) : [...prev, reportId]
    );
  };

  const getStatusBadge = (status: DailyReport['status']) => {
    const statusConfig = {
      approved: { bg: "bg-emerald-50 dark:bg-emerald-950/50", text: "text-emerald-700 dark:text-emerald-300", icon: "✓" },
      'in-review': { bg: "bg-blue-50 dark:bg-blue-950/50", text: "text-blue-700 dark:text-blue-300", icon: "⟳" },
      rejected: { bg: "bg-red-50 dark:bg-red-950/50", text: "text-red-700 dark:text-red-300", icon: "×" },
      draft: { bg: "bg-gray-50 dark:bg-gray-900", text: "text-gray-700 dark:text-gray-300", icon: "◯" }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className="mr-1">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {['all', 'approved', 'in-review', 'rejected', 'draft'].map((status) => (
            <Button
              key={status}
              variant={activeFilter === status ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(status as DailyReport['status'] | 'all')}
              className="flex-1 sm:flex-none"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid gap-4">
        {filteredReports.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
            <p className="text-sm text-muted-foreground">There are no daily reports available for this project yet.</p>
          </Card>
        ) : (
          filteredReports.map((report) => {
            const isExpanded = expandedReports.includes(report.id);
            
            return (
              <Card 
                key={report.id} 
                className={`transition-all duration-200 ${isExpanded ? 'ring-2 ring-primary/10' : ''}`}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleReport(report.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(report.status)}
                        <span className="text-sm text-muted-foreground">#{report.id}</span>
                      </div>
                      <h3 className="text-lg font-medium truncate mb-1">{report.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {report.submittedBy}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(report.submittedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDateTime(report.submittedAt).split(' ')[1]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Activities</h4>
                        <ul className="space-y-2">
                          {report.activities.map((activity, index) => (
                            <li key={index} className="flex gap-2 text-sm">
                              <span className="text-primary">•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Issues</h4>
                        {report.issues.length > 0 ? (
                          <ul className="space-y-2">
                            {report.issues.map((issue, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-destructive">
                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No issues reported</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Next Plan</h4>
                      <p className="text-sm bg-muted/50 p-3 rounded-md">{report.nextPlan}</p>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}