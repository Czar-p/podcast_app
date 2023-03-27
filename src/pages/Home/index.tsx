import React from 'react'
import { useAppSelector } from '../../store'
import { useGetPodcastsQuery } from '../../store/podcasts'
import { Card } from './elements'

const Home = () => {
  const lastUpdated = useAppSelector((state) => state?.system?.lastUpdated)
  const { data, loading } = useAppSelector((state) => state?.podcasts)

  useGetPodcastsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    skip: lastUpdated !== null && Date.now() - lastUpdated < 24 * 60 * 60 * 1000,
  })
  return (
    <div>
      <div className="header">
        <h1>Podcaster {loading ? 'cargando' : ''}</h1>
      </div>
      <div className="content">
        {loading || !data?.length ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {data.map((entry) => (
              <Card
                key={entry.id}
                artist={entry.artist}
                id={entry.id}
                name={entry.name}
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
