import React from 'react'
import PropTypes from 'prop-types'
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

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`

const Input = styled.input.attrs({
  type: 'text',
  size: props => props.small ? 3 : 8
})`
  min-width: 110px;
`

const Button = styled.button`
  color: ${colors.primary};
  background: ${colors.contentBackground};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${colors.border};
  border-radius: 3px;
  cursor: pointer;
`

const players = [
  {
    label: 'Player 1', name: 'player1', type: 'text'
  },
  {
    label: 'Player 2', name: 'player2', type: 'text'
  }
]

export class Initial extends React.Component {
  state = Object.assign(
    {},
    ...players.map(player => ({ [player.name]: 'Albeiro ' + player.name }))
  )

  setNamePlayer = key => evt => {
    this.setState({
      [key]: evt.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>{`Game of Drones`}</h1>
        <Wrapper>
          <Head>
            <Name>
              {`Enter Player's Names`}
            </Name>
          </Head>
          <Body>
            {
              players.map(player => {
                return (
                  <BlocksWrapper key={player.label}>
                    <Name>
                      {player.label}:
                    </Name>
                    <Input
                      onChange={this.setNamePlayer(player.name)}
                      value={this.state[player.name]}
                    />
                  </BlocksWrapper>
                )
              })
            }
            <BlocksWrapper>
              <Button onClick={
                () => this.props.handleClick(this.state[players[0].name], this.state[players[1].name])
              }>
                START
              </Button>
            </BlocksWrapper>
          </Body>
        </Wrapper>
      </div>
    )
  }
}

Initial.propTypes = {
  hands: PropTypes.shape({
    list: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool
  }),
  handleClick: PropTypes.func.isRequired,
  actions: PropTypes.object
}

export default Initial
