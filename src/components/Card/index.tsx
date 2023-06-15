'use client'
import React, { memo } from 'react'
import { ICardProps } from './interface'
import styles from './styles.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store'
import { setCurrentPodcastId } from '@/store/podcasts/slice'

const Card = memo((props: ICardProps) => {
  const { artist, title, src, id } = props
  const dispatch = useAppDispatch()
  const router = useRouter()
  const onClick = () => {
    dispatch(setCurrentPodcastId(id))
    router.push(`/podcast/${id}`)
  } //navigate(`/podcast/${id}`)
  return (
    <div className={styles['card']}>
      <Image
        className={styles['card-image']}
        onClick={onClick}
        {...{ src, height: 170, width: 170 }}
        alt={title.toLocaleUpperCase()}
      />
      <div className={styles['card-content']} onClick={onClick}>
        <p className={styles['title']}>{title.toLocaleUpperCase()}</p>
        <p className={styles['subtitle']}>Author: {artist}</p>
      </div>
    </div>
  )
})

export default Card
