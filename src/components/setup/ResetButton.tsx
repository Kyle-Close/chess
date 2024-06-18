import { useResetGame } from '../../hooks/useResetGame';

export function ResetButton() {
  const { resetGame } = useResetGame();

  function handleClick() {
    resetGame();
  }

  return <button onClick={handleClick}>Reset</button>;
}
