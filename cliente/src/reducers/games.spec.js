import * as ActionTypes from '../constants/actionTypes'
import reducer from './games'
import initialState from './initialState'


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().games
  }

  const gameA = {
    users: [
      'rJGCt1e77',
      'S1eMAYJxXm'
    ],
    id: 'S1eltEgmX',
    rounds: [
      {
        winner: 'rJGCt1e77',
        loser: 'S1eMAYJxXm',
        winnerHand: 1,
        loserHand: 2
      }
    ]
  }

  const gameB = {
    users: [
      'rJGCt1e77',
      'S1eMAYJxXm'
    ],
    id: 'S1eltEgmX'
  }

  it('should set initial state by default', () => {
    const action = { type: 'unknown' }
    const expected = getInitialState()

    expect(reducer(undefined, action)).toEqual(expected)
  })

  it('should handle CHECK_GAME_STATUS_START', () => {
    const appState = {
      list: [gameA, gameB]
    }
    const action = { type: ActionTypes.CHECK_GAME_STATUS_START }
    const expected = {
      list: [gameA, gameB],
      loading: true
    }

    expect(reducer(appState, action)).toEqual(expected)
  })

  it('should handle CHECK_GAME_CURRENT_SUCCESS', () => {
    const appState = {
      list: [gameA, gameB]
    }
    const action = { type: ActionTypes.CHECK_GAME_CURRENT_SUCCESS, data: gameA }
    const expected = {
      list: [gameA, gameB],
      currentMatch: gameA
    }

    expect(reducer(appState, action)).toEqual(expected)
  })

  it('should handle CHECK_GAME_STATUS_FAILURE', () => {
    const appState = {
      list: [gameA, gameB]
    }
    const action = { type: ActionTypes.CHECK_GAME_STATUS_FAILURE, error: gameA }
    const expected = {
      list: [gameA, gameB],
      loading: false,
      error: gameA
    }

    expect(reducer(appState, action)).toEqual(expected)
  })
})
