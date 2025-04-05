import { ProjectLocation } from './types';
import { projectLocations } from './project/locations';
import { getDocuments } from './project/documents';
import { getMilestones } from './project/milestones';
import { getActivities } from './project/activities';
import { calculateStats } from './project/stats';

export type { ProjectLocation };
export { projectLocations };

export const mockData = (currentDate: Date) => {
  const documents = getDocuments(currentDate);
  const milestones = getMilestones(currentDate);
  const activities = getActivities();
  const { stats, mobileStats } = calculateStats(currentDate);

  return {
    stats,
    mobileStats,
    milestones,
    documents,
    activities,
    projectLocations
  };
};