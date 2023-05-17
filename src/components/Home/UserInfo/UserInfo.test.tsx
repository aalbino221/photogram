/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom'; // optional
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import UserInfo from './UserInfo';
import renderWithStore from '../../../redux/__tests__/renderWithStore.test';
import { changeUser } from '../../../redux/currentUser';

describe('User Info component', () => {
  it('Should not render when not logged in', () => {
    const { store } = renderWithStore(<UserInfo />);
    expect(screen.queryByText('Posts')).toBeNull();
  });
  it('Should render when logged in', () => {
    const { store } = renderWithStore(<UserInfo />);
    act(() => {
      store.dispatch(
        changeUser({
          currentUser: 'Jorge',
          id: '123',
          profilePicture: '124',
        }),
      );
    });
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
