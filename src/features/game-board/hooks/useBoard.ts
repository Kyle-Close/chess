import { useQueryClient } from '@tanstack/react-query';
import { usePieceSelector } from './usePieceSelector';
import { Game } from 'base/zod/GameSchema';

export function useBoard() {
  const queryClient = useQueryClient();
  const selected = usePieceSelector();

  const gameData = queryClient.getQueryData<Game>(["game"])

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
    selected,
    gameData
  }
}
