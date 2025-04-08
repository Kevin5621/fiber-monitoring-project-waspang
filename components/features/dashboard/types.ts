import { ReactNode } from 'react';

// Milestone Types
export interface MilestoneProps {
  milestone: {
    id: number;
    name: string;
    project: string;
    icon: ReactNode;
    description?: string;
    // Document tracking properties
    documents?: DocumentProps['doc'][];
    requiredPhotos?: {
      name: string;
      uploaded: boolean;
    }[];
  };
}

// Document Types
// Add or update this interface in your types file
export interface DocumentProps {
  doc?: {
    name: string;
    project: string;
    milestoneId?: string;
  };
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
  milestoneId?: number; 
}

// Define filter options
export interface FilterOptions {
  area: string | null;
  category: string | null;
  documentationStatus: boolean | null;
}
