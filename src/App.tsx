import { HashRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';

const Div = styled.div`
  background-color: #f3f3f3;
  height: 100vh;
`;

function App() {
  return (
    <HashRouter>
      <Div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile/:id"
            element={<Profile />}
          />
        </Routes>
      </Div>
    </HashRouter>
  );
}

export default App;
