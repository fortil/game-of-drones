import { CHECK_USER_STATUS_START, CHECK_USER_STATUS_SUCCESS, CHECK_USER_STATUS_FAILURE } from '../constants/actionTypes'
import initialState from './initialState'

export default function usersReducer(state = initialState().users, action) {
  switch (action.type) {
    case CHECK_USER_STATUS_START:
      return {
        ...state,
        loading: true
      }
    case CHECK_USER_STATUS_SUCCESS:
      return {
        ...state,
        list: [...action.data],
        loading: false
      }
    case CHECK_USER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
