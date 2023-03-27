import { createSlice } from '@reduxjs/toolkit'
import { getPodcasts } from './api'
import { IPodcastState } from './interfaces'

const initialState: IPodcastState = {
  loading: false,
  error: null,
  data: [],
}

const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(getPodcasts.matchPending, (state) => {
        state.loading = true
        state.error = null
      })
      .addMatcher(getPodcasts.matchFulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
      })
      .addMatcher(getPodcasts.matchRejected, (state, { error }) => {
        state.loading = false
        state.error = error.message as string
      })
  },
})
export const { reducer: podcasts } = podcastsSlice
