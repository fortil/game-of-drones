import { combineReducers } from 'redux'
import games from './games'
import users from './users'
import hands from './hands'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  games,
  users,
  hands,
  routing: routerReducer
})

export default rootReducer
