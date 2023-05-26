/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as fireStore from 'firebase/firestore';

export interface LastItemState {
  lastItem: number;
  lastDoc: fireStore.DocumentSnapshot<fireStore.DocumentData> | null;
}

const initialState: LastItemState = {
  lastItem: 0,
  lastDoc: null,
};

export const lastItem = createSlice({
  name: 'lastItem',
  initialState,
  reducers: {
    changeLastItem: (state, action: PayloadAction<LastItemState>) => {
      state.lastItem = action.payload.lastItem;
      state.lastDoc = action.payload.lastDoc;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLastItem } = lastItem.actions;

export default lastItem.reducer;
