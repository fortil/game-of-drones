import fetch from '../utils/fetch'
import { uniqueArray } from '../utils'
import * as types from '../constants/actionTypes'
import { replacesUsers } from './users'

const checkGameStatusStart = () => ({
  type: types.CHECK_GAME_STATUS_START
})

const checkGameStatusSuccess = data => ({
  type: types.CHECK_GAME_STATUS_SUCCESS,
  data
})

const checkGameStatusFailure = error => ({
  type: types.CHECK_GAME_STATUS_FAILURE,
  error
})

const checkGameStatisticsSucess = data => ({
  type: types.CHECK_GAME_STATISTICS_SUCCESS,
  data
})

const checkGameCurrentSuccess = data => ({
  type: types.CHECK_GAME_CURRENT_SUCCESS,
  data
})

export function addToRound(id, body) {
  return async dispatch => {
    try {
      dispatch(checkGameStatusStart())
      const { data } = await fetch('POST', `/matches/addRound/${id}`, body)
      dispatch(checkGameCurrentSuccess(data))
    } catch (err) {
      dispatch(checkGameStatusFailure(err))
    }
  }
}

export function finishMach(id, body) {
  return async dispatch => {
    try {
      dispatch(checkGameStatusStart())
      const { data } = await fetch('POST', `/matches/finished/${id}`, body)
      dispatch(checkGameCurrentSuccess(data))
      return data
    } catch (err) {
      dispatch(checkGameStatusFailure(err))
    }
  }
}

export function createMatch() {
  return async (dispatch, getState) => {
    try {
      dispatch(checkGameStatusStart())
      const state = getState()
      const match = {
        users: state.users.list.map(user => user.id)
      }
      const { data } = await fetch('POST', `/matches`, match)
      dispatch(checkGameCurrentSuccess(data))
    } catch (err) {
      dispatch(checkGameStatusFailure(err))
    }
  }
}

export function getStatisTics() {
  return async (dispatch, getState) => {
    try {
      dispatch(checkGameStatusStart())
      let { list: users } = getState().users
      const [user1, user2] = users
      // get matches together
      const { data: matchesTogether } = await fetch('GET', `/matches/byUsers/${user1.id}/${user2.id}`)
      dispatch(checkGameStatisticsSucess(prepareStatistics(matchesTogether, users)))
      // get matches for user id1
      const { data: matchesUser1 } = await fetch('GET', `/matches/byUser/${user1.id}`)
      const newUser1 = addMatchesToUser(matchesUser1, user1)
      // get matches for user id2
      const { data: matchesUser2 } = await fetch('GET', `/matches/byUser/${user2.id}`)
      const newUser2 = addMatchesToUser(matchesUser2, user2)
      // replace the old properties to the news
      replacesUsers(dispatch, [newUser1, newUser2])
      const data = uniqueArray(matchesUser1.concat(matchesUser2))

      dispatch(checkGameStatusSuccess(data))
    } catch (err) {
      dispatch(checkGameStatusFailure(err))
    }
  }
}

export function checkGameStatuses() {
  return dispatch => {
    dispatch(checkGameStatusStart())
  }
}

function addMatchesToUser(matches, user) {
  return Object.assign({}, user, { matches: uniqueArray((user.matches || []).concat(matches)) })
}

function prepareStatistics(data, users) {
  const statistics = data.reduce((prev, curr) => {
    if (curr.winner) {
      const winner = users.filter(user => user.id === curr.winner)
      const loser = users.filter(user => user.id === curr.loser)

      prev[curr.winner] = (prev[curr.winner] || { wons: 0, losts: 0, name: winner })
      prev[curr.winner].wons += prev[curr.winner].wons
      prev[curr.loser] = (prev[curr.loser] || { wons: 0, losts: 0, name: loser })
      prev[curr.loser].losts += prev[curr.loser].losts
    } else {
      prev['incompletes'] = (prev['incompletes'] || 0) + 1
    }
    return prev
  }, {})
  return statistics
}
