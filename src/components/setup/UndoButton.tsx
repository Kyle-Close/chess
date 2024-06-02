import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function UndoButton() {
  const { undo } = useUndoRedoMove();
  return <button onClick={undo}>{'<'}</button>;
}
