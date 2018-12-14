import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import './style.css';

import Header from './components/Header';
import Grid from './components/Grid';
import Timer from './components/Timer';

const StyledApp = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 1fr auto 1fr;
  justify-content: center;
  align-items: center;
  margin: 0;
  transition-duration: 2s;
  color: #333;

  ${props => props.show || css`
    box-shadow: none;
    opacity: 0;
  `}
`;

const Slab = styled.div`
  display: grid;
  width: 50rem;
  height: 50rem;
  margin-top: 2rem;
  grid-template-rows: 10rem 1fr;
  justify-content: center;
  align-items: center;
  background-color: #fefefe;
  box-shadow: 0 1em 2em -1em rgba(0,0,0,.5);
  transition-duration: inherit;
  opacity: 1;
  grid-column: 2;

  ${props => props.show || css`
    box-shadow: none;
    color: transparent;
    opacity: 0;
  `}
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      timerRunning: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 0);
  }

  toggleTimer = () => {
    this.setState(prevState => ({ timerRunning: !prevState.timerRunning }));
  }

  render() {
    const { show, timerRunning } = this.state;
    return (
      <StyledApp show={show}>
        <Slab show={show}>
          <Header />
          <Grid toggleTimer={this.toggleTimer} />
        </Slab>
        <Timer timerRunning={timerRunning} />
      </StyledApp>
    );
  }
}
