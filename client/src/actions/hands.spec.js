import * as ActionTypes from '../constants/actionTypes'
import * as ActionCreators from './hands'

describe('Actions', () => {
  // beforeAll(() => {})
  // afterAll(() => {})

  it('testing hands functions dispatch', () => {
    const dispatch = jest.fn()
    const expected = {
      type: ActionTypes.CHECK_HAND_STATUS_START
    }

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.checkHandStatuses())).toEqual('function')
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.checkHandStatuses()(dispatch)
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected)
  })

  it('testing get hands functions dispatch', () => {
    const dispatch = jest.fn()
    const expected = {
      type: ActionTypes.CHECK_HAND_STATUS_START
    }

    // we expect this to return a function since it is a thunk
    expect(typeof (ActionCreators.getHands())).toEqual('function')
    // then we simulate calling it with dispatch as the store would do
    ActionCreators.getHands()(dispatch)
    // finally assert that the dispatch was called with our expected action
    expect(dispatch).toBeCalledWith(expected)
  })


})
