import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePieceSelector } from './usePieceSelector';
import { Game, GameSchema } from '../../../zod/GameSchema';
import { PieceType } from '../../../zod/emums/PieceType';
import { sendPost } from '../../api-utils/sendPost';
import { useState } from 'react';

export interface ExecuteMovePayload {
  gameId: string,
  start: number,
  end: number,
  promotionPiece?: PieceType
}

export const executeMove = async (body: ExecuteMovePayload): Promise<Game> => {
  try {
    return await sendPost('execute-move', body, GameSchema);
  } catch (err) {
    console.error('Error starting new game:', err);
    throw err;
  }
}

export function useBoard() {
  const queryClient = useQueryClient();
  const selected = usePieceSelector();
  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);

  const openPromotionModal = () => {
    setIsPromotionModalOpen(true);
  }

  const closePromotionModal = () => {
    setIsPromotionModalOpen(false)
  }

  const gameData = useQuery<Game>({
    queryKey: ['game'],
    queryFn: async () => {
      const cached = queryClient.getQueryData<Game>(['game']);
      if (!cached) throw new Error('No game in cache');
      return cached;
    },
    initialData: () => queryClient.getQueryData<Game>(['game']),
    enabled: true
  }).data;

  const executeMoveMutation = useMutation<Game, Error, ExecuteMovePayload>({
    mutationKey: ["game"],
    mutationFn: executeMove,
    onSuccess: (gameData) => {
      queryClient.setQueryData(["game"], gameData)
    }
  })

  const handleSquareClicked = (index: number) => {
    if (!gameData) return;
    const piece = gameData?.board.squares[index].piece;

    if (selected.selectedList.length === 0 && piece && (piece.color === gameData.activeColor)) {
      // No piece selected yet but now selecting a piece with the correct color
      selected.append(index);
    } else if (selected.selectedList.length === 1) { // Piece selected, attempting to execute move
      selected.append(index);
      if (gameData.board.squares[selected.selectedList[0]].piece?.validMoves.find(move => move.startIndex == selected.selectedList[0] && move.endIndex == index && move.isPromotion)) {
        openPromotionModal(); // Popup modal here and wait for user to select promotion piece
      } else {
        executeMoveMutation.mutate({ start: selected.selectedList[0], end: index, gameId: gameData.id })
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
    gameData,
    openPromotionModal,
    closePromotionModal,
    isPromotionModalOpen
  }
}
