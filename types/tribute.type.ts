
// types/tribute.type.ts
export interface Tribute {
  id: number;
  retireeId: number;
  createdBy: number;
  title: string;
  description: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
  videoUrl: string | null;
  likeCount: number;
  isLikedByUser: boolean;
  comments: any[];
  department: string | null; 
  createdByUser: {
    id: number;
    email: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface Comment {
  id: number;
  tributeId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface TributeSubmitRequest {
  title: string;
  description: string;
  department: string;
  retireeId: number;

  imageUrl?: string;
  videoUrl?: string;
}

export interface TributeUpdateRequest {
  status: 'pending' | 'approved' | 'rejected';
}

export interface CommentRequest {
  comment: string;
}