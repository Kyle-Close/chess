import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function RedoMoveButton() {
  const { redo } = useUndoRedoMove();

  const handleClick = () => {
    redo();
  };
  return <button onClick={handleClick}>{'>'}</button>;
}
