import React from 'react';
import styled from 'styled-components';

export default () => {
  const Title = styled.h1`
    font-family: 'Karla';
    font-size: 3rem;
    margin: 0;
    text-align: center;
  `;

  return (
    <div>
      <Title pose="visible">MATCH</Title>
    </div>
  );
};
