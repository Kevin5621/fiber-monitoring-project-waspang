import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { DailyReport } from '@/data/project/reports';

export const reportsService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<DailyReport[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data: reportsData, error: reportsError } = await supabase
      .from('daily_reports')
      .select('*');
    
    if (reportsError) {
      console.error('Error fetching reports:', reportsError);
      return [];
    }
    
    const reports: DailyReport[] = [];
    
    for (const report of reportsData) {
      // Get activities for this report
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('report_activities')
        .select('activity')
        .eq('report_id', report.id);
      
      if (activitiesError) {
        console.error(`Error fetching activities for report ${report.id}:`, activitiesError);
        continue;
      }
      
      // Get issues for this report
      const { data: issuesData, error: issuesError } = await supabase
        .from('report_issues')
        .select('issue')
        .eq('report_id', report.id);
      
      if (issuesError) {
        console.error(`Error fetching issues for report ${report.id}:`, issuesError);
        continue;
      }
      
      // Get materials for this report
      const { data: materialsData, error: materialsError } = await supabase
        .from('report_materials')
        .select('name, quantity')
        .eq('report_id', report.id);
      
      if (materialsError) {
        console.error(`Error fetching materials for report ${report.id}:`, materialsError);
      }
      
      // Get photos for this report
      const { data: photosData, error: photosError } = await supabase
        .from('report_photos')
        .select('id, url, type, caption')
        .eq('report_id', report.id);
      
      if (photosError) {
        console.error(`Error fetching photos for report ${report.id}:`, photosError);
      }
      
      reports.push({
        id: report.id,
        title: report.title,
        project: report.project,
        projectId: report.project_id,
        submittedBy: report.submitted_by,
        submittedAt: new Date(report.submitted_at),
        status: report.status as 'draft' | 'in-review' | 'approved' | 'rejected',
        progress: report.progress,
        activities: activitiesData.map((a: any) => a.activity),
        issues: issuesData.map((i: any) => i.issue),
        nextPlan: report.next_plan,
        materials: materialsData?.length ? materialsData : undefined,
        photos: photosData?.length ? photosData.map((p: any) => ({
          id: p.id,
          url: p.url,
          type: p.type as 'equipment' | 'process' | 'result' | 'location',
          caption: p.caption
        })) : undefined
      });
    }
    
    return reports;
  },
  
  async getByProjectId(projectId: number, supabaseClient?: SupabaseClient): Promise<DailyReport[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data: reportsData, error: reportsError } = await supabase
      .from('daily_reports')
      .select('*')
      .eq('project_id', projectId);
    
    if (reportsError) {
      console.error(`Error fetching reports for project ${projectId}:`, reportsError);
      return [];
    }
    
    const reports: DailyReport[] = [];
    
    for (const report of reportsData) {
      // Get activities for this report
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('report_activities')
        .select('activity')
        .eq('report_id', report.id);
      
      if (activitiesError) {
        console.error(`Error fetching activities for report ${report.id}:`, activitiesError);
        continue;
      }
      
      // Get issues for this report
      const { data: issuesData, error: issuesError } = await supabase
        .from('report_issues')
        .select('issue')
        .eq('report_id', report.id);
      
      if (issuesError) {
        console.error(`Error fetching issues for report ${report.id}:`, issuesError);
        continue;
      }
      
      reports.push({
        id: report.id,
        title: report.title,
        project: report.project,
        projectId: report.project_id,
        submittedBy: report.submitted_by,
        submittedAt: new Date(report.submitted_at),
        status: report.status as 'draft' | 'in-review' | 'approved' | 'rejected',
        progress: report.progress,
        activities: activitiesData.map((a: any) => a.activity),
        issues: issuesData.map((i: any) => i.issue),
        nextPlan: report.next_plan
      });
    }
    
    return reports;
  }
};