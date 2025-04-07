import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Camera } from 'lucide-react';

interface TabNotificationProps {
  count: number;
}

export const TabNotification = ({ count }: TabNotificationProps) => {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-1.5 ml-2">
      <Badge 
        variant="secondary" 
        className={cn(
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
          "transition-all duration-300",
          "px-2 py-0.5 rounded-md",
          "flex items-center gap-1"
        )}
      >
        <Camera className="h-3 w-3" />
        <span className="font-medium">{count}</span>
      </Badge>
    </div>
  );
};