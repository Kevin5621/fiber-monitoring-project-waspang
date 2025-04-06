import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch(status) {
    case 'not-started':
    case 'Belum Dimulai':
      return <Badge variant="outline" className="bg-muted/50-100 text-gray-800 hover:bg-muted/50-100">Belum Dimulai</Badge>;
    case 'in-progress':
    case 'Pada Jadwal':
    case 'Terlambat':
      return <Badge variant="outline" className="bg-info-100 text-blue-800 hover:bg-info-100">Sedang Berjalan</Badge>;
    case 'completed':
    case 'Selesai':
      return <Badge variant="outline" className="bg-success-100 text-green-800 hover:bg-success-100">Selesai</Badge>;
    case 'approved':
      return <Badge variant="outline" className="bg-success-100 text-green-800 hover:bg-success-100">Disetujui</Badge>;
    case 'in-review':
      return <Badge variant="outline" className="bg-info-100 text-blue-800 hover:bg-info-100">Dalam Peninjauan</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Ditolak</Badge>;
    case 'draft':
      return <Badge variant="outline" className="bg-muted/50-100 text-gray-800 hover:bg-muted/50-100">Draft</Badge>;
    default:
      return null;
  }
};

export const StatusIcon = ({ status }: StatusBadgeProps) => {
  switch(status) {
    case 'completed':
    case 'Selesai':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'in-progress':
    case 'Pada Jadwal':
    case 'Terlambat':
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};