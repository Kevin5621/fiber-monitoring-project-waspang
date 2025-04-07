import React from 'react';
import { Upload, Plus, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentProps } from '../types';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export const DocumentCard = ({ 
  doc, 
  isAddCard, 
  onAddDocument,
  onUpload 
}: DocumentProps & { 
  isAddCard?: boolean;
  onAddDocument?: (name: string, milestoneId: string) => void;
  onUpload?: (name: string, milestoneId: string) => void;
}) => {
  const [documentName, setDocumentName] = useState('');
  const [milestoneId, setMilestoneId] = useState('');

  if (isAddCard) {
    return (
      <Card className="transition-all duration-200 hover:shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 via-accent to-background p-6">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 shadow-inner">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium text-primary">Tambah Dokumentasi Baru</h4>
          </div>
          <div className="space-y-3">
            <Input 
              placeholder="Nama Dokumentasi" 
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="bg-background/80 backdrop-blur-sm"
            />
            <Input 
              placeholder="ID Milestone" 
              value={milestoneId}
              onChange={(e) => setMilestoneId(e.target.value)}
              className="bg-background/80 backdrop-blur-sm"
            />
            <Button 
              variant="default" 
              className="w-full bg-primary/90 hover:bg-primary"
              onClick={() => {
                if (documentName && milestoneId && onAddDocument) {
                  onAddDocument(documentName, milestoneId);
                  setDocumentName('');
                  setMilestoneId('');
                }
              }}
            >
              Tambah Dokumentasi
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-lg overflow-hidden group">
      <div className="bg-gradient-to-r from-secondary/30 via-accent/20 to-background p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-sm">
              <Camera className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-base mb-1">{doc?.name}</h4>
              <p className="text-sm text-muted-foreground">{doc?.project}</p>
            </div>
          </div>
          <Button 
            variant="outline"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-background/80 backdrop-blur-sm hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => {
              if (doc && onUpload && doc.milestoneId) {
                onUpload(doc.name, doc.milestoneId);
              }
            }}
          >
            <Upload className="h-4 w-4" />
            <span className="sm:hidden">Upload Foto</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};