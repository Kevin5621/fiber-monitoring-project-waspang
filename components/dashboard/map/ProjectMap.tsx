import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

import { ProjectLocation } from '@/data/dashboardData';

// Move all Leaflet imports and related code inside the client component
// This ensures they only run in the browser

// Define types outside to be used by both the dynamic component and its props
// Area classification for projects
interface ProjectArea {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  projects: number[]; // Array of project IDs in this area
}

// Define cable connection type
interface CableConnection {
  id: string;
  from: number; // Project location ID
  to: number; // Project location ID
  status: 'documented' | 'undocumented';
  milestoneId: number;
}

interface ProjectMapProps {
  className?: string;
  projectLocations: ProjectLocation[];
  milestones?: any[]; // Optional milestone data
}

// Create a loading component
const MapLoading = () => (
  <div className="h-full w-full flex items-center justify-center bg-muted/30 rounded-lg">
    <p className="text-muted-foreground">Loading map...</p>
  </div>
);

// Create the client-side only component with all Leaflet imports
const MapComponent = dynamic(
  () => import('./ProjectMapClient').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <MapLoading />
  }
);

// Export the component
const ProjectMap = (props: ProjectMapProps) => {
  return <MapComponent {...props} />;
};

export default ProjectMap;