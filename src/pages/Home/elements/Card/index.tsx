import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
interface ICardProps {
  src: string
  height: number
  title: string
  artist: string
  id: string
}
const Card = memo((props: ICardProps) => {
  const { artist, title, src, height, id } = props
  const navigate = useNavigate()
  const onClick = () => navigate(`/podcast/${id}`)
  return (
    <div className="card">
      <img className="card-image" onClick={onClick} {...{ src, height }}></img>
      <div className="card-content" onClick={onClick}>
        <p className="title">{title.toLocaleUpperCase()}</p>
        <p className="subtitle">Author: {artist}</p>
      </div>
    </div>
  )
})

export default Card
