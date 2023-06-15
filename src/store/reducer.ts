import { combineReducers } from "@reduxjs/toolkit";
import { podcasts, podcastsApi } from "./podcasts";
import system from "./system";

const rootReducer = combineReducers({
  podcasts,
  podcastsApi,
  system,
});

export default rootReducer;
