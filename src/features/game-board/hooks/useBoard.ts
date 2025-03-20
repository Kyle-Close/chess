import { usePieceSelector } from './usePieceSelector';

export function useBoard() {
  const selected = usePieceSelector();

  const handleSquareClicked = (index: number) => {
    // No piece currently selected.
    if (selected.selectedIndex === null) {
      selected.updateSelectedIndex(index);
    } else { // Piece selected.
      selected.clear();
    }
  };

  const handleRightClickOnBoard = () => {
    selected.clear();
  };

  return {
    handleRightClickOnBoard,
    handleSquareClicked,
    selected
  }
}
