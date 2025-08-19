export interface Gallery {
  id: number;
  title: string;
  type: 'image' | 'video';
  url: string;
  createdBy: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}