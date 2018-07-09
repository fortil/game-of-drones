import {
  CHECK_GAME_STATUS_START,
  CHECK_GAME_STATUS_SUCCESS,
  CHECK_GAME_STATUS_FAILURE,
  CHECK_GAME_STATISTICS_SUCCESS,
  CHECK_GAME_CURRENT_SUCCESS,
  CHECK_GAME_CREATE_SUCCESS
} from '../constants/actionTypes'
import { uniqueArray } from '../utils'
import initialState from './initialState'

export default function usersReducer(state = initialState().games, action) {
  switch (action.type) {
    case CHECK_GAME_STATUS_START:
      return {
        ...state,
        loading: true
      }
    case CHECK_GAME_STATUS_SUCCESS:
      return {
        ...state,
        list: [...uniqueArray(state.list.concat(action.data))]
      }
    case CHECK_GAME_STATISTICS_SUCCESS:
      return {
        ...state,
        statistics: action.data
      }
    case CHECK_GAME_CURRENT_SUCCESS:
      return {
        ...state,
        currentMatch: action.data,
      }
    case CHECK_GAME_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
