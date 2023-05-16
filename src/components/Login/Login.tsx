/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import tw from 'tailwind-styled-components';
import type { RootState } from '../../redux/store';
import Icon from './Icon';
import registerGoogle, {
  currentUser,
} from '../../firebase/auth/registerGoogle';
import { changeUser } from '../../redux/currentUser';
import loginGoogle from '../../firebase/auth/loginGoogle';

const Div = tw.div`
  flex
  flex-col
  w-3/12
  mx-auto
  items-center
  gap-5
  mt-44
`;

function Login() {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState('');
  const [loginError, setLoginError] = useState('');

  const redirectToHome = (route: string) => {
    navigate(route);
  };

  const register = async () => {
    if (usernameRef.current && usernameRef.current.value !== '') {
      const result = await registerGoogle(usernameRef.current.value);
      if (result === 'success') {
        dispatch(
          changeUser({
            currentUser: usernameRef.current.value,
            id: currentUser(),
          }),
        );
        redirectToHome('/');
      } else setUsernameError(result);
    } else setUsernameError('Username cannot be empty');
  };

  const login = async () => {
    const result = await loginGoogle();
    if (result === true) {
      dispatch(
        changeUser({
          currentUser: usernameRef.current ? usernameRef.current.value : '',
          id: currentUser(),
        }),
      );
      redirectToHome('/');
    } else setLoginError('No account found. Please register first.');
  };

  return (
    <Div>
      <h1 className="font-semibold text-4xl font-unica text-gray-700 mb-6">
        Photogram
      </h1>
      <div className="w-full">
        <div
          className={`px-2 py-2 rounded border-2 ${
            usernameError !== '' && 'border-red-500'
          } w-full text-xl flex bg-white shadow`}
        >
          <p className="text-gray-400 pr-1">@</p>
          <input
            type="text"
            placeholder="Username"
            className="outline-none flex-grow text-gray-700"
            ref={usernameRef}
          />
        </div>
        {usernameError !== '' && (
          <p className="text-red-500 text-sm absolute pl-1">{usernameError}</p>
        )}
      </div>
      <button
        className="flex w-full justify-center bg-white border-2 px-5 py-2 items-center gap-2 text-gray-700 text-xl font-medium mb-6 shadow"
        onClick={register}
      >
        <Icon />
        Sign in with Google
      </button>
      <div className="flex text-base items-center justify-center w-full">
        <hr
          className="flex-grow bg-gray-300 border-0 rounded dark:bg-gray-700"
          style={{ height: '1px' }}
        />
        <p className="px-2 text-gray-600">Already Signed In?</p>
        <hr
          className="flex-grow bg-gray-300 border-0 rounded dark:bg-gray-700"
          style={{ height: '1px' }}
        />
      </div>
      <div className="mb-4 w-full">
        <button
          className="flex w-full justify-center bg-white border-2 py-2 px-5 items-center gap-2 text-gray-700 text-xl font-medium mb-4 shadow"
          onClick={login}
        >
          <Icon />
          Login with Google
        </button>
        {loginError !== '' && (
          <p className="text-red-500 text-center text-sm absolute pl-1 left-1/2 transform -translate-x-1/2">
            {loginError}
          </p>
        )}
      </div>
      <Link to="/">
        <button className="text-gray-800 text-xl border-b-2 border-gray-500 px-2 pb-1">
          Just visiting
        </button>
      </Link>
    </Div>
  );
}

export default Login;
