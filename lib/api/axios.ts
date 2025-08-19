import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

const API_BASE_URL = "https://africare.replit.app"

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`)

        // Add auth token if available
        const token = this.getAuthToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (error) => {
        console.error("Request interceptor error:", error)
        return Promise.reject(error)
      },
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(`API response status: ${response.status}`)
        console.log(`API response data:`, response.data)
        return response
      },
      (error) => {
        console.error("API request failed:", error.response?.data || error.message)

        // Handle specific error cases
        if (error.response?.status === 401) {
          // Handle unauthorized - maybe redirect to login
          this.clearAuthToken()
        }

        return Promise.reject(error)
      },
    )
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      // Check localStorage first, then sessionStorage for backward compatibility
      return localStorage.getItem("token") || sessionStorage.getItem("auth_token")
    }
    return null
  }

  private setAuthToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
      // Keep sessionStorage for backward compatibility
      sessionStorage.setItem("auth_token", token)
    }
  }

  private clearAuthToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      sessionStorage.removeItem("auth_token")
    }
  }

  private requireAuth(): string {
    const token = this.getAuthToken()
    if (!token) {
      throw new Error("User is not authenticated - no token found")
    }
    return token
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  // Test connection
  async testConnection() {
    try {
      return await this.get("/")
    } catch (error) {
      console.error("API connection test failed:", error)
      throw error
    }
  }

  // Auth methods
  async sendOTP(email: string) {
    return await this.post("/auth/send-otp", { email })
  }

  async verifyOTP(email: string, otp: string) {
    const response = await this.post("/auth/verify-otp", { email, otp })

    // Store token in localStorage if provided
    if (response && typeof response === "object" && "token" in response) {
      this.setAuthToken((response as { token: string }).token)
    }

    return response
  }

  async refreshToken() {
    this.requireAuth()
    return await this.post("/auth/refresh-token")
  }

  async getCurrentUser() {
    this.requireAuth()
    return await this.get("/auth/me")
  }

  async logout() {
    const token = this.getAuthToken()
    if (token) {
      try {
        await this.post("/auth/logout")
      } catch (error) {
        console.warn("Logout API call failed:", error)
      }
    }
    this.clearAuthToken()
  }

  // Retirees methods
  async getRetirees() {
    this.requireAuth()
    return await this.get("/api/retirees")
  }

  async getRetiree(id: string) {
    this.requireAuth()
    return await this.get(`/api/retirees/${id}`)
  }

  async createRetiree(data: any) {
    this.requireAuth()
    return await this.post("/api/retirees", data)
  }

  async updateRetiree(id: string, data: any) {
    this.requireAuth()
    return await this.put(`/api/retirees/${id}`, data)
  }

  async deleteRetiree(id: string) {
    this.requireAuth()
    return await this.delete(`/api/retirees/${id}`)
  }

  async getRetireeStats(id: string) {
    this.requireAuth()
    return await this.get(`/api/retirees/${id}/stats`)
  }

  // Tributes methods
  async getTributes(params?: any) {
    this.requireAuth()
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : ""
    return await this.get(`/api/tributes${queryString}`)
  }

  async getTribute(id: string) {
    this.requireAuth()
    return await this.get(`/api/tributes/${id}`)
  }

  async createTribute(data: any) {
    this.requireAuth()
    return await this.post("/api/tributes", data)
  }

  async updateTribute(id: string, data: any) {
    this.requireAuth()
    return await this.put(`/api/tributes/${id}`, data)
  }

  async deleteTribute(id: string) {
    this.requireAuth()
    return await this.delete(`/api/tributes/${id}`)
  }

  async approveTribute(id: string) {
    this.requireAuth()
    try {
      return await this.post(`/api/tributes/${id}/approve`)
    } catch (error) {
      // Fallback to PUT with status update
      return await this.put(`/api/tributes/${id}`, { status: "approved" })
    }
  }

  async rejectTribute(id: string) {
    this.requireAuth()
    try {
      return await this.post(`/api/tributes/${id}/reject`)
    } catch (error) {
      // Fallback to PUT with status update
      return await this.put(`/api/tributes/${id}`, { status: "rejected" })
    }
  }

  async getTributesByRetiree(retireeId: string) {
    this.requireAuth()
    return await this.get(`/api/tributes?retireeId=${retireeId}`)
  }

  async getTributeStats() {
    this.requireAuth()
    return await this.get("/api/tributes/stats")
  }

  // Admin methods
  async getAdminStats() {
    this.requireAuth()
    return await this.get("/api/admin/stats")
  }

  async getDashboardData() {
    this.requireAuth()
    return await this.get("/api/admin/dashboard")
  }

  async exportData(type: string) {
    this.requireAuth()
    return await this.get(`/api/admin/export/${type}`)
  }

  async getSystemHealth() {
    this.requireAuth()
    return await this.get("/api/admin/health")
  }

  // File upload
  async uploadFile(file: File, type: "image" | "video") {
    this.requireAuth()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    return await this.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async uploadMultipleFiles(files: File[], type: "image" | "video") {
    this.requireAuth()
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })
    formData.append("type", type)

    return await this.post("/api/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  async deleteFile(url: string) {
    this.requireAuth()
    return await this.delete("/api/upload", { data: { url } })
  }

  async getFileInfo(url: string) {
    this.requireAuth()
    return await this.get(`/api/upload/info?url=${encodeURIComponent(url)}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
