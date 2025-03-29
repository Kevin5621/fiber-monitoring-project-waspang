import React from 'react';
import { ActivityProps } from './types';

export const ActivityItem = ({ activity }: ActivityProps) => {
  return (
    <li className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-start border-l-2 border-primary pl-4">
        <div>
          <p className="text-sm font-medium">{activity.action}</p>
          <p className="text-xs text-muted-foreground mt-1">{activity.time} • {activity.project}</p>
        </div>
      </div>
    </li>
  );
};