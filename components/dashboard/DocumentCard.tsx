import React from 'react';
import { FileText, Upload } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DocumentProps } from './types';

export const DocumentCard = ({ doc }: DocumentProps) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-destructive">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{doc.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{doc.project}</p>
            <p className="text-xs text-destructive mt-2">Tenggat: {doc.deadline}</p>
            
            <Button variant="outline" className="w-full mt-4 flex items-center justify-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload Sekarang
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};