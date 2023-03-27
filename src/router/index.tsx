import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Details } from '../pages'
import { Layout } from '../theme'

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Details />} />
        <Route path="/:podcastId/:episodeId" element={<Details />} />
      </Routes>
    </Layout>
  )
}
export default Router
