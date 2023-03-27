import { createSlice } from '@reduxjs/toolkit'
import { getPodcasts } from '../podcasts'
interface ISystem {
  lastUpdated: EpochTimeStamp | null
}

const initialState: ISystem = {
  lastUpdated: null,
}

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(getPodcasts.matchFulfilled, (state, action) => {
      state.lastUpdated = action.meta.fulfilledTimeStamp
    })
  },
})

export default systemSlice.reducer
