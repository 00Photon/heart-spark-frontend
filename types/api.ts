// API Request Types
export interface SendOTPRequest {
  email: string
}

export interface VerifyOTPRequest {
  email: string
  otp: string
}

export interface CreateTributeRequest {
  retireeId: string
  content: string
  image?: string
  video?: string
  authorId: string
}

export interface UpdateTributeRequest {
  content?: string
  image?: string
  video?: string
  status?: "pending" | "approved" | "rejected"
}

export interface CreateRetireeRequest {
  name: string
  position: string
  department: string
  bio: string
  retirementDate: string
  yearsOfService: number
}

export interface UpdateRetireeRequest {
  name?: string
  position?: string
  department?: string
  bio?: string
  retirementDate?: string
  yearsOfService?: number
  status?: "active" | "retired"
}

export interface UploadFileRequest {
  file: File
  type: "image" | "video"
}

export interface GetTributesParams {
  status?: string
  retireeId?: string
  search?: string
  page?: number
  limit?: number
}
