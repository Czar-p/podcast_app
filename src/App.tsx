import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import Router from './router'
import Layout from './theme/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
