"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "./client"
import { useDispatch } from "react-redux"
import { setTributes, addTribute, updateTribute, deleteTribute } from "../store/slices/tributeSlice"
import { setRetirees, addRetiree, updateRetiree, deleteRetiree } from "../store/slices/retireeSlice"
import { loginSuccess, loginFailure } from "../store/slices/authSlice"

// Mock data fallbacks
const mockRetirees = [
  {
    id: "1",
    name: "Dr. Drill Don",
    position: "Chief Innovation Officer",
    department: "Research & Development",
    bio: "Dr. Drill Don has revolutionized drilling technology and mentored countless engineers throughout his illustrious 30-year career at Africa Re.",
    avatar: "/placeholder.svg?height=400&width=400&text=Dr.+Drill+Don",
    retirementDate: "2024-12-31",
    yearsOfService: 30,
    status: "active",
    createdAt: "1994-01-01",
    updatedAt: "2024-01-01",
  },
]

const mockTributes = [
  {
    id: "1",
    retireeId: "1",
    authorId: "1",
    author: {
      name: "Sarah Mitchell",
      department: "Engineering",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
    },
    content:
      "Dr. Drill Don's innovative approach to drilling technology has transformed our industry. His mentorship shaped my entire career, and his legacy will inspire generations of engineers.",
    image: "/placeholder.svg?height=300&width=500&text=Engineering+Innovation",
    status: "approved",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    retireeId: "1",
    authorId: "2",
    author: {
      name: "Michael Chen",
      department: "Research",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    content:
      "Working under Dr. Don's guidance was a privilege. His passion for innovation and dedication to excellence made every project a learning experience.",
    status: "approved",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "3",
    retireeId: "1",
    authorId: "3",
    author: {
      name: "Dr. Amara Okafor",
      department: "Technology",
      avatar: "/placeholder.svg?height=40&width=40&text=AO",
    },
    content:
      "Dr. Drill Don's contributions to sustainable drilling practices have set new industry standards. His vision for the future continues to guide our research.",
    status: "approved",
    createdAt: "2024-01-13T09:20:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
  },
]

// Test API connection hook
export function useTestConnection() {
  return useQuery({
    queryKey: ["test-connection"],
    queryFn: () => apiClient.testConnection(),
    retry: false,
    staleTime: 0,
  })
}

// Auth hooks
export function useLogin() {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: ({ email, otp }: { email: string; otp: string }) => apiClient.login(email, otp),
    onSuccess: (data) => {
      // Extract user info from the API response
      const user = {
        id: data.user?.id || "api-user",
        email: data.user?.email || email,
        name: data.user?.name || email.split("@")[0],
        role: data.user?.role || (email.startsWith("admin") ? "admin" : "staff"),
        department: data.user?.department || "General",
      }
      dispatch(loginSuccess(user))
    },
    onError: (error) => {
      dispatch(loginFailure())
      throw error
    },
  })
}

export function useSendOTP() {
  return useMutation({
    mutationFn: (email: string) => apiClient.sendOTP(email),
  })
}

// Retirees hooks with better error handling
export function useRetirees() {
  const dispatch = useDispatch()

  return useQuery({
    queryKey: ["retirees"],
    queryFn: async () => {
      try {
        const data = await apiClient.getRetirees()
        dispatch(setRetirees(data))
        return data
      } catch (error: any) {
        console.warn("Retirees API not available, using mock data:", error.message)
        dispatch(setRetirees(mockRetirees))
        return mockRetirees
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useRetiree(id: string) {
  return useQuery({
    queryKey: ["retiree", id],
    queryFn: async () => {
      try {
        return await apiClient.getRetiree(id)
      } catch (error: any) {
        console.warn("Retiree API not available, using mock data:", error.message)
        return mockRetirees.find((r) => r.id === id) || mockRetirees[0]
      }
    },
    enabled: !!id,
  })
}

export function useCreateRetiree() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (data: any) => apiClient.createRetiree(data),
    onSuccess: (newRetiree) => {
      dispatch(addRetiree(newRetiree))
      queryClient.invalidateQueries({ queryKey: ["retirees"] })
    },
    onError: (error: any) => {
      console.error("Failed to create retiree:", error.message)
      throw error
    },
  })
}

export function useUpdateRetiree() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.updateRetiree(id, data),
    onSuccess: (updatedRetiree) => {
      dispatch(updateRetiree(updatedRetiree))
      queryClient.invalidateQueries({ queryKey: ["retirees"] })
      queryClient.invalidateQueries({ queryKey: ["retiree", updatedRetiree.id] })
    },
    onError: (error: any) => {
      console.error("Failed to update retiree:", error.message)
      throw error
    },
  })
}

