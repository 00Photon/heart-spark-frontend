import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import tributeSlice from "./slices/tributeSlice"
import retireeSlice from "./slices/retireeSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  tributes: tributeSlice,
  retirees: retireeSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
