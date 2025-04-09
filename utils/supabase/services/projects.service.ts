import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { Project } from '@/data/project/projects';

export const projectsService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<Project[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*');
    
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      location: item.location,
      startDate: new Date(item.start_date),
      endDate: new Date(item.end_date),
      isCompleted: item.is_completed,
      progress: item.progress,
      milestones: item.milestones,
      completedMilestones: item.completed_milestones,
      pendingDocuments: item.pending_documents,
      description: item.description
    }));
  },
  
  async getById(id: number, supabaseClient?: SupabaseClient): Promise<Project | null> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.name,
      location: data.location,
      startDate: new Date(data.start_date),
      endDate: new Date(data.end_date),
      isCompleted: data.is_completed,
      progress: data.progress,
      milestones: data.milestones,
      completedMilestones: data.completed_milestones,
      pendingDocuments: data.pending_documents,
      description: data.description
    };
  }
};