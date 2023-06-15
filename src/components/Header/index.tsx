'use client'
import { useAppSelector } from '@/store'
import Link from 'next/link'
import styles from './styles.module.scss'
const Header = () => {
  const loading = useAppSelector((state) => state.system.loading)
  return (
    <div className={styles['header']}>
      <Link title="home" href="/" className={styles['header-title']}>
        Podcaster
      </Link>
      {loading ? (
        <div className={styles['dot-container']}>
          <div className={styles['dot']} />
        </div>
      ) : null}
    </div>
  )
}
export default Header
