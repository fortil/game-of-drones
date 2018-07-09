import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUrl } from '../utils'
import { bindActionCreators } from 'redux'
import * as gameActions from '../actions/games'
import * as userActions from '../actions/users'
import GameComponent from '../components/Game'
import swal from 'sweetalert'

export class Games extends React.Component {
  state = {
    winner: ''
  }
  componentDidMount = async () => {
    await this.props.actions.getUsersById(this.props.match.params.user1, this.props.match.params.user2)
    this.props.actions.getStatisTics()
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.games.error || nextProps.users.error) {
      swal('¡ERROR!', (new Error(nextProps.users.error || nextProps.games.error)).message, 'error')
    }
  }

  returnToInit = winner => () => {
    const user1 = this.props.match.params.user1
    const user2 = this.props.match.params.user2
    let loser
    if (winner !== user1) {
      loser = user1
    } else if (winner !== user2) {
      loser = user2
    }
    this.props.actions
      .finishMach(this.props.games.currentMatch.id, { winner, loser })
      .then(() => {
        this.props.history.push(getUrl(`/`))
      })
  }

  findWinnerAndLoserRound = (user1, user2) => {
    if (user1.selected.beatTo === user2.selected.id) {
      return { winner: user1.id, loser: user2.id, winnerHand: user1.selected.id, loserHand: user2.selected.id }
    }
    if (user2.selected.beatTo === user1.selected.id) {
      return { winner: user2.id, loser: user1.id, winnerHand: user2.selected.id, loserHand: user1.selected.id }
    }
    return { tie1: user1.id, tie2: user2.id, hand1: user1.selected.id, hand2: user2.selected.id }
  }

  addRound = object => {
    const body = this.findWinnerAndLoserRound(...object)
    this.props.actions.addToRound(this.props.games.currentMatch.id, body)
  }

  getWinner = () => {
    let [user1, user2] = this.props.games.currentMatch.rounds
      .filter(round => !!round.winner)
      .map(round => round.winner)
      .reduce((b, c) => (
        (b[b.findIndex(d => d.el === c)] || b[b.push({ el: c, count: 0 }) - 1]).count++ , b
      ), [])

    user2 = user2 ? user2 : { count: 0 }

    if (user1.count > user2.count) {
      return { name: this.getName(user1.el), id: user1.el }
    }
    if (user1.count < user2.count) {
      return { name: this.getName(user2.el), id: user2.el }
    }
    return false
  }

  getName = id => {
    return this.props.users.list
      .filter(user => user.id === id)[0].name
  }

  render() {
    const { games } = this.props
    let winner = {}
    if (games.currentMatch && games.currentMatch.rounds && games.currentMatch.rounds.length >= 3) {
      winner = this.getWinner()
    }
    return (
      <GameComponent
        {...this.props}
        fnAddRound={this.addRound}
        winner={winner}
        returnToInit={this.returnToInit(winner.id)}
      />
    )
  }
}

Games.propTypes = {
  games: PropTypes.shape({
    statistics: PropTypes.object,
    list: PropTypes.array,
    error: PropTypes.object,
    currentMatch: PropTypes.object,
    loading: PropTypes.bool
  }),
  users: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  hands: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  match: PropTypes.object,
  list: PropTypes.array,
  history: PropTypes.object,
  actions: PropTypes.object
}

function mapStateToProps(state) {
  return {
    games: state.games,
    hands: state.hands,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators(gameActions, dispatch),
      ...bindActionCreators(userActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games)
