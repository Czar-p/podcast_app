import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HTMLAttributes } from 'react'

interface IPodcast {
  name: string
  image: {
    source: string
    attributes: {
      height: number
    }
  }
  artist: string
}
const podcastApi = createApi({
  reducerPath: 'podcasts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://itunes.apple.com',
  }),

  endpoints: (builder) => ({
    getPodcasts: builder.query<IPodcast[], void>({
      query: () => '/us/rss/toppodcasts/limit=100/genre=1310/json',
      keepUnusedDataFor: 24 * 60 * 60,
      transformResponse: (data: any) =>
        data?.feed?.entry.map((entry: any) => ({
          name: entry['im:name'].label,
          image: {
            source: entry['im:image'][2].label,
            attributes: entry['im:image'][2].attributes,
          },
          artist: entry['im:artist'].label,
        })),
    }),
  }),
})

export const {
  useLazyGetPodcastsQuery,
  reducer: podcasts,
  middleware: podcastMiddleware,
  endpoints: { getPodcasts },
} = podcastApi
