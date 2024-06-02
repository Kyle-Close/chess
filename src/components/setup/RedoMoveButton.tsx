import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function RedoMoveButton() {
  const { redo } = useUndoRedoMove();

  const handleClick = () => {
    console.log('redo clicked');
    redo();
  };
  return <button onClick={handleClick}>{'>'}</button>;
}
