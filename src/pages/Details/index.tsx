import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPodcastQuery } from '../../store/podcasts'
import './styles.scss'

const Details = () => {
  const params = useParams<{
    id: string
  }>()
  console.log(params)
  const { data = {}, isLoading } = useGetPodcastQuery(params.id as string)

  console.log(data?.episodes)
  return (
    <div className="details-content">
      <div className="podcast-info">
        {!isLoading ? (
          <>
            <div className="podcast-image-container">
              <img className="podcast-image" src={data.image}></img>
            </div>

            <div className="podcast-name-section">
              <h4 className="podcast-title">{data?.title}</h4>
              <p className="podcast-title">By: {data.author}</p>
            </div>

            <div className="podcast-description-section">
              <h3>description</h3>
              <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </div>
          </>
        ) : null}
      </div>
      <div className="episodes-content">
        <div className="episodes-header">{!isLoading ? <h1>Episodes: {data.episodes?.length} </h1> : null}</div>
        <div className="episodes-table">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading
                ? data?.episodes?.map(({ title, publishDate, duration, episodeId, audioUrl }: any, i: number) => (
                    <tr key={i}>
                      <td>
                        {audioUrl && episodeId ? <Link to={`/podcast/${params.id}/${episodeId}`}>{title}</Link> : title}
                      </td>
                      <td>{publishDate}</td>
                      <td>{duration}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Details
