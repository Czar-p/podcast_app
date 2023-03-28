import React from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../store'
import { useGetPodcastQuery } from '../../store/podcasts'
import './styles.scss'

const Details = () => {
  const params = useParams<{
    id: string
  }>()
  const lastUpdated = useAppSelector((state) => state?.system?.lastUpdated)
  const podcast = useAppSelector((state) => state.podcasts.podcastInfo[params.id as string]) ?? {}
  const { data = podcast, isLoading } = useGetPodcastQuery(params.id as string, {
    skip: podcast?.id && lastUpdated !== null && Date.now() - lastUpdated < 24 * 60 * 60 * 1000,
  })

  const navigate = useNavigate()

  const handleBack = () => navigate('/podcast/' + params.id)

  return !isLoading ? (
    <div className="details-content">
      <div className="podcast-info">
        <div className="podcast-image-container">
          <img onClick={handleBack} className="podcast-image" src={data.image}></img>
        </div>

        <div className="podcast-name-section" onClick={handleBack}>
          <h4 className="podcast-title">{data?.title}</h4>
          <p className="podcast-title">By: {data.author}</p>
        </div>

        <div className="podcast-description-section">
          <h3>description</h3>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
      </div>
      <Outlet />
    </div>
  ) : null
}

export default Details
