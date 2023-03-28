import { createSlice } from '@reduxjs/toolkit'
import { getPodcasts } from '../podcasts'
interface ISystem {
  lastUpdated: EpochTimeStamp | null
  loading: boolean
}

const initialState: ISystem = {
  lastUpdated: null,
  loading: false,
}

const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(getPodcasts.matchFulfilled, (state, action) => {
      state.lastUpdated = action.meta.fulfilledTimeStamp
    })
  },
})
export const {
  actions: { setLoading },
} = systemSlice
export default systemSlice.reducer
