import React from 'react';
import { ProjectLocation } from '@/data/dashboardData';

interface LocationFiltersProps {
  projectLocations: ProjectLocation[];
  selectedArea: string | null;
  setSelectedArea: (area: string | null) => void;
  navigateMap: (action: string, params: any) => void;
}

// Helper function to get area code from area name
export const getAreaCode = (areaName: string): string => {
  const areaCodes: Record<string, string> = {
    'jakarta': 'JKT',
    'bandung': 'BDG',
    'semarang': 'SMG',
    'surabaya': 'SBY'
  };
  return areaCodes[areaName] || '';
};

const LocationFilters: React.FC<LocationFiltersProps> = ({
  projectLocations,
  selectedArea,
  setSelectedArea,
  navigateMap
}) => {
  const areas = ['Jakarta', 'Bandung', 'Semarang', 'Surabaya'];

  return (
    <div className="mb-3 overflow-x-auto pb-1">
      {/* Main location filters */}
      <div className="flex space-x-2 mb-2">
        <button 
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          onClick={() => {
            navigateMap('reset', { center: [-6.2088, 106.8456], zoom: 6 });
            setSelectedArea(null);
          }}
        >
          Semua Area
        </button>
        
        {areas.map((area) => (
          <button 
            key={area}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${selectedArea === area.toLowerCase() ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'} transition-colors`}
            onClick={() => {
              navigateMap('area', { areaId: area.toLowerCase() });
              setSelectedArea(area.toLowerCase());
            }}
          >
            {area}
          </button>
        ))}
      </div>
      
      {/* Project buttons - filtered by selected area */}
      <div className="flex space-x-2 flex-wrap gap-y-2">
        {projectLocations
          .filter(location => {
            if (!selectedArea) return true;
            return location.projectId.includes(getAreaCode(selectedArea));
          })
          .map((location) => {
            const statusClasses = {
              'Selesai': 'bg-success/10 text-success hover:bg-success/20',
              'Terlambat': 'bg-destructive/10 text-destructive hover:bg-destructive/20',
              'default': 'bg-muted text-muted-foreground hover:bg-muted/80'
            };
            const btnClass = statusClasses[location.status as keyof typeof statusClasses] || statusClasses.default;
            
            return (
              <button 
                key={location.id}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${btnClass}`}
                onClick={() => navigateMap('goto', { 
                  locationId: location.id, 
                  center: location.position, 
                  zoom: 14 
                })}
              >
                <span className="text-xs opacity-70 mr-1">{location.projectId}</span>
                {location.name}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default LocationFilters;