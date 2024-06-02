import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';

export function UndoMoveButton() {
  const { undo } = useUndoRedoMove();

  const handleClick = () => {
    console.log('undo clicked');
    undo();
  };
  return <button onClick={handleClick}>{'<'}</button>;
}
