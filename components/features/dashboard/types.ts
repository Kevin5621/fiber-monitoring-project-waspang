import { ReactNode } from 'react';
import { ProjectLocation } from '@/data/dashboardData';

// Milestone Types
export interface MilestoneProps {
  milestone: {
    id: number;
    name: string;
    project: string;
    deadline: string;
    startDate: string;
    icon: ReactNode;
    description?: string;
    // Document tracking properties
    requiredDocs: number;
    uploadedDocs: number;
    documents?: DocumentProps['doc'][];
  };
}

// Document Types
export interface DocumentProps {
  doc?: {
    name: string;
    project: string;
    deadline: string;
  };
  isAddCard?: boolean;
  onAddDocument?: (name: string, milestoneId: string) => void;
}

// Map Types
// Area classification for projects
export interface ProjectArea {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  projects: number[]; // Array of project IDs in this area
}

// Define cable connection type
export interface CableConnection {
  id: string;
  from: number; // Project location ID
  to: number; // Project location ID
  isDocumented: boolean;
  milestoneId: number;
}

// Define filter options
export interface FilterOptions {
  area: string | null;
  category: string | null;
  documentationStatus: boolean | null;
}

// Project Map Props
export interface ProjectMapProps {
  className?: string;
  projectLocations: ProjectLocation[];
  milestones?: any[]; // Optional milestone data
}

// Location Filters Props
export interface LocationFiltersProps {
  projectLocations: ProjectLocation[];
  selectedArea: string | null;
  setSelectedArea: (area: string | null) => void;
  navigateMap: (action: string, params: any) => void;
}
