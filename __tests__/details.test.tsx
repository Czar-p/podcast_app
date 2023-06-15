import PodcastDetails from '@/app/podcast/[id]/page'
import PodcastTemplate from '@/app/podcast/[id]/template'
import { dummyPodcast, renderWithRedux, dummyXML, dummyEpisodes } from '@/utils/tests'
import { screen, waitFor } from '@testing-library/dom'

const buffer = Buffer.from(dummyXML, 'base64')
const decodedData = buffer.toString('utf-8')

describe('Details', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponses(
      JSON.stringify({
        results: [dummyPodcast],
      }),
      decodedData
    )
  })

  it('Should display the podcast information', async () => {
    renderWithRedux(
      <PodcastTemplate params={{ id: dummyPodcast.collectionId.toString() }}>
        <PodcastDetails params={{ id: dummyPodcast.collectionId.toString() }} />
      </PodcastTemplate>
    )

    const author = await waitFor(() => screen.findByText('By: ' + dummyPodcast.artistName))
    const title = await waitFor(() => screen.findByText(dummyPodcast.collectionName))
    const image = await waitFor(() => screen.getByAltText(dummyPodcast.collectionName))

    expect(author).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', dummyPodcast.collectionName)
    expect(title).toBeInTheDocument()
  })

  it('Should display a table with the episode list', async () => {
    renderWithRedux(
      <PodcastTemplate params={{ id: dummyPodcast.collectionId.toString() }}>
        <PodcastDetails params={{ id: dummyPodcast.collectionId.toString() }} />
      </PodcastTemplate>
    )

    const episodesList = await waitFor(() => screen.findAllByRole('row'))
    expect(episodesList).toHaveLength(Object.keys(dummyEpisodes).length + 1)
  })
})
