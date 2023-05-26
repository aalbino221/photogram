/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '../../reusable';
import { RootState } from '../../../../redux/store';
import Img from '../../../Reusable/components/Img';
import signOutGoogle from '../../../../firebase/auth/signOut';
import { changeUser } from '../../../../redux/currentUser';

const Dropdown = styled.div`
  & details > summary {
    list-style: none;
  }

  & details > summary::marker, /* Latest Chrome, Edge, Firefox */ 
  & details > summary::-webkit-details-marker /* Safari */ {
    display: none;
  }
`;

export default function UserDropdown() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const closeDetails = () => {
    document.querySelector('details')?.removeAttribute('open');
  };

  const signOut = () => {
    signOutGoogle();
    dispatch(
      changeUser({
        currentUser: '',
        id: '',
        profilePicture: '',
      }),
    );
  };

  return (
    <Dropdown className="hover: cursor-pointer flex items-center">
      <details>
        <summary className="appearance-none">
          {user.currentUser !== '' ? (
            <Img
              link={user.profilePicture}
              height={1.7}
              width={1.7}
              borderRadius={50}
            />
          ) : (
            <Icon className="fa-solid fa-user" />
          )}
        </summary>
        {user.currentUser !== '' ? (
          <ul className="fixed bg-white p-3 py-1 border mt-1">
            <li
              className="absolute -top-2 -left-0 -ml-0.5"
              style={{
                width: '0px',
                height: '0px',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid rgba(209, 213, 219)',
              }}
            />
            <Link to={`profile/${user.id}`}>
              <li>
                <button onClick={closeDetails}>
                  <i className="fa-solid fa-user pr-1" />
                  Profile
                </button>
              </li>
            </Link>
            <Link to="/login">
              <li>
                <button
                  onClick={() => {
                    closeDetails();
                    signOut();
                  }}
                >
                  <i className="fa-solid fa-door-open pr-1" />
                  Logoff
                </button>
              </li>
            </Link>
          </ul>
        ) : (
          <ul className="fixed bg-white p-3 py-1 border mt-1">
            <Link to="/login">
              <li>
                <button onClick={closeDetails}>
                  <i className="fa-solid fa-right-to-bracket pr-1" />
                  Login
                </button>
              </li>
            </Link>
          </ul>
        )}
      </details>
    </Dropdown>
  );
}
