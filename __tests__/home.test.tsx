import Home from '@/app/page'
import '@testing-library/jest-dom'

import { fireEvent, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { renderWithRedux, dummyData } from '@/utils/tests'

jest.mock('next/router', () => require('next-router-mock'))

describe('Home', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    fetchMock.mockResponseOnce(
      JSON.stringify({
        feed: {
          entry: dummyData,
        },
      })
    )
  })

  it('Should render a list of podcats', async () => {
    renderWithRedux(<Home />)

    const podcasts = await waitFor(() => screen.getAllByTestId('podcast-card'))

    expect(podcasts.length).toEqual(dummyData.length)
  })

  it('Should render a search input', async () => {
    renderWithRedux(<Home />)
    const searchInput = await waitFor(() => screen.getByRole('textbox'))
    expect(searchInput).toBeInTheDocument()
  })

  it('Should filter by Author and Podcast title based on search input', async () => {
    renderWithRedux(<Home />)
    const searchInput = await waitFor(() => screen.getByRole('textbox'))
    act(() => fireEvent.change(searchInput, { target: { value: 'The Joe Budden Podcast' } }))
    const podcasts = screen.getAllByTestId('podcast-card')
    expect(podcasts).toHaveLength(1)
  })
})
