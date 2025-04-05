import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { ProjectMapProps } from '@/components/dashboard/types';

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