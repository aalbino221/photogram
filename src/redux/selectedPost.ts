/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PostProps } from '../components/Reusable/interfaces/posts';

export interface SelectedPostState {
  show: boolean;
  postInfo: PostProps | null;
}

const initialState: SelectedPostState = {
  show: false,
  postInfo: null,
};

export const selectedPost = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    changeSelectedPost: (state, action: PayloadAction<SelectedPostState>) => {
      state.show = action.payload.show;
      state.postInfo = action.payload.postInfo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSelectedPost } = selectedPost.actions;

export default selectedPost.reducer;
