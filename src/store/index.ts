'use client'
import { configureStore, Middleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig,
  Persistor,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer'
import middlewares from './middlewares'
import { createWrapper } from 'next-redux-wrapper'
type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  whitelist: ['system', 'podcasts'],
  blacklist: ['podcastsApi'],
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      [
        ...getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
        ...middlewares,
      ] as Middleware<{}, RootState>[],
  })
type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>
export const store = makeStore()
setupListeners(store.dispatch)
export const wrapper = createWrapper<AppStore>(makeStore)
export const persistor: Persistor = persistStore(store)

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
