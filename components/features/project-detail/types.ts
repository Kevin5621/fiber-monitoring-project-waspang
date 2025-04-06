export interface Project {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
  milestones: number;
  completedMilestones: number;
  pendingDocuments: number;
  description: string;
}

export interface Milestone {
  id: number;
  projectId: number;
  name: string;
  startDate: string;
  deadline: string;
  status: string;
  progress: number;
  requiredPhotos?: {
    name: string;
    uploaded: boolean;
  }[];
}

export interface Report {
  id: number;
  projectId: number;
  title: string;
  date: string;
  submittedAt: string;
  submittedBy: string;
  status: string;
  activities: string[];
  issues?: string[];
  nextPlan: string;
}

export interface Document {
  id: number;
  projectId: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface Team {
  pm: string;
  admin: string;
  waspang: string;
}