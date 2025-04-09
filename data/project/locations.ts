import { ProjectMilestone } from './milestones';

export type PoleStatus = 'completed' | 'in-progress' | 'not-started';

export interface PoleLocation {
  id: number;
  name: string;
  coordinates: [number, number]; // [latitude, longitude]
  projectId: number;
  milestoneIds: number[]; // Array of milestone IDs associated with this pole
  description?: string;
  area: string; // City/area name
}

// Helper function to calculate pole status based on milestones
export const getPoleStatus = (pole: PoleLocation, milestones: ProjectMilestone[]): PoleStatus => {
  const poleMilestones = milestones.filter(m => pole.milestoneIds.includes(m.id));
  
  if (poleMilestones.length === 0) return 'not-started';
  
  const allComplete = poleMilestones.every(milestone => 
    milestone.requiredPhotos.every(photo => photo.uploaded)
  );
  
  if (allComplete) return 'completed';
  
  const hasProgress = poleMilestones.some(milestone =>
    milestone.requiredPhotos.some(photo => photo.uploaded)
  );
  
  return hasProgress ? 'in-progress' : 'not-started';
};

// Sample pole locations data
export const poleLocations: PoleLocation[] = [
  // Jakarta - Sudirman
  {
    id: 1,
    name: 'Pole JKT-SDM-001',
    coordinates: [-6.2088, 106.8456],
    projectId: 1,
    milestoneIds: [1, 5],
    description: 'Junction box near Sudirman Central Business District',
    area: 'Jakarta'
  },
  {
    id: 2,
    name: 'Pole JKT-SDM-002',
    coordinates: [-6.2095, 106.8460],
    projectId: 1,
    milestoneIds: [1],
    description: 'Distribution point near Plaza Indonesia',
    area: 'Jakarta'
  },
  // Jakarta - Tebet
  {
    id: 3,
    name: 'Pole JKT-TBT-001',
    coordinates: [-6.2258, 106.8556],
    projectId: 2,
    milestoneIds: [2, 4],
    description: 'Main distribution point Tebet',
    area: 'Jakarta'
  },
  {
    id: 4,
    name: 'Pole JKT-TBT-002',
    coordinates: [-6.2262, 106.8559],
    projectId: 2,
    milestoneIds: [2],
    description: 'Secondary connection point',
    area: 'Jakarta'
  },
  // Jakarta - Kemang
  {
    id: 5,
    name: 'Pole JKT-KMG-001',
    coordinates: [-6.2601, 106.8133],
    projectId: 3,
    milestoneIds: [3],
    description: 'Main hub Kemang Raya',
    area: 'Jakarta'
  }
];

// Helper function to get poles by project ID
export const getPolesByProjectId = (projectId: number): PoleLocation[] => {
  return poleLocations.filter(pole => pole.projectId === projectId);
};

export const getLocationsByProjectId = getPolesByProjectId;

// Helper function to get poles by milestone ID
export const getPolesByMilestoneId = (milestoneId: number): PoleLocation[] => {
  return poleLocations.filter(pole => pole.milestoneIds.includes(milestoneId));
};