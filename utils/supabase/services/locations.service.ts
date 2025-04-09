import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { PoleLocation } from '@/data/project/locations';

export const locationsService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<PoleLocation[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('pole_locations')
      .select(`
        *,
        pole_milestones (milestone_id)
      `);
    
    if (error) {
      console.error('Error fetching pole locations:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      coordinates: [item.latitude, item.longitude] as [number, number],
      projectId: item.project_id,
      milestoneIds: item.pole_milestones.map((pm: any) => pm.milestone_id),
      description: item.description,
      area: item.area
    }));
  },
  
  async getByProjectId(projectId: number, supabaseClient?: SupabaseClient): Promise<PoleLocation[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('pole_locations')
      .select(`
        *,
        pole_milestones (milestone_id)
      `)
      .eq('project_id', projectId);
    
    if (error) {
      console.error(`Error fetching pole locations for project ${projectId}:`, error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      coordinates: [item.latitude, item.longitude] as [number, number],
      projectId: item.project_id,
      milestoneIds: item.pole_milestones.map((pm: any) => pm.milestone_id),
      description: item.description,
      area: item.area
    }));
  }
};