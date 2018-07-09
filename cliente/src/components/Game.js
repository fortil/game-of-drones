import React from 'react'
import PropTypes from 'prop-types'
import MatchComponent from './Match'
import TryAgainComponent from './TryAgain'

export class Game extends React.Component {

  render() {
    const { users, winner } = this.props
    if (!users.list.length) {
      return <div></div>
    }

    return (
      <div>
        <h1>{`Game of Drones`}</h1>
        {Object.keys(winner).length && <TryAgainComponent  {...this.props} /> || <MatchComponent {...this.props} /> }
      </div>
    )
  }
}

Game.propTypes = {
  hands: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  users: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    loading: PropTypes.bool
  }),
  games: PropTypes.shape({
    statistics: PropTypes.object,
    list: PropTypes.array,
    error: PropTypes.object,
    currentMatch: PropTypes.object,
    loading: PropTypes.bool
  }),
  fnAddRound: PropTypes.func.isRequired,
  returnToInit: PropTypes.func.isRequired,
  winner: PropTypes.object,
  actions: PropTypes.object
}

Game.defaultProps = {
  users: {
    list: [],
    error: false,
    loading: false
  }
}

export default Game
