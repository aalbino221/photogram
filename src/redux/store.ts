import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUser';
import showHeaderReducer from './showHeader';
import lastItemReducer from './lastItem';
import selectedPostReducer from './selectedPost';
import changeReducer from './change';

export const store = configureStore({
  reducer: {
    user: currentUserReducer,
    header: showHeaderReducer,
    lastItem: lastItemReducer,
    selectedPost: selectedPostReducer,
    change: changeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
