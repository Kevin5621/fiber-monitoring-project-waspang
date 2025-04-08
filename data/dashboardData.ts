import { getDocuments } from './project/documents';
import { getMilestones } from './project/milestones';
import { getActivities } from './project/activities';
import { calculateStats } from './project/stats';

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
  };
};