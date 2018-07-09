import * as ActionTypes from '../constants/actionTypes'
import * as ActionCreators from './games'

describe('Actions', () => {
  // beforeAll(() => {})
  // afterAll(() => {})

  it('testing games functions dispatch', () => {
    const dispatch = jest.fn()
    const expected = {
      type: ActionTypes.CHECK_GAME_STATUS_START
    }

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.checkGameStatuses())).toEqual('function')
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.checkGameStatuses()(dispatch)
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected)
  })


})
