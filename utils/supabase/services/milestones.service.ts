import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserSupabaseClient } from '../browser-client';
import { ProjectMilestone } from '@/data/project/milestones';
import { CheckCircle, AlertCircle, Clock, CircleIcon } from 'lucide-react';
import React from 'react';

export const milestonesService = {
  async getAll(supabaseClient?: SupabaseClient): Promise<ProjectMilestone[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('milestones')
      .select(`
        *,
        required_photos (*)
      `);
    
    if (error) {
      console.error('Error fetching milestones:', error);
      return [];
    }
    
    return data.map(item => {
      // Convert icon string to React element
      let iconElement;
      switch (item.icon) {
        case 'CheckCircle':
          iconElement = React.createElement(CheckCircle, { className: "h-4 w-4" });
          break;
        case 'AlertCircle':
          iconElement = React.createElement(AlertCircle, { className: "h-4 w-4" });
          break;
        case 'Clock':
          iconElement = React.createElement(Clock, { className: "h-4 w-4" });
          break;
        default:
          iconElement = React.createElement(CircleIcon, { className: "h-4 w-4" });
      }
      
      return {
        id: item.id,
        name: item.name,
        project: item.project,
        projectId: item.project_id,
        icon: iconElement,
        progress: item.progress,
        documents: [], // This will be populated separately if needed
        requiredPhotos: item.required_photos.map((photo: any) => ({
          name: photo.name,
          uploaded: photo.uploaded
        }))
      };
    });
  },
  
  async getByProjectId(projectId: number, supabaseClient?: SupabaseClient): Promise<ProjectMilestone[]> {
    const supabase = supabaseClient || createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('milestones')
      .select(`
        *,
        required_photos (*)
      `)
      .eq('project_id', projectId);
    
    if (error) {
      console.error(`Error fetching milestones for project ${projectId}:`, error);
      return [];
    }
    
    return data.map(item => {
      // Convert icon string to React element
      let iconElement;
      switch (item.icon) {
        case 'CheckCircle':
          iconElement = React.createElement(CheckCircle, { className: "h-4 w-4" });
          break;
        case 'AlertCircle':
          iconElement = React.createElement(AlertCircle, { className: "h-4 w-4" });
          break;
        case 'Clock':
          iconElement = React.createElement(Clock, { className: "h-4 w-4" });
          break;
        default:
          iconElement = React.createElement(CircleIcon, { className: "h-4 w-4" });
      }
      
      return {
        id: item.id,
        name: item.name,
        project: item.project,
        projectId: item.project_id,
        icon: iconElement,
        progress: item.progress,
        documents: [], // This will be populated separately if needed
        requiredPhotos: item.required_photos.map((photo: any) => ({
          name: photo.name,
          uploaded: photo.uploaded
        }))
      };
    });
  }
};