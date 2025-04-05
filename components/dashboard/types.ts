import { ReactNode, ReactElement } from 'react';

// Stat Card Types
export interface StatProps {
  title: string;
  value: string;
  icon: ReactElement;
  color: string;
}

// Priority Task Types
export interface PriorityTaskProps {
    task: {
        title: string;
        project: string;
        progress?: number;
        deadline?: string;
        badge: string;
        badgeVariant: "default" | "destructive" | "outline" | "secondary";
    };
}

// Milestone Types
export interface MilestoneProps {
  milestone: {
    id: number;
    name: string;
    project: string;
    deadline: string;
    startDate: string;
    status: 'Pada Jadwal' | 'Terlambat' | 'Selesai' | 'Belum Dimulai' | string;
    icon: ReactNode;
    description?: string;
    // Document tracking properties
    requiredDocs: number;
    uploadedDocs: number;
    documents?: DocumentProps['doc'][];
  };
}

// Document Types
export interface DocumentProps {
  doc: {
    name: string;
    project: string;
    deadline: string;
  };
}

// Activity Types
export interface ActivityProps {
  activity: {
    action: string;
    time: string;
    project: string;
  };
}
