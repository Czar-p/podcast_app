import React from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store'
import './styles.scss'

const Layout = ({ children }: React.PropsWithChildren) => {
  const loading = useAppSelector((state) => state.system.loading)
  return (
    <div>
      <div className="header">
        <Link to="/" className="header-title">
          Podcaster
        </Link>
        {loading ? (
          <div className="dot-container">
            <div className="dot" />
          </div>
        ) : null}
      </div>
      {children}
    </div>
  )
}

export default Layout
