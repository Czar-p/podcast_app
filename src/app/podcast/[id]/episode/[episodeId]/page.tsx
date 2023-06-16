'use client'
import { useAppSelector } from '@/store'
import { NextPage } from 'next'
import styles from './styles.module.scss'
const EpisodePlayer: NextPage<{
  params: { id: string; episodeId: string }
}> = ({ params: { episodeId, id } }) => {
  const episode = useAppSelector((state) => state.podcasts.podcastInfo[id].episodes[episodeId])
  return (
    <div className={styles['episodes-player']}>
      <div className={styles['podcast-player-description']}>
        <h1>{episode.title}</h1>
        <div data-testid="episode-description" dangerouslySetInnerHTML={{ __html: episode.description }}></div>
      </div>
      <audio data-testid="audio-player" className={styles['audio-player']} src={episode.audioUrl} controls />
    </div>
  )
}

export default EpisodePlayer
