import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import posed from 'react-pose';


const StyledTile = styled(posed.div({
  notMatched: {
    backgroundColor: '#41e22f',
    transition: {
      type: 'keyframes',
      values: ['#4acbef', '#f72222', '#f72222', '#4acbef'],
      times: [0, 0.25, 0.99, 1],
      duration: 1500,
    },
  },
  matched: {
    backgroundColor: '#41e22f',
    transition: {
      type: 'tween',
      from: '#4acbef',
      to: '#41e22f',
      duration: 200,
    },
  },
  win: {
    backgroundColor: '#d9b210',
    transition: {
      type: 'tween',
      from: '#41e22f',
      to: '#d9b210',
    },
  },
  none: {
    backgroundColor: '#4acbef',
  },
}))`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4acbef;

  ::before {
    content: '';
    position: absolute;
    display: block;
    width: 6rem;
    height: 6rem;
    background-color: #333;
    transition-duration: 200ms;
    transition-timing-function: ease-out;
  }

  ${props => props.showItem && css`
      ::before {
        background-color: transparent;
      }
  `}
`;

const Item = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  display: block;
`;

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isSelected: false,
    };
  }

  render() {
    const {
      itemIndex, showItem, matched, handleClick, notMatched, win,
    } = this.props;

    let pose = 'none';
    if (win) {
      pose = 'win';
    } else if (matched) {
      pose = 'matched';
    } else if (notMatched) {
      pose = 'notMatched';
    }

    return (
      <StyledTile
        showItem={showItem}
        pose={pose}
        onClick={handleClick}
      >
        <Item src={`./items/item${itemIndex}.svg`} alt="" pose="visible" />
      </StyledTile>
    );
  }
}

export default Tile;
