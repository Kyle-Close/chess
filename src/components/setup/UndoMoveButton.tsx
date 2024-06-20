import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function UndoMoveButton() {
  const { undo } = useUndoRedoMove();

  const handleClick = () => {
    undo();
  };
  return <button onClick={handleClick}>{'<'}</button>;
}
