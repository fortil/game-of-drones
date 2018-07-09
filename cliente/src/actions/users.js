import fetch from '../utils/fetch'
import * as types from '../constants/actionTypes'

const checkUserStatusStart = () => ({
  type: types.CHECK_USER_STATUS_START
})

const checkUserStatusSuccess = data => ({
  type: types.CHECK_USER_STATUS_SUCCESS,
  data
})

const checkUserStatusFailure = error => ({
  type: types.CHECK_USER_STATUS_FAILURE,
  error
})

export function getUsers(name1, name2) {
  return async (dispatch, getState) => {
    try {
      dispatch(checkUserStatusStart())
      let { list: users } = getState().users
      if (!users.length) {
        const { data } = await fetch('GET', `/users/${name1}/${name2}`)
        dispatch(checkUserStatusSuccess(data))
        users = data
      }
      return users
    } catch (err) {
      dispatch(checkUserStatusFailure(err))
    }
  }
}

export function getUsersById(id1, id2) {
  return async (dispatch, getState) => {
    try {
      dispatch(checkUserStatusStart())
      let { list: users } = getState().users
      if (!users.length) {
        const { data } = await fetch('GET', `/usersById/${id1}/${id2}`)
        dispatch(checkUserStatusSuccess(data))
        users = data
      }
      return users
    } catch (err) {
      dispatch(checkUserStatusFailure(err))
    }
  }
}

export function replacesUsers(dispatch, data) {
  try {
    dispatch(checkUserStatusSuccess(data))
  } catch (err) {
    dispatch(checkUserStatusFailure(err))
  }
}
