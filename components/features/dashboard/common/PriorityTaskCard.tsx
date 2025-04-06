import React from 'react';
import { Upload } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PriorityTaskProps } from '../types';

export const PriorityTaskCard = ({ task }: PriorityTaskProps) => {  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
        <Badge variant={task.badgeVariant as "default" | "destructive" | "outline" | "secondary"}>{task.badge}</Badge>
        <span className="text-xs text-muted-foreground font-medium">{task.deadline || 'Segera'}</span>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h4 className="font-medium text-base">{task.title}</h4>
        <p className="text-sm text-muted-foreground">{task.project}</p>
        {task.progress !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      {task.title === 'Buat Laporan Harian' && (
        <CardFooter className="p-4 pt-0">
          <Button size="sm" className="w-full">
            Buat Sekarang
          </Button>
        </CardFooter>
      )}
      {task.title === 'Foto Pemasangan Kabel' && (
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" size="sm" className="w-full">
            <Upload className="h-4 w-4 mr-2" /> Upload
          </Button>
        </CardFooter>
      )}
      {task.title === 'Pemasangan Kabel' && (
        <CardFooter className="p-4 pt-0">
          <Button variant="secondary" size="sm" className="w-full">
            Lihat Detail
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};