import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '../../ui/skeleton';

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Stats Skeleton */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4 sm:hidden">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-2">
              <Skeleton className="h-3 w-12 mb-1" />
              <Skeleton className="h-6 w-8" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Skeleton - Using a simple placeholder instead of trying to render a map */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-full mb-4 rounded-md" />
        <div className="h-[300px] sm:h-[400px] w-full rounded-md bg-muted/30 flex items-center justify-center">
          <div className="text-muted-foreground text-sm flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 border-t-primary animate-spin mb-2"></div>
            <span>Loading map...</span>
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <div className="mb-4 sm:mb-6">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-md" />
      </div>

      {/* Activity Skeleton */}
      <div>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Card>
          <CardContent className="p-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};