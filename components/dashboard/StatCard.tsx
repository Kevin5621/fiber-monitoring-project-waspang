import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface StatProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: 'primary' | 'success' | 'warning' | 'destructive' | 'default';
}

export const StatCard = ({ stat }: { stat: StatProps }) => {
  const getColorClasses = (color: StatProps['color']) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'success':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20';
      case 'warning':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20';
      case 'destructive':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800';
    }
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
            <h3 className="text-xl sm:text-2xl font-bold">{stat.value}</h3>
            {stat.description && (
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            )}
            {stat.trend && (
              <div className="flex items-center mt-2">
                <span className={`text-xs font-medium ${stat.trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend.isPositive ? '+' : ''}{stat.trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">dari minggu lalu</span>
              </div>
            )}
          </div>
          <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
            {stat.icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};