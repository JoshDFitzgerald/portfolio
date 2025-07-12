export interface Work {
  title: string;
  type: 'Project' | 'Publication' | 'Article';
  imageUrl: string;
  url: string;
  timestamp: Date;
  description?: string; // Added for project descriptions
  tags?: string[]; // Added for project tags
  publicationPlatform?: string; // Added for publications
  year?: number; // Added for publications
}
