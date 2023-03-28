import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPodcast } from './interfaces'
import { XMLParser } from 'fast-xml-parser'
import crypto from 'crypto-js'
import { Buffer } from 'buffer'

const parser = new XMLParser({
  ignoreAttributes: false,
})

const generateId = (value: string) => {
  const hashValue = crypto.SHA256(value).toString()

  const id = Buffer.from(hashValue, 'hex').toString().replace(/[^\w]/g, '').toLowerCase()

  return id.substring(0, 8)
}

function formatSecondsToHours(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secondsRemainder = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secondsRemainder
    .toString()
    .padStart(2, '0')}`
}

const proxyUrl = 'https://api.allorigins.win/raw?url='

const podcastApi = createApi({
  reducerPath: 'podcastsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: proxyUrl + 'https://itunes.apple.com',
    cache: 'no-cache',
    prepareHeaders: (headers) => {
      headers.set('x-requested-with', 'XMLHttpRequest')
      return headers
    },
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
    }),
    getPodcast: builder.query<any, string>({
      query: (id) => `/lookup?id=${id}&media=podcast`,
      keepUnusedDataFor: 0,
      transformResponse: async (data: any) => {
        const podcastInfo = data?.results[0]
        const title = podcastInfo.collectionName
        const author = podcastInfo.artistName
        const image = podcastInfo.artworkUrl600
        const id = podcastInfo.collectionId
        const episodeCount = podcastInfo.trackCount
        const xml = await fetch(proxyUrl + podcastInfo.feedUrl)
        const xmlData = await xml.text()
        const parsedData = parser.parse(xmlData, {
          allowBooleanAttributes: true,
        }).rss.channel

        const description = parsedData.description

        const episodes: any = {}

        parsedData.item.reverse().forEach((ep: any) => {
          const metadata = {
            title: ep?.title,
            publishDate: new Date(ep?.pubDate).toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }),
            duration: Number.isInteger(ep['itunes:duration'])
              ? formatSecondsToHours(ep['itunes:duration'])
              : ep['itunes:duration'],
            description: ep?.description,
            audioUrl: ep.enclosure && ep.enclosure['@_url'],
            id: ep.guid['#text'],
          }
          const episodeId = generateId(JSON.stringify(ep.guid['#text'] ?? metadata))
          episodes[episodeId] = { ...metadata, episodeId }
        })

        const details: any = {
          id,
          title,
          author,
          description,
          image,
          episodes,
          episodeCount,
        }
        return details
      },
    }),
  }),
})

export const {
  useGetPodcastQuery,
  useGetPodcastsQuery,
  reducer: podcastsApi,
  middleware: podcastMiddleware,
  endpoints: { getPodcasts, getPodcast },
} = podcastApi
