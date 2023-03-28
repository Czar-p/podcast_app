import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Details, EpisodePlayer, EpisodeList } from '../pages'
import { Layout } from '../theme'

const Router = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcast" element={<Details />}>
          <Route path=":id/episode/:episodeId" element={<EpisodePlayer />} />
          <Route path=":id" element={<EpisodeList />} />
        </Route>
      </Routes>
    </Layout>
  )
}
export default Router
