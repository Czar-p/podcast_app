import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'
const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <div className="header">
        <Link to="/" className="header-title">
          Podcaster
        </Link>
      </div>
      {children}
    </div>
  )
}

export default Layout
