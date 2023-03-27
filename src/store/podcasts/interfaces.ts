export interface IPodcast {
  id: number
  name: string
  image: {
    source: string
    attributes: {
      height: number
    }
  }
  artist: string
}

export interface IPodcastState {
  loading: boolean
  error: string | null
  data: IPodcast[]
}
