/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom'; // optional
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithStore from '../../../redux/__tests__/renderWithStore.test';
import Post from './Post';
import getPosts from '../../../firebase/firestore/getPosts';

describe('Post componente', () => {
  afterEach(cleanup);
  it('Should render a post with correct information', () => {
    const postInfo = {
      userId: 'user231',
      userPic: 'lindy2',
      userName: 'lindy2',
      photoUrl: 'https://picsum.photos/200',
      liked: false,
      likes: [{ userId: 'asdawsd' }],
      comments: [{ userId: 'user231', text: 'Hello', id: 2 }],
      profileUrl: 'user231',
      description: 'This is a description',
    };
    const { store } = renderWithStore(<Post postInfo={postInfo} />);
    expect(screen.getByText('lindy2')).toBeInTheDocument();
    expect(screen.getByText(/user231/)).toBeInTheDocument();
    expect(screen.getByText(/5 Likes/)).toBeInTheDocument();
  });
});
