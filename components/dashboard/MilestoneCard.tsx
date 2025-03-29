import React, { ReactElement } from 'react';
import { Badge } from '@/components/ui/badge';
import { MilestoneProps } from './types';

export const MilestoneCard = ({ milestone }: MilestoneProps) => {
  // Skip rendering if milestone is completed (status is 'Selesai')
  if (milestone.status === 'Selesai') {
    return null;
  }

  return (
    <div className="flex items-start gap-3 p-3 border-b hover:bg-muted/20 transition-colors">
      <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        milestone.status === 'Terlambat' 
          ? 'bg-destructive/10 text-destructive' 
          : 'bg-primary/10 text-primary'
      }`}>
        {React.cloneElement(milestone.icon as ReactElement<any>, { className: "h-4 w-4" })}
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium">{milestone.name}</h4>
          <Badge 
            variant={
              milestone.status === 'Terlambat' 
                ? 'destructive' 
                : 'outline'
            }
            className="text-xs"
          >
            {milestone.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{milestone.project}</p>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Mulai: {milestone.startDate}</span>
          <span>Tenggat: {milestone.deadline}</span>
        </div>
      </div>
    </div>
  );
};