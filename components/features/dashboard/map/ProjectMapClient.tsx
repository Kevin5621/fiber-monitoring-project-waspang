'use client';

import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Filter } from 'lucide-react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { 
  ProjectArea, 
  CableConnection, 
  FilterOptions, 
  ProjectMapProps 
} from '@/components/features/dashboard/types';

// Fix for Leaflet icon in Next.js
const fixLeafletIcon = () => {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
  });
};

// Status icon creator
const createStatusIcon = (status: string) => {
  return new Icon({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const ProjectMapClient = ({ className, projectLocations, milestones = [] }: ProjectMapProps) => {
  const [cableConnections, setCableConnections] = useState<CableConnection[]>([]);
  const [projectAreas, setProjectAreas] = useState<ProjectArea[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    area: null,
    category: null,
    documentationStatus: null
  });
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Record<number, any>>({});
  
  // Helper function to determine documentation status based on milestone ID
  const getMilestoneDocStatus = (milestoneId: number): boolean => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return false;
    return milestone.uploadedDocs >= milestone.requiredDocs;
  };
  
  // Setup map data and event listeners
  useEffect(() => {
    fixLeafletIcon();
    
    // Define project areas
    const areas: ProjectArea[] = [
      {
        id: 'jakarta',
        name: 'Jakarta',
        center: [-6.2088, 106.8456],
        zoom: 12,
        projects: [1, 2, 3, 4]
      },
      {
        id: 'bandung',
        name: 'Bandung',
        center: [-6.8915, 107.6107],
        zoom: 13,
        projects: [5, 6]
      },
      {
        id: 'semarang',
        name: 'Semarang',
        center: [-6.9932, 110.4203],
        zoom: 13,
        projects: [7]
      },
      {
        id: 'surabaya',
        name: 'Surabaya',
        center: [-7.2575, 112.7381],
        zoom: 13,
        projects: [8]
      }
    ];
    
    setProjectAreas(areas);
    
    // Generate cable connections
    const connections: CableConnection[] = [
      { 
        id: 'cable-1', 
        from: 1,
        to: 2,
        isDocumented: projectLocations.find(p => p.id === 1)?.isDocumented || false,
        milestoneId: 2
      },
      { 
        id: 'cable-2', 
        from: 2,
        to: 4,
        isDocumented: true,
        milestoneId: 4
      },
      { 
        id: 'cable-3', 
        from: 2,
        to: 3,
        isDocumented: projectLocations.find(p => p.id === 3)?.isDocumented || false,
        milestoneId: 3
      },
      { 
        id: 'cable-4', 
        from: 5,
        to: 6,
        isDocumented: false,
        milestoneId: 5
      },
    ];
    
    setCableConnections(connections);
    
    // Map navigation event handler
    const handleMapNavigate = (event: CustomEvent) => {
      const { action, locationId, center, zoom, areaId, category, documentationStatus } = event.detail;
      
      if (!mapRef.current) return;
      
      // Close all popups helper function
      const closeAllPopups = () => {
        Object.values(markersRef.current).forEach((marker: any) => {
          if (marker && marker.closePopup) {
            marker.closePopup();
          }
        });
      };
      
      if (action === 'goto' && locationId) {
        mapRef.current.setView(center, zoom);
        setTimeout(() => {
          if (markersRef.current[locationId]) {
            markersRef.current[locationId].openPopup();
          }
        }, 500);
      } else if (action === 'area' && areaId) {
        const area = areas.find(a => a.id === areaId);
        if (area) {
          mapRef.current.setView(area.center, area.zoom);
          setFilters({...filters, area: areaId});
          closeAllPopups();
        }
      } else if (action === 'category' && category) {
        setFilters({...filters, category});
        closeAllPopups();
      } else if (action === 'documentation' && documentationStatus !== undefined) {
        setFilters({...filters, documentationStatus});
        closeAllPopups();
      } else if (action === 'reset') {
        mapRef.current.setView(center, zoom);
        setFilters({area: null, category: null, documentationStatus: null});
        closeAllPopups();
      }
    };
    
    window.addEventListener('map-navigate', handleMapNavigate as EventListener);
    
    return () => {
      window.removeEventListener('map-navigate', handleMapNavigate as EventListener);
    };
  }, [milestones, projectLocations, filters]);
  
  // Helper function to get area for a project
  const getProjectArea = (projectId: number): ProjectArea | undefined => {
    return projectAreas.find(area => area.projects.includes(projectId));
  };
  
  // Map controller component to get reference to the map
  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      if (map) {
        mapRef.current = map;
      }
    }, [map]);
    
    return null;
  };

  // Default map center
  const defaultCenter: [number, number] = [-6.2088, 106.8456];
  
  // Helper function to get status styling
  const getStatusStyle = (status: string) => {
    const styles = {
      'Selesai': {
        bg: 'hsl(var(--chart-2) / 0.1)',
        color: 'hsl(var(--chart-2))'
      },
      'Pada Jadwal': {
        bg: 'hsl(var(--chart-1) / 0.1)',
        color: 'hsl(var(--chart-1))'
      },
      'Terlambat': {
        bg: 'hsl(var(--destructive) / 0.1)',
        color: 'hsl(var(--destructive))'
      },
      'default': {
        bg: 'hsl(var(--muted-foreground) / 0.1)',
        color: 'hsl(var(--muted-foreground))'
      }
    };
    
    return styles[status as keyof typeof styles] || styles.default;
  };
  
  // Reset map view function
  const resetMapView = () => {
    if (mapRef.current) {
      mapRef.current.setView(defaultCenter, 6);
      setFilters({area: null, category: null, documentationStatus: null});
      
      Object.values(markersRef.current).forEach((marker: any) => {
        if (marker && marker.closePopup) {
          marker.closePopup();
        }
      });
    }
  };

  // Filter projects based on current filters
  const filteredProjects = projectLocations.filter(project => {
    if (filters.area && !getProjectArea(project.id)?.id.includes(filters.area)) {
      return false;
    }
    if (filters.category && project.category !== filters.category) {
      return false;
    }
    if (filters.documentationStatus !== null && project.isDocumented !== filters.documentationStatus) {
      return false;
    }
    return true;
  });

  // Filter connections based on current filters
  const filteredConnections = cableConnections.filter(conn => {
    const fromProject = projectLocations.find(p => p.id === conn.from);
    const toProject = projectLocations.find(p => p.id === conn.to);
    
    if (!fromProject || !toProject) return false;
    
    if (filters.area) {
      const fromArea = getProjectArea(fromProject.id);
      const toArea = getProjectArea(toProject.id);
      if (!fromArea?.id.includes(filters.area) && !toArea?.id.includes(filters.area)) {
        return false;
      }
    }
    
    if (filters.category) {
      if (fromProject.category !== filters.category && toProject.category !== filters.category) {
        return false;
      }
    }
    
    if (filters.documentationStatus !== null) {
      if (conn.isDocumented !== filters.documentationStatus) {
        return false;
      }
    }
    
    return true;
  });
  
  return (
    <div className={`h-full relative ${className || ''}`}>
      {/* Compact filter button */}
      <div className="absolute top-3 right-3 z-[1000]">
        <button 
          className="bg-white/90 backdrop-blur-sm rounded-md shadow-md p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>
      
      {/* Compact filter panel */}
      {showFilters && (
        <div className="absolute top-12 right-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-md shadow-md p-3 w-48">
          <div className="space-y-3">
            {/* Area filter */}
            <div>
              <h4 className="text-xs font-medium mb-1">Area</h4>
              <div className="grid grid-cols-2 gap-1">
                <button 
                  className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                    filters.area === null ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={resetMapView}
                >
                  Semua
                </button>
                
                {projectAreas.map(area => (
                  <button 
                    key={area.id}
                    className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                      filters.area === area.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => {
                      if (mapRef.current) {
                        mapRef.current.setView(area.center, area.zoom);
                        setFilters({...filters, area: area.id});
                      }
                    }}
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category filter */}
            <div>
              <h4 className="text-xs font-medium mb-1">Jenis Instalasi</h4>
              <div className="grid grid-cols-2 gap-1">
                <button 
                  className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                    filters.category === null ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setFilters({...filters, category: null})}
                >
                  Semua
                </button>
                
                {['backbone', 'distribution', 'access', 'maintenance'].map(cat => (
                  <button 
                    key={cat}
                    className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                      filters.category === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setFilters({...filters, category: cat as any})}
                  >
                    {cat === 'backbone' ? 'Backbone' : 
                     cat === 'distribution' ? 'Distribusi' : 
                     cat === 'access' ? 'Akses' : 'Maintenance'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Documentation status filter */}
            <div>
              <h4 className="text-xs font-medium mb-1">Status Dokumentasi</h4>
              <div className="grid grid-cols-3 gap-1">
                <button 
                  className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                    filters.documentationStatus === null ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setFilters({...filters, documentationStatus: null})}
                >
                  Semua
                </button>
                
                <button 
                  className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                    filters.documentationStatus === true ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setFilters({...filters, documentationStatus: true})}
                >
                  Sudah
                </button>
                
                <button 
                  className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${
                    filters.documentationStatus === false ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setFilters({...filters, documentationStatus: false})}
                >
                  Belum
                </button>
              </div>
            </div>
            
            {/* Reset button */}
            <button 
              className="w-full px-2 py-1 text-xs font-medium rounded-sm bg-secondary hover:bg-secondary/80 transition-colors"
              onClick={resetMapView}
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        .leaflet-container {
          height: 100%;
          width: 100%;
          border-radius: 0.5rem;
        }
      `}</style>
      
      <MapContainer 
        center={defaultCenter}
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <MapController />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Cable connections */}
        {filteredConnections.map(connection => {
          const fromLocation = projectLocations.find(loc => loc.id === connection.from);
          const toLocation = projectLocations.find(loc => loc.id === connection.to);
          
          if (!fromLocation || !toLocation) return null;
          
          const positions = [fromLocation.position, toLocation.position];
          const color = connection.isDocumented ? '#10b981' : '#ef4444';
          
          return (
            <Polyline 
              key={connection.id}
              positions={positions}
              pathOptions={{ 
                color, 
                weight: 3, 
                opacity: 0.8, 
                dashArray: connection.isDocumented ? undefined : '5, 10' 
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium text-base">Jalur Kabel Fiber</h3>
                  <p className="text-sm text-muted-foreground">
                    {fromLocation.name} → {toLocation.name}
                  </p>
                  <p className="text-xs mt-1">
                    Status: 
                    <span 
                      className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        connection.isDocumented 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {connection.isDocumented ? 'Terdokumentasi' : 'Belum Terdokumentasi'}
                    </span>
                  </p>
                </div>
              </Popup>
            </Polyline>
          );
        })}
        
        {/* Project markers */}
        {filteredProjects.map(project => {
          const projectArea = getProjectArea(project.id);
          const statusStyle = getStatusStyle(project.status);
          
          return (
            <Marker 
              key={project.id}
              position={project.position}
              icon={createStatusIcon(project.status)}
              ref={(ref: any) => {
                if (ref) {
                  markersRef.current[project.id] = ref;
                }
              }}
            >
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium text-base">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    ID: {project.projectId}
                    {projectArea && (
                      <span className="ml-1 px-1.5 py-0.5 bg-secondary/50 rounded-sm">
                        {projectArea.name}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-xs">
                      Status: 
                      <span 
                        className="ml-1 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{ 
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color
                        }}
                      >
                        {project.status}
                      </span>
                    </p>
                    <p className="text-xs">
                      Jenis: 
                      <span className="ml-1 rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                        {project.category === 'backbone' ? 'Backbone' : 
                         project.category === 'distribution' ? 'Distribusi' : 
                         project.category === 'access' ? 'Akses' : 'Maintenance'}
                      </span>
                    </p>
                    <p className="text-xs">
                      Dokumentasi: 
                      <span 
                        className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                          project.isDocumented 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {project.isDocumented ? 'Sudah' : 'Belum'}
                      </span>
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default ProjectMapClient;