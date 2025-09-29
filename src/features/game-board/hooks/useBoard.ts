import { useQueryClient } from '@tanstack/react-query';
import { usePieceSelector } from './usePieceSelector';
import { Game } from '../../../zod/GameSchema';
import { useCallback, useEffect, useState } from 'react';
import { GameStatus } from 'base/zod/emums/GameStatus';
import { useExecuteMove } from 'base/features/api-utils/hooks/useExecuteMove';


export function useBoard(game: Game) {
  const queryClient = useQueryClient();
  const selected = usePieceSelector();

  const executeMoveMutation = useExecuteMove();

  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  const playSound = useCallback(() => {
    const audio = new Audio("standard-move.wav");
    audio.play();
  }, []);

  const openPromotionModal = () => {
    setIsPromotionModalOpen(true);
  }

  const closePromotionModal = () => {
    setIsPromotionModalOpen(false)
  }

  const openGameOverModal = () => {
    setIsGameOverModalOpen(true)
  }

  const closeGameOverModal = () => {
    setIsGameOverModalOpen(false);
  }

  useEffect(() => {
    console.log('game status updated')
    if (game.status !== GameStatus.ONGOING && game.status !== GameStatus.IN_CHECK) {
      setIsGameOverModalOpen(true)
    }
  }, [game.status])

  const isGamePlaying = () => {
    if (game.status === GameStatus.ONGOING || game.status === GameStatus.IN_CHECK) return true;
    return false
  }

  const handleSquareClicked = (index: number) => {
    if (!isGamePlaying()) return;
    const piece = game.board.squares[index].piece;

    if (selected.selectedList.length === 0 && piece && (piece.color === game.activeColor)) {
      // No piece selected yet but now selecting a piece with the correct color
      selected.append(index);
    } else if (selected.selectedList.length === 1) { // Piece selected, attempting to execute move
      selected.append(index);
      if (game.board.squares[selected.selectedList[0]].piece?.validMoves.find(move => move.startIndex == selected.selectedList[0] && move.endIndex == index && move.isPromotion)) {
        openPromotionModal(); // Popup modal here and wait for user to select promotion piece
      } else {
        executeMoveMutation.mutate({ start: selected.selectedList[0], end: index, gameId: game.id })

        if (executeMoveMutation.isSuccess) {
          if (game.status != GameStatus.ONGOING && game.status != GameStatus.IN_CHECK) {
            openGameOverModal();
          }
          queryClient.setQueryData(["game"], game)
          playSound()
        }
        selected.clear();
      }
    }
  }

  const handleRightClickOnBoard = () => {
    selected.clear();
  };

  return {
    handleRightClickOnBoard,
    handleSquareClicked,
    selected,
    openPromotionModal,
    closePromotionModal,
    isPromotionModalOpen,
    isGameOverModalOpen,
    openGameOverModal,
    closeGameOverModal
  }
}
