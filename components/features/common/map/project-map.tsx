"use client"

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PoleLocation, PoleStatus, getPoleStatus } from '@/data/project/locations';
import { ProjectMilestone } from '@/data/project/milestones';
import { getProjectById } from '@/data/project/projects';
import { MapSidebar } from './map-sidebar';
import { MapPopup } from './map-popup';
import { memo } from 'react';

interface ProjectMapProps {
  projectLocations: PoleLocation[];
  milestones: ProjectMilestone[];
  projectId?: number;
  onPoleClick?: (pole: PoleLocation) => void;
}

// Custom marker icons - moved outside component to avoid recreation
const createMarkerIcon = (status: PoleStatus) => {
  const color = status === 'completed' ? '#10b981' : 
                status === 'in-progress' ? '#f59e0b' : 
                '#64748b';
                
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: ${color};
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 3px 10px rgba(0,0,0,0.25);
      color: white;
      font-size: 14px;
      font-weight: bold;
      transform-origin: center;
      transition: transform 0.2s ease;
    ">
      <span style="line-height: 1">${status === 'completed' ? '✓' : status === 'in-progress' ? '⟳' : '•'}</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Map bounds adjuster component
const MapBoundsAdjuster = ({ locations }: { locations: PoleLocation[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map(loc => loc.coordinates));
      map.fitBounds(bounds, { padding: [70, 70] });
    }
  }, [locations, map]);

  return null;
};

// Create a memoized marker component
const MarkerWithPopup = memo(({ 
  pole, 
  milestones, 
  onPoleClick 
}: { 
  pole: PoleLocation; 
  milestones: ProjectMilestone[];
  onPoleClick?: (pole: PoleLocation) => void;
}) => {
  const status = getPoleStatus(pole, milestones);
  const icon = useMemo(() => createMarkerIcon(status), [status]);
  const poleMilestones = useMemo(() => 
    milestones.filter(m => pole.milestoneIds.includes(m.id)), 
    [pole.milestoneIds, milestones]
  );
  const project = useMemo(() => getProjectById(pole.projectId), [pole.projectId]);
  
  const [totalPhotos, uploadedPhotos] = useMemo(() => {
    const total = poleMilestones.reduce((sum, m) => sum + m.requiredPhotos.length, 0);
    const uploaded = poleMilestones.reduce((sum, m) => 
      sum + m.requiredPhotos.filter(p => p.uploaded).length, 0);
    return [total, uploaded];
  }, [poleMilestones]);

  return (
    <Marker
      key={pole.id}
      position={pole.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => onPoleClick?.(pole)
      }}
    >
      <Popup className="custom-popup" maxWidth={350}>
        <MapPopup 
          pole={pole}
          status={status}
          project={project}
          poleMilestones={poleMilestones}
          uploadedPhotos={uploadedPhotos}
          totalPhotos={totalPhotos}
          onPoleClick={onPoleClick}
        />
      </Popup>
    </Marker>
  );
});

export default function ProjectMap({ 
  projectLocations, 
  milestones, 
  projectId,
  onPoleClick 
}: ProjectMapProps) {
  const [filteredLocations, setFilteredLocations] = useState<PoleLocation[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>(projectId?.toString() || 'all');
  const [mapView, setMapView] = useState<'standard' | 'satellite'>('standard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<PoleStatus | 'all'>('all');
  const [mapStats, setMapStats] = useState({
    completed: 0,
    inProgress: 0,
    notStarted: 0
  });

  // Memoize unique projects to prevent recalculation on every render
  const uniqueProjects = useMemo(() => {
    return Array.from(new Set(projectLocations.map(loc => loc.projectId)))
      .map(id => {
        const project = getProjectById(id);
        return {
          id: id.toString(),
          name: project?.name || `Project ${id}`
        };
      });
  }, [projectLocations]);

  // Memoize tile layer URL to prevent unnecessary re-renders
  const tileLayerUrl = useMemo(() => {
    return mapView === 'standard' 
      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  }, [mapView]);

  useEffect(() => {
    const projectFiltered = selectedProject === 'all'
      ? projectLocations
      : projectLocations.filter(loc => loc.projectId.toString() === selectedProject);
    
    const statusFiltered = statusFilter === 'all'
      ? projectFiltered
      : projectFiltered.filter(loc => getPoleStatus(loc, milestones) === statusFilter);
    
    setFilteredLocations(statusFiltered);
    
    // Calculate stats
    const completed = projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'completed').length;
    const inProgress = projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'in-progress').length;
    const notStarted = projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'not-started').length;
    
    setMapStats({
      completed,
      inProgress,
      notStarted
    });
  }, [projectLocations, selectedProject, statusFilter, milestones]);

  // Use useCallback for event handlers to prevent unnecessary re-renders
  const handleProjectChange = useCallback((value: string) => {
    setSelectedProject(value);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Add loading state
  const [isMapReady, setIsMapReady] = useState(false);

  // Handle map ready state
  const handleMapReady = useCallback(() => {
    setIsMapReady(true);
  }, []);

  // Optimize filtered locations calculation
  const { filteredLocations: optimizedLocations, mapStats: optimizedStats } = useMemo(() => {
    const projectFiltered = selectedProject === 'all'
      ? projectLocations
      : projectLocations.filter(loc => loc.projectId.toString() === selectedProject);
    
    const statusFiltered = statusFilter === 'all'
      ? projectFiltered
      : projectFiltered.filter(loc => getPoleStatus(loc, milestones) === statusFilter);
    
    const stats = {
      completed: projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'completed').length,
      inProgress: projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'in-progress').length,
      notStarted: projectFiltered.filter(loc => getPoleStatus(loc, milestones) === 'not-started').length
    };

    return { filteredLocations: statusFiltered, mapStats: stats };
  }, [projectLocations, selectedProject, statusFilter, milestones]);

  // Update state based on optimized calculations
  useEffect(() => {
    setFilteredLocations(optimizedLocations);
    setMapStats(optimizedStats);
  }, [optimizedLocations, optimizedStats]);

  return (
    <div className="relative h-full flex rounded-lg overflow-hidden">
      <MapSidebar 
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        selectedProject={selectedProject}
        handleProjectChange={handleProjectChange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        mapView={mapView}
        setMapView={setMapView}
        mapStats={mapStats}
        uniqueProjects={uniqueProjects}
      />

      <div className="flex-1 relative">
        {!isMapReady && (
          <div className="absolute inset-0 bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        <MapContainer
          style={{ height: '100%', width: '100%' }}
          center={[-6.2088, 106.8456]}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          whenReady={handleMapReady}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={tileLayerUrl}
          />
          
          <MapBoundsAdjuster locations={filteredLocations} />

          {isMapReady && filteredLocations.map((pole) => (
            <MarkerWithPopup
              key={pole.id}
              pole={pole}
              milestones={milestones}
              onPoleClick={onPoleClick}
            />
          ))}
        </MapContainer>
        
      </div>
    </div>
  );
}