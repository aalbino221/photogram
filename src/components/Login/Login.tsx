/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import Icon from './Icon';

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
  return (
    <Div>
      <h1 className="font-semibold text-4xl font-unica text-gray-700 mb-6">
        Photogram
      </h1>
      <div className="px-2 py-2 rounded border-2 w-full text-xl flex bg-white shadow">
        <p className="text-gray-400 pr-1">@</p>
        <input
          type="text"
          placeholder="Username"
          className="outline-none flex-grow text-gray-700"
        />
      </div>
      <button className="flex w-full justify-center bg-white border-2 px-5 py-2 items-center gap-2 text-gray-700 text-xl font-medium mb-6 shadow">
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
      <button className="flex w-full justify-center bg-white border-2 px-5 py-2 items-center gap-2 text-gray-700 text-xl font-medium mb-4 shadow">
        <Icon />
        Login with Google
      </button>
      <Link to="/">
        <button className="text-gray-800 text-xl border-b-2 border-gray-500 px-2 pb-1">
          Just visiting
        </button>
      </Link>
    </Div>
  );
}

export default Login;
