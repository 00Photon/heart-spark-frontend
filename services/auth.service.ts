import axios from 'axios';
import {
  LoginResponse,
  RecoveryResponse,
  User,
} from "@/types/auth.type";
import { API_BASE_URL } from "@/utils/constant";



export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private get isOnlineMode(): boolean {
    return typeof window !== "undefined" && navigator.onLine;
  }

  public getOnlineMode(): boolean {
    return this.isOnlineMode;
  }

  private handleApiError(error: any, fallback: any): any {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    return fallback;
  }

  private requireAuth(): void {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
  }

async getUserProfile(): Promise<{ success: boolean; user: User | null; message: string }> {
    try {
      if (!this.isOnlineMode) {
        return {
          success: true,
          user: {
            id: 0,
            email: "offline@example.com",
            firstName: "Offline",
            lastName: "User",
            avatar: "",
            timezone: "Africa/Lagos",
            role: "admin",
            isActive: true,
            createdAt: new Date().toISOString(),
          },
          message: "User profile fetched (offline mode)",
        };
      }

      this.requireAuth();

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return {
        success: true,
        user: response.data,
        message: "User profile fetched successfully",
      };
    } catch (error: any) {
      return this.handleApiError(error, {
        success: false,
        user: null,
        message: "Failed to fetch user profile",
      });
    }
  }

async updateProfile(data: Partial<User>): Promise<{ success: boolean; user: User | null; message: string }> {
    try {
      if (!this.isOnlineMode) {
        const userData = {
          id: 0,
          email: "offline@example.com",
          firstName: data.firstName || "Offline",
          lastName: data.lastName || "User",
          avatar: data.avatar || "",
          timezone: data.timezone || "Africa/Lagos",
          role: "user",
          isActive: true,
          createdAt: new Date().toISOString(),
        };

        return {
          success: true,
          user: userData,
          message: "Profile updated (offline mode)",
        };
      }

      this.requireAuth();

      const headers: Record<string, string> = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const body = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        timezone: data.timezone,
        avatar: data.avatar || null,
      });
      console.log("Sending profile update request:", body);

      const response = await axios.put(`${API_BASE_URL}/auth/profile`, body, {
        headers,
      });

      console.log("Profile update response:", response.data);

      return {
        success: true,
        user: response.data,
        message: "Profile updated successfully",
      };
    } catch (error: any) {
      return this.handleApiError(error, {
        success: false,
        user: null,
        message: "Failed to update profile",
      });
    }
  }

  async sendOTP(email: string): Promise<RecoveryResponse> {
    try {
      if (!this.isOnlineMode) {
        return {
          success: true,
          message: "OTP sent successfully (offline mode)",
        };
      }
      const response = await axios.post<RecoveryResponse>(`${API_BASE_URL}/auth/send-otp`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error, {
        success: true,
        message: "OTP sent successfully (offline mode)",
      });
    }
  }

  async verifyOTP(email: string, otp: string): Promise<LoginResponse> {
    try {
      if (!this.isOnlineMode) {
        const token = "offline-token";
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          sessionStorage.setItem("auth_token", token);
          console.log("Offline mode: Token stored in localStorage:", token);
        }
        const isAdmin = email.startsWith("admin@");
        return {
          success: true,
          message: "Login successful (offline mode)",
          access_token: token,
          user: {
            id: "offline-user",
            email,
            name: isAdmin ? "Admin User (Offline)" : "Staff User (Offline)",
            role: isAdmin ? "admin" : "staff",
            status: "active",
          },
        };
      }

      console.log("Making API call to verify OTP...");
      const response = await axios.post<{
        access_token: string;
        user: { id: number; email: string; firstName: string; lastName: string; role: string };
        isAuthenticated?: boolean;
      }>(
        `${API_BASE_URL}/auth/verify-otp`,
        { email, otp },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log("API Response:", JSON.stringify(response.data, null, 2));

      if (!response.data.access_token) {
        console.error("No access_token found in response.data");
        throw new Error("Invalid response structure: access_token missing");
      }

      if (typeof window !== "undefined") {
        const token = response.data.access_token;
        try {
          localStorage.setItem("token", token);
          sessionStorage.setItem("auth_token", token);
          console.log("Token stored in localStorage:", token);
          const storedToken = localStorage.getItem("token");
          console.log("Retrieved token from localStorage:", storedToken);
          if (storedToken !== token) {
            console.error("Token mismatch: Stored token does not match set token");
          }
        } catch (storageError) {
          console.error("Error accessing localStorage:", storageError);
        }
      } else {
        console.warn("Window is undefined, skipping storage");
      }

      return {
        success: response.data.isAuthenticated ?? true,
        message: "Login successful",
        access_token: response.data.access_token,
        user: response.data.user,
      };
    } catch (error: any) {
      console.error("verifyOTP error:", error.message, error.stack);
      return this.handleApiError(error, {
        success: true,
        message: "Login successful (offline mode)",
        access_token: "offline-token",
        user: {
          id: "offline-user",
          email,
          name: "Offline User",
          role: "user",
          status: "active",
        },
      });
    }
  }

  async resendOTP(email: string): Promise<RecoveryResponse> {
    try {
      if (!this.isOnlineMode) {
        return {
          success: true,
          message: "OTP resent successfully (offline mode)",
        };
      }
      const response = await axios.post<RecoveryResponse>(`${API_BASE_URL}/auth/resend-otp`, { email }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      return this.handleApiError(error, {
        success: true,
        message: "OTP resent successfully (offline mode)",
      });
    }
  }
}

export const authService = AuthService.getInstance();