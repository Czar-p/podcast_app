import React, { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../store'
import { useGetPodcastsQuery } from '../../store/podcasts'
import { Card, SearchBar } from './elements'

const Home = () => {
  const [searchText, setSearchText] = useState<string>('')
  const lastUpdated = useAppSelector((state) => state?.system?.lastUpdated)
  const { data, loading } = useAppSelector((state) => state?.podcasts)

  useGetPodcastsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,

    skip: lastUpdated !== null && Date.now() - lastUpdated < 24 * 60 * 60 * 1000,
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchText(event.target.value.trimStart().trimEnd())
  }

  const podcasts = useMemo(
    () =>
      data.filter(
        (entry) =>
          entry.artist.toLowerCase().includes(searchText.toLowerCase()) ||
          entry.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, data]
  )
  return (
    <div>
      <SearchBar length={podcasts.length} onChange={handleInputChange} />
      <div className="content">
        {loading || !data?.length ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {podcasts.map((entry) => (
              <Card
                key={entry.id}
                artist={entry.artist}
                id={entry.id}
                title={entry.title}
                src={entry.image.source}
                {...entry.image.attributes}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
