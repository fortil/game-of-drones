import React, { Component } from 'react'
import PropTypes from 'prop-types'
import swal from 'sweetalert'
import styled from 'styled-components'
import colors from '../constants/colors'

const Wrapper = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${colors.border};
  background: ${colors.contentBackground};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
`

const Body = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  width: 100%;
  justify-content: space-around;
`
const BodyCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

const Name = styled.div`
  margin-bottom: 6px;
  color: ${colors.primary};
  font-size: 16px;
  font-weight: 700;
  margin-right: 10px;
`

const P = styled.div`
  margin: 0px;
`

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`

const Button = styled.button`
  color: ${colors.primary};
  background: ${colors.contentBackground};
  font-size: 1em;
  margin: 1em;
  margin-top: 80px;
  padding: 0.25em 1em;
  border: 2px solid ${colors.border};
  border-radius: 3px;
  cursor: pointer;
`

const Select = styled.select`
  color: ${colors.primary};
  background: ${colors.contentBackground};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${colors.border};
  border-radius: 3px;
  cursor: pointer;
  min-width: 100px;
`
export class Match extends Component {
  state = {
    turn: 0,
    handSelect: { id: 0 },
    users: []
  }

  showMessage = (title, message, icon = 'info') => {
    swal(title, message, icon)
  }

  setChoice = player => {
    if (this.state.handSelect.id === 0) {
      this.showMessage(`You should selected a option`)
      return false
    }

    const object = Object.assign({}, { selected: this.state.handSelect, id: player.id })
    this.setState(
      {
        users: [...this.state.users].concat(object)
      }
    )
    let turn = this.state.turn
    if (turn === 1) {
      this.setState(
        { turn: 0, handSelect: { id: 0 } },
        () => {
          this.props.fnAddRound([...this.state.users])
          this.setState({ users: [] })
        }
      )
    } else {
      turn += 1
      this.setState({ turn, handSelect: { id: 0 } })
    }
  }

  onChangeSelect = evt => {
    const index = evt.nativeEvent.target.selectedIndex
    const value = evt.nativeEvent.target[index].value
    const hand = this.props.hands.list.filter(hand => parseInt(hand.id) === parseInt(value))[0]
    this.setState({
      handSelect: hand
    })
  }

  getUser = round => {
    if (round.tie1) {
      return 'Tie'
    } else {
      return this.props.users.list
        .filter(user => user.id === round.winner)[0].name
    }
  }

  render() {
    const { users, games, hands } = this.props

    const player = users.list[this.state.turn]
    const round = games.currentMatch
      && games.currentMatch.rounds
      && games.currentMatch.rounds ? games.currentMatch.rounds.length : 0

    return (
      <Wrapper>
        <Head>
          <Name>
            {`Round ${round} - ${users.list.map(user => user.name).join(' vs ')}`}
          </Name>
        </Head>
        <Body>
          <BodyCol>
            <Name>
              {`Turn of ${player.name}`}
            </Name>
            <BlocksWrapper>
              Select move:
                <Select onChange={this.onChangeSelect}>
                <option selected={0 === this.state.handSelect.id} value={0}></option>
                {
                  hands.list.map(hand => (
                    <option selected={hand.id === this.state.handSelect.id} value={hand.id} key={hand.id}>{hand.name}</option>
                  ))
                }
              </Select>
            </BlocksWrapper>
            {
              <Button onClick={() => this.setChoice(player)}>OK</Button>
            }
          </BodyCol>
          <BodyCol>
            <Name>
              Statistics
              </Name>
            <P><hr /></P>
            <P><b>Score</b></P>
            <P>Round - Winner</P>
            {
              games.currentMatch
              && games.currentMatch.rounds
              && games.currentMatch.rounds.map((round, idx) => (
                <P key={idx}>{idx} - {this.getUser(round)}</P>
              ))
            }
            <P><hr /></P>
            <P><b>About player</b></P>
            <P><b>Won:</b> {player.wons}</P>
            <P><b>Lost:</b> {player.losts}</P>
            {/* <P><b>Matches Together:</b></P> */}
            {/* <P><code>{JSON.stringify(games.statistics, null, 2)}</code></P> */}
          </BodyCol>
        </Body>
      </Wrapper>
    )
  }
}

Match.propTypes = {
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
  games: PropTypes.shape({
    statistics: PropTypes.object,
    list: PropTypes.array,
    error: PropTypes.object,
    currentMatch: PropTypes.object,
    loading: PropTypes.bool
  }),
  fnAddRound: PropTypes.func.isRequired
}

export default Match
