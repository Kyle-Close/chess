import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/board';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useStore } from 'react-redux';

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: combineSlices(boardSlice),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
