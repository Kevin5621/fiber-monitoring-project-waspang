import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { PaginationControl } from '@/components/features/common/pagination-control';
import { Document } from './types';

interface DocumentationTabProps {
  filteredDocuments: Document[];
}

const DocumentationTab = ({ filteredDocuments }: DocumentationTabProps) => {
  const [documentsPage, setDocumentsPage] = useState(1);
  const [documentsPerPage, setDocumentsPerPage] = useState(8);
  
  // Pagination calculations for documents
  const documentsStartIndex = (documentsPage - 1) * documentsPerPage;
  const documentsEndIndex = Math.min(documentsStartIndex + documentsPerPage - 1, filteredDocuments.length - 1);
  const documentsTotalPages = Math.ceil(filteredDocuments.length / documentsPerPage);
  const paginatedDocuments = filteredDocuments.slice(documentsStartIndex, documentsStartIndex + documentsPerPage);

  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {paginatedDocuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {paginatedDocuments.map((doc) => (
                <div key={doc.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                  <div className={`h-32 bg-muted flex items-center justify-center ${doc.type === 'image' ? 'bg-info-50' : 'bg-warning-50'}`}>
                    <FileText className={`h-12 w-12 ${doc.type === 'image' ? 'text-blue-400' : 'text-amber-400'}`} />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm truncate" title={doc.name}>{doc.name}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{doc.uploadDate}</span>
                      <span>{doc.size}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">
                        {doc.uploadedBy}
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada dokumen ditemukan</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Tidak ada dokumen yang sesuai dengan pencarian Anda.
              </p>
            </div>
          )}
          
          {filteredDocuments.length > 0 && (
            <PaginationControl
              currentPage={documentsPage}
              totalPages={documentsTotalPages}
              itemsPerPage={documentsPerPage}
              totalItems={filteredDocuments.length}
              startIndex={documentsStartIndex}
              endIndex={documentsEndIndex}
              canGoBack={documentsPage > 1}
              canGoForward={documentsPage < documentsTotalPages}
              onPageChange={setDocumentsPage}
              onItemsPerPageChange={setDocumentsPerPage}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationTab;