/* eslint-disable import/no-named-as-default */
import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { create } from 'react-test-renderer'
import ConnectedGames, { Games } from './Games'
import Game from '../components/Game'
import initialState from '../reducers/initialState'

describe('<GAMES />', () => {
  const actions = {
    getStatisTics: jest.fn(),
    getUsersById: jest.fn()
  }
  const match = {
    params: {
      user1: 0,
      user2: 0
    }
  }

  const { users, games } = initialState()
  it('should contain <Game />', () => {
    const wrapper = shallow(
      <Games
        user={users}
        actions={actions}
        games={games}
        match={match}
        winner={{}}
      />
    )

    expect(wrapper.find(Game).length).toEqual(1)
  })

  it('should match snapshot', () => {
    const middlewares = [thunk]
    const store = configureMockStore(middlewares)({ games })
    const component = create(
      <Provider store={store}>
        <ConnectedGames />
      </Provider>
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
  })
})
