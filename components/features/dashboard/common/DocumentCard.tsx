import React from 'react';
import { FileText, Upload, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentProps } from '../types';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const DocumentCard = ({ doc, isAddCard, onAddDocument }: DocumentProps & { 
  isAddCard?: boolean;
  onAddDocument?: (name: string, milestoneId: string) => void;
}) => {
  const [documentName, setDocumentName] = useState('');
  const [milestoneId, setMilestoneId] = useState('');

  if (isAddCard) {
    return (
      <Card className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-grow">
              <h4 className="font-semibold text-lg mb-2">Tambah Dokumen</h4>
              <div className="space-y-3">
                <Input 
                  placeholder="Nama Dokumen" 
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                />
                <Input 
                  placeholder="ID Milestone" 
                  value={milestoneId}
                  onChange={(e) => setMilestoneId(e.target.value)}
                />
                <Button 
                  variant="default" 
                  className="w-full mt-2"
                  onClick={() => {
                    if (documentName && milestoneId && onAddDocument) {
                      onAddDocument(documentName, milestoneId);
                      setDocumentName('');
                      setMilestoneId('');
                    }
                  }}
                >
                  Tambah Dokumen
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-lg border-l-4 border-l-destructive">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg">{doc?.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{doc?.project}</p>
            <p className="text-xs text-destructive mt-2">Tenggat: {doc?.deadline}</p>
            
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