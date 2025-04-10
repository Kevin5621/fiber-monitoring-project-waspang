import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardTitle } from '@/components/common/ui/card';

export const EmptyProjectState = () => {
  return (
    <Card className="py-8">
      <div className="text-center">
        <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <CardTitle className="mb-2">Tidak ada proyek ditemukan</CardTitle>
        <p className="text-muted-foreground">Tidak ada proyek yang sesuai dengan filter yang dipilih</p>
      </div>
    </Card>
  );
};