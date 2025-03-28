import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Settings, 
  X, 
  ChevronLeft, 
  ChevronRight,
  FolderIcon,
  CalendarIcon,
  Archive
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  minimized: boolean;
  toggleMinimized: () => void;
}

interface NavItem {
  icon: React.ReactNode;
  text: string;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, toggleSidebar, minimized, toggleMinimized }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Navigation items
  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard size={18} />,
      text: "Dashboard",
      href: "/dashboard"
    },
    {
      icon: <FolderIcon size={18} />,
      text: "Projek",
      href: "/dashboard/project"
    },
    {
      icon: <CalendarIcon size={18} />,
      text: "Laporan Harian",
      href: "/dashboard/reports"
    },
    {
      icon: <Archive size={18} />,
      text: "Dokumen",
      href: "/dashboard/documentation"
    }
  ];

  const isPathActive = (itemPath: string) => {
    if (pathname === itemPath) return true;
    
    if (itemPath !== '/dashboard' && pathname.startsWith(itemPath)) return true;
    
    return false;
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
            {navItems.map((item, index) => {
              const isActive = isPathActive(item.href);
              return (
                <Link href={item.href} key={index} className="block">
                  <SidebarItem 
                    icon={item.icon} 
                    text={item.text} 
                    active={isActive} 
                    minimized={minimized} 
                    onHover={() => setHoveredItem(item.href)}
                    onLeave={() => setHoveredItem(null)}
                    isHovered={hoveredItem === item.href}
                  />
                </Link>
              );
            })}
          </div>
          
          {/* Bottom sections */}
          <div className="mt-auto">
            {/* Settings at bottom */}
            <div className="px-3 mb-2">
              <Link href="/dashboard/settings">
                <SidebarItem 
                  icon={<Settings size={18} />} 
                  text="Settings" 
                  active={pathname === '/dashboard/settings'}
                  minimized={minimized} 
                  onHover={() => setHoveredItem('settings')}
                  onLeave={() => setHoveredItem(null)}
                  isHovered={hoveredItem === 'settings'}
                />
              </Link>
            </div>
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