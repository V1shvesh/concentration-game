/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import styled from 'styled-components';

const StyledTimer = styled.div`
  display: flex;
  height: 100%;
  grid-column: 3;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-family: 'Karla';

  .gold {
    color: #d9b210;
  }
`;

const getMinutes = msec => Math.floor(msec / (1000 * 60)).toString(10).padStart(2, '0');
const getSeconds = msec => Math.floor(msec / 1000).toString(10).padStart(2, '0');

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: 0,
      curTime: 0,
      bestTime: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { timerRunning } = this.props;
    if (timerRunning && !prevProps.timerRunning) {
      this.setState({ startTime: Date.now(), curTime: Date.now() });
      this.timerID = setInterval(() => {
        this.setState({
          curTime: Date.now(),
        });
      }, 1000);
    } else if (!timerRunning && prevProps.timerRunning) {
      const { startTime, curTime, bestTime } = this.state;
      const newBestTime = (bestTime !== null && curTime - startTime < bestTime)
      || bestTime === null
        ? curTime - startTime
        : bestTime;
      clearInterval(this.timerID);
      this.setState({
        startTime: 0,
        curTime: 0,
        bestTime: newBestTime,
      });
    }
  }

  render() {
    const { startTime, curTime, bestTime } = this.state;
    const timer = curTime - startTime;
    return (
      <StyledTimer>
        <h4 className="header">Current</h4>
        <span className="timer">
          {`${getMinutes(timer)}:${getSeconds(timer)}`}
        </span>
        <h4 className="header gold">Best</h4>
        <span className="timer gold">
          {`${bestTime !== null ? getMinutes(bestTime) : '--'}:${bestTime !== null ? getSeconds(bestTime) : '--'}`}
        </span>
      </StyledTimer>
    );
  }
}

export default Timer;
