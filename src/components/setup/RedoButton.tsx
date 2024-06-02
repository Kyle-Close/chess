import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function RedoButton() {
  const { redo } = useUndoRedoMove();
  return <button onClick={redo}>{'>'}</button>;
}
