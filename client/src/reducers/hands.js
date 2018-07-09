import { CHECK_HAND_STATUS_START, CHECK_HAND_STATUS_SUCCESS, CHECK_HAND_STATUS_FAILURE } from '../constants/actionTypes'
import initialState from './initialState'

export default function handReducer(state = initialState().hands, action) {
  switch (action.type) {
    case CHECK_HAND_STATUS_START:
      return Object.assign(
        {},
        state,
        { loading: true }
      )
    case CHECK_HAND_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...action.data]
      }
    case CHECK_HAND_STATUS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}
