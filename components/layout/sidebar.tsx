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
import { usePathname, useRouter } from 'next/navigation';

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
  const pathname = usePathname();
  const router = useRouter(); // Add router for imperative navigation

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

  // Handle navigation with immediate feedback
  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Close sidebar on mobile immediately
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
    
    // Navigate programmatically
    router.push(href);
  };

  // Prefetch all navigation routes
  React.useEffect(() => {
    navItems.forEach(item => {
      router.prefetch(item.href);
    });
    router.prefetch('/dashboard/settings');
  }, [router]);

  // Desktop sidebar
  return (
    <>
      {/* Desktop sidebar - hidden on mobile */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 ${minimized ? 'w-16' : 'w-64 md:w-72'} transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 hidden md:block`}
      >
        <div className="flex h-full flex-col rounded-r-xl md:rounded-r-2xl bg-background shadow-lg border-r border-r-border/30 relative">
          {/* Header - Always visible */}
          <div className="sticky top-0 flex items-center justify-between p-4 md:p-5 border-b border-border/10 bg-background z-10">
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
                className="p-1 text-muted-foreground/70 hover:text-foreground hover:bg-accent/10 rounded-md"
              >
                {minimized ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>
          </div>
          
          {/* Main Menu - Scrollable if needed */}
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="pt-3 md:pt-4">
              <div className="space-y-1 px-2 md:px-3">
                {navItems.map((item, index) => {
                  const isActive = isPathActive(item.href);
                  return (
                    <a 
                      href={item.href} 
                      key={index} 
                      className="block"
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
                      <SidebarItem 
                        icon={item.icon} 
                        text={item.text} 
                        active={isActive} 
                        minimized={minimized} 
                      />
                    </a>
                  );
                })}
              </div>
            </nav>
            
            {/* Bottom sections */}
            <div className="mt-auto sticky bottom-0 bg-background pt-2 pb-3">
              {/* Settings at bottom */}
              <div className="px-2 md:px-3">
                <a 
                  href="/dashboard/settings" 
                  className="block"
                  onClick={(e) => handleNavigation('/dashboard/settings', e)}
                >
                  <SidebarItem 
                    icon={<Settings size={18} />} 
                    text="Settings" 
                    active={pathname === '/dashboard/settings'}
                    minimized={minimized} 
                  />
                </a>
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
        className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
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
                    <a 
                      href={item.href} 
                      key={index} 
                      className="block" 
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
                      <div 
                        className={`
                          flex items-center rounded-lg px-3 py-2.5
                          ${isActive 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                          }
                        `}
                      >
                        <div className="mr-3">
                          {item.icon}
                        </div>
                        <span className={`font-medium text-sm tracking-wide ${isActive ? 'text-primary' : ''}`}>{item.text}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </nav>
            
            {/* Mobile Bottom section */}
            <div className="mt-auto border-t border-border/10 pt-2 pb-3">
              <div className="px-2">
                <a 
                  href="/dashboard/settings" 
                  className="block"
                  onClick={(e) => handleNavigation('/dashboard/settings', e)}
                >
                  <div 
                    className={`
                      flex items-center rounded-lg px-3 py-2.5
                      ${pathname === '/dashboard/settings' 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                      }
                      transition-all duration-150 ease-in-out
                    `}
                  >
                    <div className="mr-3 transition-all duration-150">
                      <Settings size={18} />
                    </div>
                    <span className={`font-medium text-sm tracking-wide ${pathname === '/dashboard/settings' ? 'text-primary' : ''}`}>Settings</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Perbarui interface SidebarItemProps untuk menghapus props hover
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  minimized?: boolean;
}

// Perbarui SidebarItem untuk menggunakan CSS hover daripada state React
const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  text, 
  active = false, 
  minimized = false,
}) => (
  <div 
    className={`
      flex cursor-pointer items-center rounded-lg md:rounded-xl 
      ${minimized ? 'px-2 justify-center py-2.5 md:py-3' : 'px-3 md:px-4 py-2.5 md:py-3'} 
      ${active 
        ? 'bg-primary/10 text-primary' 
        : 'text-muted-foreground hover:bg-accent/10 hover:text-foreground'
      }
    `}
  >
    <div className={`${minimized ? 'mr-0' : 'mr-2.5 md:mr-3'}`}>
      {icon}
    </div>
    {!minimized && <span className={`font-medium text-sm tracking-wide ${active ? 'text-primary' : ''}`}>{text}</span>}
  </div>
);

export default Sidebar;
