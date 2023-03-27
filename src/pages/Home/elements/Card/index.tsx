import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
interface ICardProps {
  src: string
  height: number
  name: string
  artist: string
  id: number
}
const Card = memo((props: ICardProps) => {
  const { artist, name, src, height, id } = props
  const navigate = useNavigate()
  const onClick = () => navigate(`/${id}`)
  return (
    <div className="card">
      <img className="card-image" onClick={onClick} {...{ src, height }}></img>
      <div className="card-content" onClick={onClick}>
        <p className="title">{name.toLocaleUpperCase()}</p>
        <p className="subtitle">Author: {artist}</p>
      </div>
    </div>
  )
})

export default Card
