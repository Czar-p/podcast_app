import EpisodePlayer from '@/app/podcast/[id]/episode/[episodeId]/page'
import PodcastTemplate from '@/app/podcast/[id]/template'
import { dummyEpisodes, dummyPodcast, dummyXML, renderWithRedux } from '@/utils/tests'
import { screen, waitFor } from '@testing-library/dom'

const id = dummyPodcast.collectionId.toString()
const buffer = Buffer.from(dummyXML, 'base64')
const decodedData = buffer.toString('utf-8')
const episodeId = 'fybjnkhj'
const episode = dummyEpisodes['fybjnkhj']

describe('EpisodePlayer', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponses(
      JSON.stringify({
        results: [dummyPodcast],
      }),
      decodedData
    )
  })
  it('Should display a audio player', async () => {
    renderWithRedux(
      <PodcastTemplate params={{ id }}>
        <EpisodePlayer params={{ id, episodeId }} />
      </PodcastTemplate>
    )
    const audioPlayer = await waitFor(() => screen.findByTestId('audio-player'))
    expect(audioPlayer).toHaveAttribute('src', episode.audioUrl)
    expect(audioPlayer).toBeInTheDocument()
  })
})
