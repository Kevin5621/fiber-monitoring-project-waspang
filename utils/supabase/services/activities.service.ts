import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { ProjectActivity } from '@/data/project/activities';

export const activitiesService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<ProjectActivity[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('activities')
      .select('*');
    
    if (error) {
      console.error('Error fetching activities:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      action: item.action,
      time: item.time,
      project: item.project,
      projectId: item.project_id,
      user: item.user_name
    }));
  },
  
  async getByProjectId(projectId: number, supabaseClient?: SupabaseClient): Promise<ProjectActivity[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) {
      console.error(`Error fetching activities for project ${projectId}:`, error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      action: item.action,
      time: item.time,
      project: item.project,
      projectId: item.project_id,
      user: item.user_name
    }));
  }
};