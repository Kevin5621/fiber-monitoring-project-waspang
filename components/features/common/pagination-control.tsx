import React from 'react';
import { Button } from '@/components/common/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/common/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  startIndex,
  canGoBack,
  canGoForward,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50]
}) => {
  // Calculate the correct endIndex here to ensure accuracy
  const displayEndIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-border gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Menampilkan <span className="font-medium text-foreground">{startIndex + 1}-{displayEndIndex}</span> dari <span className="font-medium text-foreground">{totalItems}</span> laporan
        </span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="w-[100px] h-8 text-xs">
            <SelectValue placeholder="Tampilkan" />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map(option => (
              <SelectItem key={option} value={option.toString()} className="text-sm">
                {option} per halaman
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-md" 
          onClick={() => onPageChange(1)}
          disabled={!canGoBack}
          title="Halaman Pertama"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-md" 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoBack}
          title="Halaman Sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center px-2 bg-background rounded-md mx-1">
          <span className="text-sm font-medium">
            {currentPage} <span className="text-muted-foreground">dari</span> {totalPages}
          </span>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-md" 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoForward}
          title="Halaman Berikutnya"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-md" 
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoForward}
          title="Halaman Terakhir"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};