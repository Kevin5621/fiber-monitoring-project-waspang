import React, { useState, useEffect } from 'react';
import { ProjectLocation } from '@/data/dashboardData';
import { LocationFiltersProps } from '@/components/features/dashboard/types';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  // Reset pagination when area or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedArea, searchTerm]);

  // Filter projects based on selected area and search term
  const filteredProjects = projectLocations.filter(location => {
    const matchesArea = !selectedArea || location.projectId.includes(getAreaCode(selectedArea));
    const matchesSearch = !searchTerm || 
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      location.projectId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesArea && matchesSearch;
  });

  // Calculate projects for current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Count projects by area
  const projectCounts = areas.reduce((acc, area) => {
    acc[area.toLowerCase()] = projectLocations.filter(
      location => location.projectId.includes(getAreaCode(area.toLowerCase()))
    ).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mb-3 overflow-hidden">
      {/* Area filters with counts */}
      <div className="flex space-x-2 mb-3 overflow-x-auto pb-2">
        <button 
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            selectedArea === null ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
          }`}
          onClick={() => {
            navigateMap('reset', { center: [-6.2088, 106.8456], zoom: 6 });
            setSelectedArea(null);
          }}
        >
          Semua Area ({projectLocations.length})
        </button>
        
        {areas.map((area) => (
          <button 
            key={area}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              selectedArea === area.toLowerCase() ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
            } transition-colors`}
            onClick={() => {
              navigateMap('area', { areaId: area.toLowerCase() });
              setSelectedArea(area.toLowerCase());
            }}
          >
            {area} ({projectCounts[area.toLowerCase()] || 0})
          </button>
        ))}
      </div>
         
      {/* Project buttons with pagination */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {currentProjects.map((location) => {
            // Apply styling based on documentation status instead of project status
            const documentationClass = location.isDocumented 
              ? 'bg-success/10 text-success hover:bg-success/20' 
              : 'bg-destructive/10 text-destructive hover:bg-destructive/20';
            
            return (
              <button 
                key={location.id}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${documentationClass}`}
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
      ) : (
        <div className="text-center py-4 text-sm text-muted-foreground">
          Tidak ada proyek yang ditemukan
        </div>
      )}
    </div>
  );
};

export default LocationFilters;