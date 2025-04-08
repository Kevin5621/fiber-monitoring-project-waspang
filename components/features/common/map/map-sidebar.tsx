import React from 'react';
import { Map, Filter, Layers, PieChart, Zap, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PoleStatus } from '@/data/project/locations';

interface MapSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedProject: string;
  handleProjectChange: (value: string) => void;
  statusFilter: PoleStatus | 'all';
  setStatusFilter: (value: PoleStatus | 'all') => void;
  mapView: 'standard' | 'satellite';
  setMapView: (view: 'standard' | 'satellite') => void;
  mapStats: {
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  uniqueProjects: Array<{ id: string; name: string; }>;
  onProjectFocus?: (projectId: string) => void; 
}

export function MapSidebar({
  sidebarOpen,
  toggleSidebar,
  selectedProject,
  handleProjectChange,
  statusFilter,
  setStatusFilter,
  mapView,
  setMapView,
  mapStats,
  uniqueProjects,
  onProjectFocus 
}: MapSidebarProps) {
  return (
    <div 
      className={`flex flex-col bg-background border-r text-foreground transition-all duration-300 ${
        sidebarOpen ? 'w-72' : 'w-16'
      }`}
    >
      <div className="p-4 flex items-center border-b">
        <Map className="h-5 w-5 mr-3" />
        {sidebarOpen && <h2 className="font-semibold">Project Map</h2>}
        <button 
          onClick={toggleSidebar} 
          className="ml-auto rounded-full p-1 hover:bg-accent transition-colors"
        >
          <ChevronRight className={`h-4 w-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {sidebarOpen ? (
        <SidebarContent 
          selectedProject={selectedProject}
          handleProjectChange={handleProjectChange}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          mapView={mapView}
          setMapView={setMapView}
          mapStats={mapStats}
          uniqueProjects={uniqueProjects}
          onProjectFocus={onProjectFocus}
        />
      ) : (
        <CollapsedSidebar 
          toggleSidebar={toggleSidebar}
          mapView={mapView}
          setMapView={setMapView}
        />
      )}
    </div>
  );
}

function SidebarContent({
  selectedProject,
  handleProjectChange,
  onProjectFocus, 
  statusFilter,
  setStatusFilter,
  mapView,
  setMapView,
  mapStats,
  uniqueProjects
}: Omit<MapSidebarProps, 'sidebarOpen' | 'toggleSidebar'>) {
  const handleProjectSelect = (value: string) => {
    handleProjectChange(value);
    if (value !== 'all') {
      onProjectFocus?.(value);
    }
  };

  return (
    <>
      <div className="p-4 border-b">
        <p className="text-xs text-muted-foreground mb-2 flex items-center">
          <Filter className="h-3 w-3 mr-1" /> FILTERS
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Project</label>
            <Select value={selectedProject} onValueChange={handleProjectSelect}>
              <SelectTrigger className="bg-primary text-primary-foreground h-9">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent className="bg-primary text-primary-foreground">
                <SelectItem value="all">All Projects</SelectItem>
                {uniqueProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Status</label>
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as PoleStatus | 'all')}
            >
              <SelectTrigger className="bg-primary text-primary-foreground h-9">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-primary text-primary-foreground">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Map View</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className={`px-3 py-2 text-xs rounded-md flex items-center justify-center ${
                  mapView === 'standard' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setMapView('standard')}
              >
                <Layers className="h-3 w-3 mr-1" />
                Standard
              </button>
              <button 
                className={`px-3 py-2 text-xs rounded-md flex items-center justify-center ${
                  mapView === 'satellite' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                onClick={() => setMapView('satellite')}
              >
                <Zap className="h-3 w-3 mr-1" />
                Satellite
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <MapStats stats={mapStats} />
    </>
  );
}

function CollapsedSidebar({
  toggleSidebar,
  mapView,
  setMapView
}: Pick<MapSidebarProps, 'toggleSidebar' | 'mapView' | 'setMapView'>) {
  return (
    <div className="flex flex-col items-center py-4 space-y-6">
      <button 
        className="hover:bg-accent p-2 rounded-lg transition-colors" 
        title="Filter Projects"
        onClick={toggleSidebar}
      >
        <Filter className="h-5 w-5" />
      </button>
      <button 
        className={`p-2 rounded-lg transition-colors ${
          mapView === 'standard' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
        }`}
        title="Standard View"
        onClick={() => setMapView('standard')}
      >
        <Layers className="h-5 w-5" />
      </button>
      <button 
        className={`p-2 rounded-lg transition-colors ${
          mapView === 'satellite' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
        }`}
        title="Satellite View"
        onClick={() => setMapView('satellite')}
      >
        <Zap className="h-5 w-5" />
      </button>
    </div>
  );
}

function MapStats({ stats }: { stats: MapSidebarProps['mapStats'] }) {
  return (
    <div className="p-4 border-b">
      <p className="text-xs text-muted-foreground mb-3 flex items-center">
        <PieChart className="h-3 w-3 mr-1" /> STATISTICS
      </p>
      <div className="bg-muted/50 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs">Total Poles</span>
          <span className="text-sm font-medium">
            {stats.completed + stats.inProgress + stats.notStarted}
          </span>
        </div>
        
        <div className="space-y-2 mt-3">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="flex-1">Completed</span>
            <span className="font-medium">{stats.completed}</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="flex-1">In Progress</span>
            <span className="font-medium">{stats.inProgress}</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
            <span className="flex-1">Not Started</span>
            <span className="font-medium">{stats.notStarted}</span>
          </div>
        </div>
        
        <div className="mt-3 w-full bg-slate-700 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-green-500 via-yellow-500 to-gray-500 h-1.5 rounded-full" 
            style={{ 
              width: '100%',
              background: `linear-gradient(to right, 
                #10b981 0%, 
                #10b981 ${stats.completed / (stats.completed + stats.inProgress + stats.notStarted) * 100}%, 
                #f59e0b ${stats.completed / (stats.completed + stats.inProgress + stats.notStarted) * 100}%, 
                #f59e0b ${(stats.completed + stats.inProgress) / (stats.completed + stats.inProgress + stats.notStarted) * 100}%,
                #64748b ${(stats.completed + stats.inProgress) / (stats.completed + stats.inProgress + stats.notStarted) * 100}%,
                #64748b 100%)`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}