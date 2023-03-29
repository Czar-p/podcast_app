import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import Router from './router'

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
