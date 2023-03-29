import { proxyUrl } from '.'
import { formatSecondsToHours, generateId, parseXmlData } from '../../../utils'

export const getPodcastsTransform = (data: any) => {
  return data?.feed?.entry.map((entry: any) => ({
    id: Number(entry.id.attributes['im:id']),
    name: entry['im:name'].label,
    image: {
      source: entry['im:image'][2].label,
      attributes: entry['im:image'][2].attributes,
    },
    artist: entry['im:artist'].label,
  }))
}

export const getPodcastTransform = async (data: any) => {
  const podcastInfo = data?.results[0]
  const title = podcastInfo.collectionName
  const author = podcastInfo.artistName
  const image = podcastInfo.artworkUrl600
  const id = podcastInfo.collectionId
  const episodeCount = podcastInfo.trackCount
  const xml = await fetch(proxyUrl + podcastInfo.feedUrl)
  const xmlData = await xml.text()
  const parsedData = parseXmlData(xmlData)
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
}
