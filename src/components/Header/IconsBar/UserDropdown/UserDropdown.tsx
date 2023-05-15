/* eslint-disable react/button-has-type */
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '../../reusable';

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
  const closeDetails = () => {
    document.querySelector('details')?.removeAttribute('open');
  };

  return (
    <Dropdown className="hover: cursor-pointer">
      <details>
        <summary className="appearance-none">
          <Icon className="fa-solid fa-user" />
        </summary>
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
          <Link to="/profile/:id">
            <li>
              <button onClick={closeDetails}>
                <i className="fa-solid fa-user pr-1" />
                Profile
              </button>
            </li>
          </Link>
          <Link to="/login">
            <li>
              <button onClick={closeDetails}>
                <i className="fa-solid fa-door-open pr-1" />
                Logoff
              </button>
            </li>
          </Link>
        </ul>
      </details>
    </Dropdown>
  );
}
