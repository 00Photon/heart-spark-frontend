interface Comment {
  id: number;
  tributeId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Tribute {
  id: string | number;
  title?: string;
  description?: string;
  createdBy?: number;
  retireeId: string | number;
  imageUrl?: string;
  videoUrl?: string;
  status?: "pending" | "approved" | "rejected";
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
  isLikedByUser?: boolean;
  comments?: Comment[];
  // Additional fields from mock data
  retireeName?: string;
  authorName?: string;
  authorEmail?: string;
  relationship?: string;
  message?: string;
  rating?: number;
  isAnonymous?: boolean;
  mediaUrls?: string[];
  content?: string;
  author?: {
    id: string;
    name: string;
    email: string;
    department?: string;
    avatar?: string;
  };
  image?: string | null;
  video?: string | null;
}