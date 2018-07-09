import * as ActionTypes from '../constants/actionTypes'
import configureStore from './configureStore'

describe('Store', () => {
  const users = {
    list: [
      { id: 'SAeM-YJxXw', name: 'William Penagos', wons: 10, losts: 0 },
      { id: 'S1eMAYJxXm', name: 'Player 2', wons: 0, losts: 10 },
      { id: 'SAeM-YJxXw', name: 'Developer Penagos', wons: 10, losts: 0 },
      { id: 'S1eMAYJxXm', name: 'Player 3', wons: 0, losts: 10 }
    ]
  }

  it('should display results when necessary data is provided', () => {
    const store = configureStore({ users })

    const actions = [
      { type: ActionTypes.CHECK_USER_STATUS_SUCCESS, data: users.list.slice(0, 2) },
      { type: ActionTypes.CHECK_USER_STATUS_SUCCESS, data: users.list.slice(2, 4) }
    ]
    actions.forEach(action => store.dispatch(action))

    const actual = store.getState()
    const expected = {
      loading: false,
      list: users.list.slice(2, 4)
    }

    expect(actual.users).toEqual(expected)
  })
})
