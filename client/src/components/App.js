/* eslint-disable import/no-named-as-default */
import { Route, Switch } from 'react-router-dom'
import Initial from '../containers/Initial'
import Games from '../containers/Games'
import NotFoundPage from './NotFoundPage'
import PropTypes from 'prop-types'
import React from 'react'
import { hot } from 'react-hot-loader'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Initial} />
        <Route exact path='/game/:user1/:user2' component={Games} />
        <Route component={NotFoundPage} />
      </Switch>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default hot(module)(App)
