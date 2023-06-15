'use client'
import { useRouter } from 'next/navigation'
import styles from './template.module.scss'
import { useAppSelector } from '@/store'
import { useSkip } from '@/hooks'
import { useGetPodcastQuery } from '@/store/podcasts'
import Image from 'next/image'
const PodcastTemplate = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
  const podcastId = useAppSelector((state) => state.podcasts.currentPodcastId)
  const podcast = useAppSelector((state) => state.podcasts.podcastInfo[podcastId as string]) ?? {}
  const skip = useSkip(podcast?.id)
  const { data = podcast, isLoading } = useGetPodcastQuery(podcastId as string, {
    skip,
  })

  const router = useRouter()

  const handleBack = () => router.push('/podcast/' + podcastId) //navigate('/podcast/' + params.id)

  return !isLoading ? (
    <div className={styles['details-content']}>
      <div className={styles['podcast-info']}>
        <div className={styles['podcast-image-container']}>
          <Image
            onClick={handleBack}
            className={styles['podcast-image']}
            src={data.image}
            alt={data?.title}
            width={200}
            height={200}
          />
        </div>

        <div className={styles['podcast-name-section']} onClick={handleBack}>
          <h4 className={styles['podcast-title']}>{data?.title}</h4>
          <p className={styles['podcast-title']}>By: {data.artist}</p>
        </div>

        <div className={styles['podcast-description-section']}>
          <h3>description</h3>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
      </div>
      <div className={styles['episodes-content']}>{children}</div>
    </div>
  ) : null
}

export default PodcastTemplate
