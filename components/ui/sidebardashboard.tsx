import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  BarChart2, 
  Settings, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Circle,
  Plus
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  minimized: boolean;
  toggleMinimized: () => void;
}

interface Project {
  name: string;
  status: string;
  completion: number;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, minimized, toggleMinimized }) => {
  const [projectsExpanded, setProjectsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const toggleProjects = () => {
    if (!minimized) {
      setProjectsExpanded(!projectsExpanded);
    }
  };

  // Show only a limited number of projects to avoid scrolling
  const projects: Project[] = [
    { name: "Urban Network Expansion", status: "in-progress", completion: 65 },
    { name: "Rural Connectivity", status: "planning", completion: 20 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-emerald-500";
      case "in-progress": return "bg-sky-500";
      case "planning": return "bg-amber-400";
      default: return "bg-slate-400";
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case "completed": return "from-emerald-500 to-teal-400";
      case "in-progress": return "from-sky-500 to-blue-400";
      case "planning": return "from-amber-400 to-yellow-300";
      default: return "from-slate-400 to-gray-300";
    }
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 ${minimized ? 'w-16' : 'w-72'} transform transition-all duration-500 ease-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      <div className="flex h-full flex-col rounded-r-2xl bg-background/70 shadow-xl backdrop-blur-xl border-r border-r-border/30 relative">
        {/* Decorative elements */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border/10">
          {!minimized && (
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-primary to-primary-foreground"></div>
              <h2 className="text-xl font-light tracking-wide text-foreground">Fiber<span className="font-semibold">View</span></h2>
            </div>
          )}
          {minimized && <div className="h-3 w-3 mx-auto rounded-full bg-gradient-to-tr from-primary to-primary-foreground"></div>}
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleMinimized}
              className="text-muted-foreground/70 hover:text-foreground transition-colors duration-300 ease-in-out"
            >
              {minimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
            {!minimized && (
              <button onClick={toggleSidebar} className="md:hidden text-muted-foreground/70 hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        
        {/* Main Menu - No scroll */}
        <div className="flex flex-col justify-between flex-1 pt-4">
          <div className={`space-y-1 px-3`}>
            <SidebarItem 
              icon={<LayoutDashboard size={18} />} 
              text="Dashboard" 
              active={true} 
              minimized={minimized} 
              onHover={() => setHoveredItem('dashboard')}
              onLeave={() => setHoveredItem(null)}
              isHovered={hoveredItem === 'dashboard'}
            />
            
            {/* Projects with dropdown */}
            <div>
              <div 
                className={`flex cursor-pointer items-center justify-between rounded-xl ${minimized ? 'px-2 py-3' : 'px-4 py-3'} text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out ${
                  hoveredItem === 'projects' ? 'bg-accent/10 text-foreground' : ''
                }`}
                onClick={toggleProjects}
                onMouseEnter={() => setHoveredItem('projects')}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center">
                  <div className={`${minimized ? 'mr-0' : 'mr-3'} flex justify-center ${minimized ? 'w-full' : ''} transition-all duration-300`}>
                    <FolderKanban size={18} className={hoveredItem === 'projects' ? 'text-primary' : ''} />
                  </div>
                  {!minimized && <span className="font-medium tracking-wide text-sm">Projects</span>}
                </div>
                {!minimized && (
                  <div className="transition-transform duration-300 ease-in-out">
                    {projectsExpanded ? <ChevronRight size={16} className="rotate-90" /> : <ChevronRight size={16} />}
                  </div>
                )}
              </div>
              
              {/* Projects Section - Limited to avoid scrolling */}
              {!minimized && projectsExpanded && (
                <div className="mt-2 space-y-2 transition-all duration-500 ease-out">
                  {projects.map((project, index) => (
                    <div 
                      key={index} 
                      className={`cursor-pointer rounded-xl p-3 text-sm hover:bg-accent/5 transition-all duration-300 ease-in-out ${
                        activeProject === index ? 'bg-accent/10' : 'bg-card/30'
                      }`}
                      onClick={() => setActiveProject(index === activeProject ? null : index)}
                      onMouseEnter={() => setHoveredItem(`project-${index}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground/90 truncate text-xs">{project.name}</span>
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(project.status)}`}></div>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-1 overflow-hidden">
                        <div 
                          className={`h-1 rounded-full bg-gradient-to-r ${getStatusGradient(project.status)}`}
                          style={{ width: `${project.completion}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground/80">{project.completion}%</span>
                        <span className="text-xs font-light capitalize px-2 py-0.5 rounded-full bg-muted/20 text-foreground/70">
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* View all projects button */}
                  <div 
                    className="cursor-pointer rounded-xl px-4 py-2 text-xs text-primary hover:bg-primary/5 transition-all duration-300 flex items-center justify-center space-x-1 group"
                    onMouseEnter={() => setHoveredItem('view-all')}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span>View All Projects</span>
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              )}
            </div>
            
            <SidebarItem 
              icon={<Users size={18} />} 
              text="Team" 
              minimized={minimized} 
              onHover={() => setHoveredItem('team')}
              onLeave={() => setHoveredItem(null)}
              isHovered={hoveredItem === 'team'}
            />
            <SidebarItem 
              icon={<BarChart2 size={18} />} 
              text="Analytics" 
              minimized={minimized} 
              onHover={() => setHoveredItem('analytics')}
              onLeave={() => setHoveredItem(null)}
              isHovered={hoveredItem === 'analytics'}
            />
          </div>
          
          {/* Bottom sections */}
          <div className="mt-auto">
            {/* Settings at bottom */}
            <div className="px-3 mb-2">
              <SidebarItem 
                icon={<Settings size={18} />} 
                text="Settings" 
                minimized={minimized} 
                onHover={() => setHoveredItem('settings')}
                onLeave={() => setHoveredItem(null)}
                isHovered={hoveredItem === 'settings'}
              />
            </div>
            
            {/* New Project Button */}
            {!minimized && (
              <div className="px-3 mb-4">
                <button 
                  className="w-full flex items-center justify-center space-x-2 bg-primary/10 hover:bg-primary/20 text-primary py-2 rounded-xl transition-colors duration-300"
                  onMouseEnter={() => setHoveredItem('new-project')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Plus size={14} />
                  <span className="text-sm font-medium">New Project</span>
                </button>
              </div>
            )}
            
            {/* User profile section */}
            {!minimized && (
              <div className="p-4 border-t border-border/10">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary/20 to-primary-foreground/20 flex items-center justify-center">
                    <Circle size={6} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Network Admin</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced sidebar item with hover effects
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  minimized?: boolean;
  onHover: () => void;
  onLeave: () => void;
  isHovered: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  active = false, 
  minimized = false,
  onHover,
  onLeave,
  isHovered
}) => (
  <div 
    className={`
      flex cursor-pointer items-center rounded-xl 
      ${minimized ? 'px-2 justify-center py-3' : 'px-4 py-3'} 
      ${active 
        ? 'bg-primary/10 text-primary' 
        : isHovered 
          ? 'bg-accent/10 text-foreground' 
          : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
      }
      transition-all duration-300 ease-in-out
    `}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className={`${minimized ? 'mr-0' : 'mr-3'} transition-all duration-300`}>
      {icon}
    </div>
    {!minimized && <span className={`font-medium text-sm tracking-wide ${active ? 'text-primary' : ''}`}>{text}</span>}
  </div>
);

export default Sidebar;