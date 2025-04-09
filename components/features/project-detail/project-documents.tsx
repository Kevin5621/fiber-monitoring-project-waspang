import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectDocument } from "@/data/project/documents";
import { FileIcon, ImageIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ProjectDocumentsProps {
  documents: ProjectDocument[];
}

export default function ProjectDocuments({ documents }: ProjectDocumentsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Project Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="text-muted-foreground">No documents found for this project.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    {doc.type === 'image' ? (
                      <div className="bg-blue-100 p-2 rounded-md">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    ) : (
                      <div className="bg-amber-100 p-2 rounded-md">
                        <FileIcon className="h-6 w-6 text-amber-600" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{doc.name}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{doc.fileType}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{doc.category}</Badge>
                      <span className="text-muted-foreground">{formatDate(doc.uploadDate)}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{doc.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}