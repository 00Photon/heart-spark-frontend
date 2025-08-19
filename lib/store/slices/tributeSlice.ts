import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Tribute } from "../../types"

interface TributeState {
  tributes: Tribute[]
  loading: boolean
  error: string | null
  filters: {
    retireeId?: string
    status?: string
    search?: string
  }
}

const initialState: TributeState = {
  tributes: [],
  loading: false,
  error: null,
  filters: {},
}

const tributeSlice = createSlice({
  name: "tributes",
  initialState,
  reducers: {
    setTributes: (state, action: PayloadAction<Tribute[]>) => {
      state.tributes = action.payload
    },
    addTribute: (state, action: PayloadAction<Tribute>) => {
      state.tributes.unshift(action.payload)
    },
    updateTribute: (state, action: PayloadAction<Tribute>) => {
      const index = state.tributes.findIndex((t) => t.id === action.payload.id)
      if (index !== -1) {
        state.tributes[index] = action.payload
      }
    },
    deleteTribute: (state, action: PayloadAction<string>) => {
      state.tributes = state.tributes.filter((t) => t.id !== action.payload)
    },
    setFilters: (state, action: PayloadAction<Partial<TributeState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setTributes, addTribute, updateTribute, deleteTribute, setFilters, setLoading, setError } =
  tributeSlice.actions

export default tributeSlice.reducer
