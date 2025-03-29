import React, { ReactElement } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MilestoneProps } from './types';

export const MilestoneCard = ({ milestone }: MilestoneProps) => {
  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-lg border-l-4 ${
        milestone.status === 'Terlambat' 
          ? 'border-l-destructive' 
          : milestone.status === 'Selesai'
            ? 'border-l-green-500'
            : 'border-l-primary'
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
            milestone.status === 'Terlambat' 
              ? 'bg-destructive/10 text-destructive' 
              : milestone.status === 'Selesai'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-primary/10 text-primary'
          }`}>
            {React.cloneElement(milestone.icon as ReactElement<any>, { className: "h-5 w-5" })}
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{milestone.name}</h4>
              <Badge 
                variant={
                  milestone.status === 'Terlambat' 
                    ? 'destructive' 
                    : milestone.status === 'Selesai'
                      ? 'outline' // Changed from 'success' to 'outline'
                      : 'outline'
                }
              >
                {milestone.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{milestone.project}</p>
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{milestone.progress}%</span>
              </div>
              <Progress 
                value={milestone.progress} 
                className={`h-2 ${
                  milestone.status === 'Terlambat' 
                    ? 'bg-destructive/20' 
                    : ''
                }`} 
              />
            </div>
            <div className="flex justify-between mt-4 text-xs text-muted-foreground">
              <span>Mulai: {milestone.startDate}</span>
              <span>Tenggat: {milestone.deadline}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};