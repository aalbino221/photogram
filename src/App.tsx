/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import PostModal from './components/Reusable/PostModal';

const Div = styled.div`
  background-color: #f3f3f3;
  height: 100vh;
`;

function App() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <HashRouter>
      <Div>
        {showHeader && <Header />}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
        <PostModal />
      </Div>
    </HashRouter>
  );
}

export default App;
