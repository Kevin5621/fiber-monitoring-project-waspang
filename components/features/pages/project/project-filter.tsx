import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/common/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/common/ui/select';

interface ProjectFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const ProjectFilter = ({ 
  searchQuery, 
  setSearchQuery, 
  filterStatus, 
  setFilterStatus 
}: ProjectFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Cari proyek..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="w-full sm:w-40">
        <Select
          value={filterStatus}
          onValueChange={(value) => setFilterStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="not-started">Belum Dimulai</SelectItem>
            <SelectItem value="in-progress">Sedang Berjalan</SelectItem>
            <SelectItem value="completed">Selesai</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};