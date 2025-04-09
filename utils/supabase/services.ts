// Export all services from the services directory
export { projectsService } from './services/projects.service';
export { milestonesService } from './services/milestones.service';
export { documentsService } from './services/documents.service';
export { reportsService } from './services/reports.service';
export { locationsService } from './services/locations.service';
export { activitiesService } from './services/activities.service';
export { statsService } from './services/stats.service';

// Export data fetching hooks
export * from '../hooks/useSupabaseData';