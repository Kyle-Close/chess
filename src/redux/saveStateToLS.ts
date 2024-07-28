import { RootState } from './store';

export function saveStateToLS(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('redux', serializedState);
  } catch (error) {
    console.log(error);
  }
}
