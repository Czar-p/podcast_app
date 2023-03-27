import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPodcast } from './interfaces'

const podcastApi = createApi({
  reducerPath: 'podcastsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://itunes.apple.com',
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    getPodcasts: builder.query<IPodcast[], void>({
      query: () => '/us/rss/toppodcasts/limit=100/genre=1310/json',
      keepUnusedDataFor: 0,
      transformResponse: (data: any) => {
        return data?.feed?.entry.map((entry: any) => ({
          id: Number(entry.id.attributes['im:id']),
          name: entry['im:name'].label,
          image: {
            source: entry['im:image'][2].label,
            attributes: entry['im:image'][2].attributes,
          },
          artist: entry['im:artist'].label,
        }))
      },
      onQueryStarted: () => {
        console.log('query started')
      },
    }),
  }),
})

export const {
  useGetPodcastsQuery,
  reducer: podcastsApi,
  middleware: podcastMiddleware,
  endpoints: { getPodcasts },
} = podcastApi
