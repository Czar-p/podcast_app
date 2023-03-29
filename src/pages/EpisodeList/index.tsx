import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../store'
import './styles.scss'

const EpisodeList = () => {
  const { id } = useParams()
  const { episodeCount, episodes = {} } = useAppSelector((state) => state.podcasts.podcastInfo[id as string])
  return (
    <div className="episodes-content">
      <div className="episodes-header">{<h1>Episodes: {episodeCount} </h1>}</div>
      <div className="episodes-list">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(episodes)
              .sort(
                (a: any, b: any) =>
                  new Date(episodes[b]?.publishDate).getTime() - new Date(episodes[a]?.publishDate).getTime()
              )
              .map((key: any) => {
                const { title, publishDate, duration, episodeId, audioUrl } = episodes[key]
                return (
                  <tr key={key}>
                    <td>
                      {audioUrl && episodeId ? <Link to={`/podcast/${id}/episode/${episodeId}`}>{title}</Link> : title}
                    </td>
                    <td>{publishDate}</td>
                    <td>{duration}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EpisodeList
