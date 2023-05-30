/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  currentUser: string;
  id: string;
  profilePicture: string;
}

const initialState: UserState = {
  currentUser: '',
  id: '',
  profilePicture: '',
};

export const currentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<UserState>) => {
      state.currentUser = action.payload.currentUser;
      state.id = action.payload.id;
      state.profilePicture = action.payload.profilePicture;
      localStorage.setItem('user', action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeUser } = currentUser.actions;

export default currentUser.reducer;
