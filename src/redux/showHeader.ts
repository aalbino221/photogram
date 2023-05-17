/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface HeaderState {
  show: boolean;
}

const initialState: HeaderState = {
  show: true,
};

export const currentHeader = createSlice({
  name: 'showHeader',
  initialState,
  reducers: {
    changeHeader: (state, action: PayloadAction<HeaderState>) => {
      state.show = action.payload.show;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeHeader } = currentHeader.actions;

export default currentHeader.reducer;
