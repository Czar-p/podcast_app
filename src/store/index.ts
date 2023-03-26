import { configureStore, Middleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import rootReducer from './reducer'
import middlewares from './middlewares'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware(), ...middlewares] as Middleware<{}, RootState>[],
})

setupListeners(store.dispatch)
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
