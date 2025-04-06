import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from './types';

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="flex items-center mb-6">
      <Link href="/dashboard/project" className="mr-4 p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <h2 className="text-2xl font-bold">{project.name}</h2>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9">
          <Download className="mr-2 h-4 w-4" />
          Ekspor
        </Button>
      </div>
    </div>
  );
};

export default ProjectHeader;