import React from 'react';
import { CalendarDays, Monitor, Smartphone } from 'lucide-react';

interface MilestoneHeaderProps {
  isMobile: boolean;
  toggleViewMode: () => void;
  shouldShowMobileView: () => boolean;
}

export const MilestoneHeader: React.FC<MilestoneHeaderProps> = ({ 
  isMobile, 
  toggleViewMode, 
  shouldShowMobileView 
}) => {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <div className="flex items-center">
        <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary/10 flex items-center justify-center mr-2 md:mr-3">
          <CalendarDays className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        </div>
        <h3 className="text-base md:text-lg font-semibold">Timeline Proyek</h3>
      </div>
      
      {/* View mode toggle button (only visible on desktop) */}
      {!isMobile && (
        <button
          onClick={toggleViewMode}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/80 hover:bg-muted transition-colors"
          title={shouldShowMobileView() ? "Tampilkan UI desktop" : "Tampilkan UI mobile"}
        >
          {shouldShowMobileView() ? (
            <>
              <Monitor className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilkan UI Desktop</span>
            </>
          ) : (
            <>
              <Smartphone className="h-4 w-4" />
              <span className="hidden sm:inline">Tampilkan UI Mobile</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};