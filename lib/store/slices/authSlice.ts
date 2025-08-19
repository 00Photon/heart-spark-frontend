import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

// Try to get initial state from sessionStorage if available
const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    try {
      const savedAuth = sessionStorage.getItem("auth")
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth)
        return {
          user: parsed.user || null,
          isAuthenticated: parsed.isAuthenticated || false,
          loading: false,
        }
      }
    } catch (error) {
      console.error("Error loading auth from sessionStorage:", error)
    }
  }

  return {
    user: null,
    isAuthenticated: false,
    loading: false,
  }
}

const initialState: AuthState = getInitialState()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = false

      // Save to sessionStorage
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            "auth",
            JSON.stringify({
              user: action.payload,
              isAuthenticated: true,
            }),
          )
        } catch (error) {
          console.error("Error saving auth to sessionStorage:", error)
        }
      }
    },
    loginFailure: (state) => {
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false

      // Clear sessionStorage
      if (typeof window !== "undefined") {
        try {
          sessionStorage.removeItem("auth")
        } catch (error) {
          console.error("Error clearing auth from sessionStorage:", error)
        }
      }
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
