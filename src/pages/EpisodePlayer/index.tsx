import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../store'

const EpisodePlayer = () => {
  const { id, episodeId } = useParams()
  const episode = useAppSelector((state) => state.podcasts.podcastInfo[id as string].episodes[episodeId as string])
  return (
    <div className="episodes-content">
      <div className="episodes-player">
        <div className="podcast-player-description">
          <h1>{episode.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: episode.description }}></div>
        </div>

        <audio className="audio-player" src={episode.audioUrl} controls />
      </div>
    </div>
  )
}

export default EpisodePlayer
