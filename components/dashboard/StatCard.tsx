import React, { ReactElement } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StatProps } from './types';

export const StatCard = ({ stat }: { stat: StatProps }) => {
  return (
    <Card className="shadow hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${stat.color}/10 flex items-center justify-center`}>
            {React.cloneElement(stat.icon as ReactElement<any>, { className: `text-${stat.color} h-5 w-5` })}
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{stat.title}</p>
            <h3 className="text-xl font-bold">{stat.value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};