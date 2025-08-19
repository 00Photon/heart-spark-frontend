import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Retiree } from "../../types"

interface RetireeState {
  retirees: Retiree[]
  loading: boolean
  error: string | null
}

const initialState: RetireeState = {
  retirees: [],
  loading: false,
  error: null,
}

const retireeSlice = createSlice({
  name: "retirees",
  initialState,
  reducers: {
    setRetirees: (state, action: PayloadAction<Retiree[]>) => {
      state.retirees = action.payload
    },
    addRetiree: (state, action: PayloadAction<Retiree>) => {
      state.retirees.push(action.payload)
    },
    updateRetiree: (state, action: PayloadAction<Retiree>) => {
      const index = state.retirees.findIndex((r) => r.id === action.payload.id)
      if (index !== -1) {
        state.retirees[index] = action.payload
      }
    },
    deleteRetiree: (state, action: PayloadAction<string>) => {
      state.retirees = state.retirees.filter((r) => r.id !== action.payload)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setRetirees, addRetiree, updateRetiree, deleteRetiree, setLoading, setError } = retireeSlice.actions

export default retireeSlice.reducer
