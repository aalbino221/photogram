/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { HashRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import PostModal from './components/Reusable/components/PostModal';
import { RootState } from './redux/store';

const Div = styled.div`
  background-color: #f3f3f3;
`;

function App() {
  const showHeader = useSelector((state: RootState) => state.header.show);

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
