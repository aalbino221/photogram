import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function useCurrentUser(): Array<string> {
  const [userName] = useState(
    useSelector((state: RootState) => state.user.currentUser),
  );
  const [userId] = useState(useSelector((state: RootState) => state.user.id));
  const [userPhoto] = useState(
    useSelector((state: RootState) => state.user.profilePicture),
  );
  return [userName, userId, userPhoto];
}
