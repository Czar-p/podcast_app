import { combineReducers } from '@reduxjs/toolkit'
import { podcasts } from './podcasts'
import system from './system'

const rootReducer = combineReducers({
  podcasts,
  system,
})

export default rootReducer
