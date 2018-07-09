import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUrl } from '../utils'
import { bindActionCreators } from 'redux'
import * as handActions from '../actions/hands'
import * as userActions from '../actions/users'
import * as gameActions from '../actions/games'
import InitialComponent from '../components/Initial'
import swal from 'sweetalert'

export class Initial extends React.Component {
  initGame = async (name1, name2) => {
    const [user1, user2] = await this.props.actions.getUsers(name1, name2)
    await this.props.actions.createMatch()
    this.props.history.push(getUrl(`/game/${user1.id}/${user2.id}`))
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.users.error || nextProps.hands.error) {
      swal('¡ERROR!', (new Error(nextProps.users.error || nextProps.hands.error)).message, 'error')
    }
  }

  componentDidMount = () => {
    this.props.actions.getHands()
  }
  render() {
    return (
      <InitialComponent {...this.props} handleClick={this.initGame} />
    )
  }
}

Initial.propTypes = {
  hands: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  users: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  actions: PropTypes.object,
  history: PropTypes.object,
  swal: PropTypes.object,
  close: PropTypes.object
}

function mapStateToProps(state) {
  return {
    hands: state.hands,
    users: state.users,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ...bindActionCreators(handActions, dispatch),
      ...bindActionCreators(userActions, dispatch),
      ...bindActionCreators(gameActions, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initial)
