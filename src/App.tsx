import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';

const Div = styled.div`
  height: 100px;
  background-color: white;
`;

function App() {
  return (
    <Div>
      <Header />
    </Div>
  );
}

export default App;
