"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPodcast, IPodcastInfo } from "../interfaces";
import { getPodcastsTransform, getPodcastTransform } from "./transforms";

export const proxyUrl = "https://api.allorigins.win/raw?url=";

const podcastApi = createApi({
  reducerPath: "podcastsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: proxyUrl + "https://itunes.apple.com",
    cache: "no-cache",
    prepareHeaders: (headers) => {
      headers.set("x-requested-with", "XMLHttpRequest");
      return headers;
    },
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPodcasts: builder.query<IPodcast[], void>({
      query: () => "/us/rss/toppodcasts/limit=100/genre=1310/json",
      keepUnusedDataFor: 0,
      transformResponse: getPodcastsTransform,
    }),
    getPodcast: builder.query<IPodcastInfo, string>({
      query: (id) => `/lookup?id=${id}&media=podcast`,
      keepUnusedDataFor: 0,
      transformResponse: getPodcastTransform,
    }),
  }),
});

export const {
  useGetPodcastQuery,
  useGetPodcastsQuery,
  reducer: podcastsApi,
  middleware: podcastMiddleware,
  endpoints: { getPodcasts, getPodcast },
} = podcastApi;
