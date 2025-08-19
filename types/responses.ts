// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data: T
}

export interface AuthResponse {
  success: boolean
  message: string
  user: {
    id: string
    email: string
    name: string
    role: "admin" | "staff"
    department?: string
    avatar?: string
  }
  token: string
}

export interface SendOTPResponse {
  success: boolean
  message: string
}

export interface TributeResponse {
  id: string
  retireeId: string
  authorId: string
  author: {
    name: string
    department: string
    avatar?: string
  }
  content: string
  image?: string
  video?: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  moderatedBy?: string
  moderatedAt?: string
}

export interface RetireeResponse {
  id: string
  name: string
  position: string
  department: string
  bio: string
  avatar: string
  retirementDate: string
  yearsOfService: number
  status: "active" | "retired"
  createdAt: string
  updatedAt: string
}

export interface AdminStatsResponse {
  totalTributes: number
  pendingTributes: number
  approvedTributes: number
  rejectedTributes: number
  totalRetirees: number
  tributesByRetiree: Array<{
    retireeName: string
    count: number
  }>
  tributesByMonth: Array<{
    month: string
    count: number
  }>
}

export interface UploadFileResponse {
  success: boolean
  url: string
  filename: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
