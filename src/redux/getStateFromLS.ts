export function getStateFromLS() {
  try {
    const serializedState = localStorage.getItem('redux');
    if (!serializedState) return;

    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
  }
}
