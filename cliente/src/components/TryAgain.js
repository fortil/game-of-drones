import React, { Component } from 'react'
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

export class Match extends Component {
  static propTypes = {
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
    fnAddRound: PropTypes.func.isRequired,
    returnToInit: PropTypes.func.isRequired,
    winner: PropTypes.object,
    actions: PropTypes.object
  }

  tryAgain = () => {
    this.props.returnToInit()
  }

  render() {
    const { winner } = this.props

    return (
      <Wrapper>
        <Head>
          <Name>
            {`We have a WINNER!!`}
          </Name>
        </Head>
        <Body>
          <BodyCol>
            <Name>
              {`${winner.name} is the new EMPEROR`}
            </Name>
            <Button onClick={this.tryAgain}>Try Again</Button>
          </BodyCol>
        </Body>
      </Wrapper>
    )
  }
}

export default Match
