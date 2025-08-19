export interface Retiree {
  id: number
  name: string
  biography: string
  imageUrl: string
  comments: string
  position: string
  department: string
  yearsOfExperience: string
  retirementDate: string
  createdAt: string
  updatedAt: string
}

export interface CreateRetireeRequest {
  name: string
  biography: string
  imageUrl?: string
  comments?: string
  position: string
  department: string
  yearsOfExperience: string
  retirementDate: string
}

export interface UpdateRetireeRequest {
  name?: string
  biography?: string
  imageUrl?: string
  comments?: string
  position?: string
  department?: string
  yearsOfExperience?: string
  retirementDate?: string
}

export interface RetireeResponse {
  data: Retiree[]
  total: number
  page: number
  limit: number
}

export interface RetireeStats {
  totalTributes: number
  averageRating: number
  totalViews: number
}
