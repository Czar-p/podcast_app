import React, { memo } from 'react'

interface ICardProps {
  src: string
  height: number
  name: string
  artist: string
  id: number
}
const Card = memo((props: ICardProps) => {
  const { artist, name, src, height, id } = props
  const onClick = () => console.log('Navigate To =>', id)
  console.log('render')
  return (
    <div className="card">
      <img className="card-image" onClick={onClick} {...{ src, height }}></img>
      <div className="card-content" onClick={onClick}>
        <p className="name">{name.toLocaleUpperCase()}</p>
        <p className="author">Author: {artist}</p>
      </div>
    </div>
  )
})

export default Card
