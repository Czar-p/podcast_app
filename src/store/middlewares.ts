import { AnyAction } from 'redux'
import { Middleware } from '@reduxjs/toolkit'
import { podcastMiddleware } from './podcasts'
import { setLoading } from './system'

const loadingIndicatorMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: AnyAction) => {
    console.log(action)
    if (action.type.endsWith('/pending')) {
      dispatch(setLoading(true))
    } else if (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')) {
      dispatch(setLoading(false))
    }
    return next(action)
  }

const middlewares = [podcastMiddleware, loadingIndicatorMiddleware]

export default middlewares
