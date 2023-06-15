"use client";
import { createSlice } from "@reduxjs/toolkit";
import { getPodcast, getPodcasts } from "./api";
import { IPodcastState } from "./interfaces";

const initialState: IPodcastState = {
  loading: false,
  error: null,
  data: [],
  podcastInfo: {},
  currentPodcastId: "",
};

const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setCurrentPodcastId: (state, action) => {
      state.currentPodcastId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(getPodcasts.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(getPodcasts.matchFulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addMatcher(getPodcasts.matchRejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addMatcher(getPodcast.matchFulfilled, (state, { payload }) => {
        if (!state.podcastInfo) state.podcastInfo = {};
        state.podcastInfo[payload.id] = payload;
      });
  },
});
export const {
  actions: { setCurrentPodcastId },
} = podcastsSlice;

export default podcastsSlice.reducer;
