import fetch from '../utils/fetch'
import * as types from '../constants/actionTypes'

const checkHandStatusStart = () => ({
  type: types.CHECK_HAND_STATUS_START
})

const checkHandStatusSuccess = data => ({
  type: types.CHECK_HAND_STATUS_SUCCESS,
  data
})

const checkHandStatusFailure = error => ({
  type: types.CHECK_HAND_STATUS_FAILURE,
  error
})

export function getHands() {
  return async dispatch => {
    try {
      dispatch(checkHandStatusStart())
      const { data } = await fetch('GET', `/hands`)
      dispatch(checkHandStatusSuccess(data))
    } catch (err) {
      dispatch(checkHandStatusFailure(err))
    }
  }
}

export function checkHandStatuses() {
  return dispatch => {
    dispatch(checkHandStatusStart())
  }
}
