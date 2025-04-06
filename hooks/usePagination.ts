import { useState } from 'react';

interface PaginationOptions {
  totalItems: number;
  initialItemsPerPage?: number;
  initialPage?: number;
}

interface PaginationResult {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  goToFirstPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  goToLastPage: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  paginatedItems: <T>(items: T[]) => T[];
}

export function usePagination({
  totalItems,
  initialItemsPerPage = 5,
  initialPage = 1
}: PaginationOptions): PaginationResult {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Ensure current page is within valid range when dependencies change
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
  
  // Calculate start and end index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  // Navigation functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToLastPage = () => setCurrentPage(totalPages);
  
  // Check if navigation is possible
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;
  
  // Function to paginate any array of items
  function paginatedItems<T>(items: T[]): T[] {
    return items.slice(startIndex, endIndex);
  }
  
  // Handler for changing items per page
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
    totalPages,
    startIndex,
    endIndex,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    canGoBack,
    canGoForward,
    paginatedItems
  };
}