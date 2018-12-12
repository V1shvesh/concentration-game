/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import styled from 'styled-components';

import Tile from './Tile';

const jumble = (arr) => {
  let len = arr.length;
  const newArr = arr;
  while (len > 0) {
    const index = Math.floor(Math.random() * len);
    len -= 1;
    const temp = newArr[len];
    newArr[len] = newArr[index];
    newArr[index] = temp;
  }
  return newArr;
};

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 8rem);
  grid-template-rows: repeat(4, 8rem);
  justify-items: center;
  align-items: center;
  align-self: flex-start;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileItems: jumble(Array(16).fill('0').map((v, i) => (i % 8) + 1)),
      showItemList: Array(16).fill(false),
      firstSelected: null,
      tilesMatched: [],
      tilesNotMatched: [],
      block: false,
      timerStart: false,
      win: false,
    };
  }

  handleClick = (index) => {
    const {
      tileItems, showItemList, firstSelected, tilesMatched, block, timerStart,
    } = this.state;

    const { toggleTimer } = this.props;

    if (!timerStart) {
      this.setState((state) => {
        if (!state.timerStart) {
          toggleTimer();
          return { timerStart: true };
        }
        return {};
      });
    }

    if (!block && tilesMatched.includes(index) !== true) {
      if (firstSelected === null) {
        // First Tile Selected
        this.setState({
          showItemList: showItemList.map((v, i) => (i === index ? true : v)),
          firstSelected: index,
        });
      } else if (index !== firstSelected) {
        if (tileItems[firstSelected] === tileItems[index]) {
          // Second Tile Selected : Items Match
          this.setState(state => ({
            showItemList: showItemList.map((v, i) => (i === index ? true : v)),
            tilesMatched: [...state.tilesMatched, index, firstSelected],
            firstSelected: null,
          }));
          // Win
          if (tilesMatched.length === 14) {
            toggleTimer();
            this.setState({ win: true });
            setTimeout(() => {
              this.setState({
                showItemList: Array(16).fill(false),
                firstSelected: null,
                tilesMatched: [],
                tilesNotMatched: [],
                block: true,
                timerStart: false,
              });
            }, 1500);
            setTimeout(() => {
              this.setState({
                tileItems: jumble(Array(16).fill('0').map((v, i) => (i % 8) + 1)),
                block: false,
                win: false,
              });
            }, 1750);
          }
        } else {
          // Second Tile Selected : Items Do Not Match
          this.setState(prevState => ({
            showItemList: showItemList.map((v, i) => (i === index ? true : v)),
            tilesNotMatched: [firstSelected, index],
            firstSelected: null,
            block: !prevState.block,
          }));

          setTimeout(() => {
            this.setState(prevState => ({
              showItemList: showItemList.map(
                (v, i) => (i === firstSelected || i === index ? false : v),
              ),
              tilesNotMatched: [],
              block: !prevState.block,
            }));
          }, 800);
        }
      }
    }
  }

  render() {
    const {
      tileItems, showItemList, tilesMatched, tilesNotMatched, win,
    } = this.state;
    const TileList = Array(16).fill('0').map((v, i) => i).map(index => (
      <Tile
        key={index}
        itemIndex={tileItems[index]}
        showItem={showItemList[index]}
        matched={tilesMatched.includes(index)}
        notMatched={tilesNotMatched.includes(index)}
        win={win}
        handleClick={() => this.handleClick(index)}
      />
    ));
    return (
      <StyledGrid>
        {TileList}
      </StyledGrid>
    );
  }
}
