const API_BASE_URL = "https://africare.replit.app"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log(`Making API request to: ${url}`)
      const response = await fetch(url, config)

      console.log(`API response status: ${response.status}`)

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log(`API response data:`, data)
      return data
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Test endpoint to check API availability
  async testConnection() {
    try {
      return await this.request("/")
    } catch (error) {
      console.error("API connection test failed:", error)
      throw error
    }
  }

  // Auth endpoints - using the correct paths from your documentation
  async login(email: string, otp: string) {
    return this.request("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    })
  }

  async sendOTP(email: string) {
    return this.request("/auth/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  // Retirees endpoints - these might not exist yet, so we'll use fallbacks
  async getRetirees() {
    try {
      return await this.request("/api/retirees")
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        // Endpoint doesn't exist, throw error to trigger fallback
        throw new Error("Retirees endpoint not available")
      }
      throw error
    }
  }

  async getRetiree(id: string) {
    try {
      return await this.request(`/api/retirees/${id}`)
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Retiree endpoint not available")
      }
      throw error
    }
  }

  async createRetiree(data: any) {
    try {
      return await this.request("/api/retirees", {
        method: "POST",
        body: JSON.stringify(data),
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Create retiree endpoint not available")
      }
      throw error
    }
  }

  async updateRetiree(id: string, data: any) {
    try {
      return await this.request(`/api/retirees/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Update retiree endpoint not available")
      }
      throw error
    }
  }

  async deleteRetiree(id: string) {
    try {
      return await this.request(`/api/retirees/${id}`, {
        method: "DELETE",
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Delete retiree endpoint not available")
      }
      throw error
    }
  }

  // Tributes endpoints - these might not exist yet, so we'll use fallbacks
  async getTributes(params?: { status?: string; retireeId?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.status) searchParams.append("status", params.status)
    if (params?.retireeId) searchParams.append("retireeId", params.retireeId)
    if (params?.search) searchParams.append("search", params.search)

    const query = searchParams.toString()
    try {
      return await this.request(`/api/tributes${query ? `?${query}` : ""}`)
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Tributes endpoint not available")
      }
      throw error
    }
  }

  async getTribute(id: string) {
    try {
      return await this.request(`/api/tributes/${id}`)
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Tribute endpoint not available")
      }
      throw error
    }
  }

  async createTribute(data: any) {
    try {
      return await this.request("/api/tributes", {
        method: "POST",
        body: JSON.stringify(data),
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Create tribute endpoint not available")
      }
      throw error
    }
  }

  async updateTribute(id: string, data: any) {
    try {
      return await this.request(`/api/tributes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Update tribute endpoint not available")
      }
      throw error
    }
  }

  async deleteTribute(id: string) {
    try {
      return await this.request(`/api/tributes/${id}`, {
        method: "DELETE",
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Delete tribute endpoint not available")
      }
      throw error
    }
  }

  async approveTribute(id: string) {
    try {
      return await this.request(`/api/tributes/${id}/approve`, {
        method: "POST",
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        // Fallback to PUT with status update
        return await this.request(`/api/tributes/${id}`, {
          method: "PUT",
          body: JSON.stringify({ status: "approved" }),
        })
      }
      throw error
    }
  }

  async rejectTribute(id: string) {
    try {
      return await this.request(`/api/tributes/${id}/reject`, {
        method: "POST",
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        // Fallback to PUT with status update
        return await this.request(`/api/tributes/${id}`, {
          method: "PUT",
          body: JSON.stringify({ status: "rejected" }),
        })
      }
      throw error
    }
  }

  // Admin endpoints
  async getAdminStats() {
    try {
      return await this.request("/api/admin/stats")
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("Admin stats endpoint not available")
      }
      throw error
    }
  }

  // File upload endpoint
  async uploadFile(file: File, type: "image" | "video") {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    try {
      return await this.request("/api/upload", {
        method: "POST",
        headers: {}, // Remove Content-Type to let browser set it for FormData
        body: formData,
      })
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("Cannot GET")) {
        throw new Error("File upload endpoint not available")
      }
      throw error
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
