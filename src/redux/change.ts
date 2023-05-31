/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ChangeState {
  change: number;
}

const initialState: ChangeState = {
  change: 0,
};

export const change = createSlice({
  name: 'change',
  initialState,
  reducers: {
    changeState: (state, action: PayloadAction<ChangeState>) => {
      state.change += action.payload.change;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeState } = change.actions;

export default change.reducer;