export function useDeleteRetiree() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteRetiree(id),
    onSuccess: (_, id) => {
      dispatch(deleteRetiree(id))
      queryClient.invalidateQueries({ queryKey: ["retirees"] })
    },
    onError: (error: any) => {
      console.error("Failed to delete retiree:", error.message)
      throw error
    },
  })
}

// Tributes hooks with better error handling
export function useTributes(params?: { status?: string; retireeId?: string; search?: string }) {
  const dispatch = useDispatch()

  return useQuery({
    queryKey: ["tributes", params],
    queryFn: async () => {
      try {
        const data = await apiClient.getTributes(params)
        dispatch(setTributes(data))
        return data
      } catch (error: any) {
        console.warn("Tributes API not available, using mock data:", error.message)
        dispatch(setTributes(mockTributes))
        return mockTributes
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useTribute(id: string) {
  return useQuery({
    queryKey: ["tribute", id],
    queryFn: async () => {
      try {
        return await apiClient.getTribute(id)
      } catch (error: any) {
        console.warn("Tribute API not available, using mock data:", error.message)
        return mockTributes.find((t) => t.id === id) || mockTributes[0]
      }
    },
    enabled: !!id,
  })
}

export function useCreateTribute() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (data: any) => apiClient.createTribute(data),
    onSuccess: (newTribute) => {
      dispatch(addTribute(newTribute))
      queryClient.invalidateQueries({ queryKey: ["tributes"] })
    },
    onError: (error: any) => {
      console.error("Failed to create tribute:", error.message)
      throw error
    },
  })
}

export function useUpdateTribute() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.updateTribute(id, data),
    onSuccess: (updatedTribute) => {
      dispatch(updateTribute(updatedTribute))
      queryClient.invalidateQueries({ queryKey: ["tributes"] })
      queryClient.invalidateQueries({ queryKey: ["tribute", updatedTribute.id] })
    },
    onError: (error: any) => {
      console.error("Failed to update tribute:", error.message)
      throw error
    },
  })
}

export function useDeleteTribute() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (id: string) => apiClient.deleteTribute(id),
    onSuccess: (_, id) => {
      dispatch(deleteTribute(id))
      queryClient.invalidateQueries({ queryKey: ["tributes"] })
    },
    onError: (error: any) => {
      console.error("Failed to delete tribute:", error.message)
      throw error
    },
  })
}

export function useApproveTribute() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (id: string) => apiClient.approveTribute(id),
    onSuccess: (updatedTribute) => {
      dispatch(updateTribute(updatedTribute))
      queryClient.invalidateQueries({ queryKey: ["tributes"] })
    },
    onError: (error: any) => {
      console.error("Failed to approve tribute:", error.message)
      throw error
    },
  })
}

export function useRejectTribute() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (id: string) => apiClient.rejectTribute(id),
    onSuccess: (updatedTribute) => {
      dispatch(updateTribute(updatedTribute))
      queryClient.invalidateQueries({ queryKey: ["tributes"] })
    },
    onError: (error: any) => {
      console.error("Failed to reject tribute:", error.message)
      throw error
    },
  })
}

// Admin hooks
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        return await apiClient.getAdminStats()
      } catch (error: any) {
        console.warn("Admin stats API not available, using mock data:", error.message)
        return {
          totalTributes: mockTributes.length,
          pendingTributes: mockTributes.filter((t) => t.status === "pending").length,
          approvedTributes: mockTributes.filter((t) => t.status === "approved").length,
          rejectedTributes: mockTributes.filter((t) => t.status === "rejected").length,
          totalRetirees: mockRetirees.length,
          tributesByRetiree: [],
          tributesByMonth: [],
        }
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// File upload hook
export function useUploadFile() {
  return useMutation({
    mutationFn: ({ file, type }: { file: File; type: "image" | "video" }) => apiClient.uploadFile(file, type),
    onError: (error: any) => {
      console.error("Failed to upload file:", error.message)
      throw error
    },
  })
}
