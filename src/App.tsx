import { HashRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import PostModal from './components/Reusable/components/PostModal';
import { RootState } from './redux/store';
import { changeUser } from './redux/currentUser';
import { getInfo } from './firebase/auth/loginGoogle';

const Div = styled.div`
  background-color: #f3f3f3;
`;

function App() {
  const showHeader = useSelector((state: RootState) => state.header.show);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLogin() {
      const objString = localStorage.getItem('user');
      if (objString === '' || objString == null) {
        setLoading(false);
        return;
      }
      const result = await getInfo(objString);
      dispatch(
        changeUser({
          currentUser: result.name,
          id: result.id,
          profilePicture: result.profilePhotoUrl,
        }),
      );
      setLoading(false);
    }
    getLogin();
  }, [dispatch]);

  if (loading) return null;
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
          <Route
            path="/posts/:id"
            element={<PostModal />}
          />
        </Routes>
      </Div>
    </HashRouter>
  );
}

export default App;
