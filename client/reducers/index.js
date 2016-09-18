import { combineReducers } from 'redux'
import userReducer from './user'
import postsReducer from './posts'

const reducers = {
  user: userReducer,
  posts: postsReducer
}

export default combineReducers(reducers)
