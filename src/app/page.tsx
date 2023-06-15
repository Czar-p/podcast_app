'use client'
import { useAppSelector } from '@/store'
import { useMemo, useState } from 'react'
import { Card, SearchBar } from '@/components'
import { useSkip } from '@/hooks'
import { useGetPodcastsQuery } from '@/store/podcasts'
import styles from './styles.module.scss'

function Home() {
  const [searchText, setSearchText] = useState<string>('')
  const { data, loading } = useAppSelector((state) => state?.podcasts)
  const skip = useSkip(0)
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

  return (
    <div>
      <SearchBar length={podcasts.length} onChange={handleInputChange} />
      <div className={styles['content']}>
        {loading || !data?.length ? null : (
          <>
            {podcasts.map((entry) => (
              <Card key={entry.id} artist={entry.artist} id={entry.id} title={entry.title} src={entry.image.source} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
