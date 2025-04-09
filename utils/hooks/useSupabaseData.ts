import { useState, useEffect } from 'react';
import { 
  projectsService, 
  milestonesService, 
  documentsService, 
  reportsService, 
  locationsService, 
  activitiesService, 
  statsService 
} from '../supabase/services';

type FetchFunction<T> = () => Promise<T>;
type FetchByIdFunction<T> = (id: number) => Promise<T>;

interface UseSupabaseDataOptions {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useSupabaseData<T>(
  fetchFn: FetchFunction<T>,
  options: UseSupabaseDataOptions = {}
) {
  const { enabled = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      if (onError) onError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useSupabaseDataById<T>(
  fetchByIdFn: FetchByIdFunction<T>,
  id: number,
  options: UseSupabaseDataOptions = {}
) {
  const { enabled = true, onSuccess, onError } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use the fetchByIdFn with the id parameter
      const result = await fetchByIdFn(id);
      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      if (onError) onError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && id) {
      fetchData();
    }
  }, [enabled, id]);

  return { data, isLoading, error, refetch: fetchData };
}

// Specialized hooks for each service
export function useProjects(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(projectsService.getAll, options);
}

export function useProject(id: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(projectsService.getById, id, options);
}

export function useMilestones(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(milestonesService.getAll, options);
}

export function useProjectMilestones(projectId: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(milestonesService.getByProjectId, projectId, options);
}

export function useDocuments(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(documentsService.getAll, options);
}

export function useProjectDocuments(projectId: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(documentsService.getByProjectId, projectId, options);
}

export function useReports(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(reportsService.getAll, options);
}

export function useProjectReports(projectId: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(reportsService.getByProjectId, projectId, options);
}

export function useLocations(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(locationsService.getAll, options);
}

export function useProjectLocations(projectId: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(locationsService.getByProjectId, projectId, options);
}

export function useActivities(options: UseSupabaseDataOptions = {}) {
  return useSupabaseData(activitiesService.getAll, options);
}

export function useProjectActivities(projectId: number, options: UseSupabaseDataOptions = {}) {
  return useSupabaseDataById(activitiesService.getByProjectId, projectId, options);
}

export function useStats(currentDate?: Date, options: UseSupabaseDataOptions = {}) {
  const fetchStats = () => statsService.calculateStats(currentDate);
  return useSupabaseData(fetchStats, options);
}