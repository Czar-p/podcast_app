import React, { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSkip } from '../../hooks'
import { useAppSelector } from '../../store'
import { useGetPodcastsQuery } from '../../store/podcasts'
import { Card, SearchBar } from './elements'

const Home = () => {
  const [searchText, setSearchText] = useState<string>('')
  const { data, loading } = useAppSelector((state) => state?.podcasts)
  const skip = useSkip(data.length)
  useGetPodcastsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip,
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

  console.log(podcasts[0])
  return (
    <div>
      <SearchBar length={podcasts.length} onChange={handleInputChange} />
      <div className="content">
        {loading || !data?.length ? null : (
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
