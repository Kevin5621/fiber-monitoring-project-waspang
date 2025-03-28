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

  // Desktop sidebar
  return (
    <>
      {/* Desktop sidebar - hidden on mobile */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 ${minimized ? 'w-16' : 'w-64 md:w-72'} transform transition-all duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 hidden md:block`}
      >
        <div className="flex h-full flex-col rounded-r-xl md:rounded-r-2xl bg-background/70 shadow-xl backdrop-blur-xl border-r border-r-border/30 relative">
          {/* Decorative elements */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Header - Always visible */}
          <div className="sticky top-0 flex items-center justify-between p-4 md:p-5 border-b border-border/10 bg-background/70 backdrop-blur-sm z-10">
            {!minimized && (
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-primary to-primary-foreground"></div>
                <h2 className="text-lg md:text-xl font-light tracking-wide text-foreground">Fiber<span className="font-semibold">View</span></h2>
              </div>
            )}
            {minimized && <div className="h-3 w-3 mx-auto rounded-full bg-gradient-to-tr from-primary to-primary-foreground"></div>}
            <div className="flex items-center space-x-2 md:space-x-3">
              <button 
                onClick={toggleMinimized}
                className="p-1 text-muted-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-md transition-colors duration-300 ease-in-out"
              >
                {minimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
          </div>
          
          {/* Main Menu - Scrollable if needed */}
          <div className="flex flex-col justify-between flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <nav className="pt-3 md:pt-4">
              <div className="space-y-1 px-2 md:px-3">
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
            </nav>
            
            {/* Bottom sections - Removed gradient background */}
            <div className="mt-auto sticky bottom-0 bg-background/90 backdrop-blur-sm pt-2 pb-3">
              {/* Settings at bottom */}
              <div className="px-2 md:px-3">
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
      </aside>

      {/* Mobile sidebar overlay - only visible when sidebar is open on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar - only visible on mobile when open */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-all duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex h-full flex-col bg-background shadow-xl border-r border-r-border/30 relative">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/10">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gradient-to-tr from-primary to-primary-foreground"></div>
              <h2 className="text-lg font-light tracking-wide text-foreground">Fiber<span className="font-semibold">View</span></h2>
            </div>
            <button 
              onClick={toggleSidebar} 
              className="p-1 text-muted-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-md"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Mobile Menu */}
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="pt-3">
              <div className="space-y-1 px-2">
                {navItems.map((item, index) => {
                  const isActive = isPathActive(item.href);
                  return (
                    <Link href={item.href} key={index} className="block" onClick={toggleSidebar}>
                      <div 
                        className={`
                          flex items-center rounded-lg px-3 py-2.5
                          ${isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                          }
                          transition-all duration-200 ease-in-out
                        `}
                      >
                        <div className="mr-3 transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className={`font-medium text-sm tracking-wide ${isActive ? 'text-primary' : ''}`}>{item.text}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>
            
            {/* Mobile Bottom section - No gradient */}
            <div className="mt-auto border-t border-border/10 pt-2 pb-3">
              <div className="px-2">
                <Link href="/dashboard/settings" onClick={toggleSidebar}>
                  <div 
                    className={`
                      flex items-center rounded-lg px-3 py-2.5
                      ${pathname === '/dashboard/settings' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                      }
                      transition-all duration-200 ease-in-out
                    `}
                  >
                    <div className="mr-3 transition-all duration-300">
                      <Settings size={18} />
                    </div>
                    <span className={`font-medium text-sm tracking-wide ${pathname === '/dashboard/settings' ? 'text-primary' : ''}`}>Settings</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

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
      flex cursor-pointer items-center rounded-lg md:rounded-xl 
      ${minimized ? 'px-2 justify-center py-2.5 md:py-3' : 'px-3 md:px-4 py-2.5 md:py-3'} 
      ${active 
        ? 'bg-primary/10 text-primary' 
        : isHovered 
          ? 'bg-accent/10 text-foreground' 
          : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
      }
      transition-all duration-200 ease-in-out
    `}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div className={`${minimized ? 'mr-0' : 'mr-2.5 md:mr-3'} transition-all duration-300`}>
      {icon}
    </div>
    {!minimized && <span className={`font-medium text-sm tracking-wide ${active ? 'text-primary' : ''}`}>{text}</span>}
  </div>
);

export default Sidebar;