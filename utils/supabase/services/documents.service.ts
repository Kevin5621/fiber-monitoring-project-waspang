import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { ProjectDocument } from '@/data/project/documents';

export const documentsService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<ProjectDocument[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('documents')
      .select('*');
    
    if (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      project: item.project,
      projectId: item.project_id,
      type: item.type,
      category: item.category,
      fileType: item.file_type,
      size: item.size,
      uploadedBy: item.uploaded_by,
      uploadDate: new Date(item.upload_date),
      description: item.description
    }));
  },
  
  async getByProjectId(projectId: number, supabaseClient?: SupabaseClient): Promise<ProjectDocument[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('project_id', projectId);
    
    if (error) {
      console.error(`Error fetching documents for project ${projectId}:`, error);
      return [];
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      project: item.project,
      projectId: item.project_id,
      type: item.type,
      category: item.category,
      fileType: item.file_type,
      size: item.size,
      uploadedBy: item.uploaded_by,
      uploadDate: new Date(item.upload_date),
      description: item.description
    }));
  }
};