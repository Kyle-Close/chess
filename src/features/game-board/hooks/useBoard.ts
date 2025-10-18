import { useQueryClient } from '@tanstack/react-query';
import { usePieceSelector } from './usePieceSelector';
import { Game } from '../../../zod/GameSchema';
import { useCallback, useEffect, useState } from 'react';
import { GameStatus } from 'base/zod/emums/GameStatus';
import { useExecuteMove } from 'base/features/api-utils/hooks/useExecuteMove';

import moveSfx from "../../../assets/audio/standard-move.wav";
import captureSfx from "../../../assets/audio/capture.mp3";

export function useBoard(game: Game) {
  const queryClient = useQueryClient();
  const selected = usePieceSelector();

  const executeMoveMutation = useExecuteMove();

  const [isPromotionModalOpen, setIsPromotionModalOpen] = useState(false);
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  const playSound = useCallback((isCapture = false) => {
    let audio = new Audio(moveSfx)
    if (isCapture)
      audio = new Audio(captureSfx);
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
    if (game.status !== GameStatus.ONGOING && game.status !== GameStatus.IN_CHECK) {
      setIsGameOverModalOpen(true)
    }
  }, [game.status])

  const isGamePlaying = () => {
    if (game.status === GameStatus.ONGOING || game.status === GameStatus.IN_CHECK) return true;
    return false
  }


  const handleSquareClicked = async (index: number) => {
    if (!isGamePlaying() || game.activeColor === game.stockfishInfo?.playingAs) return;

    const targetPiece = game.board.squares[index].piece;

    // First click: select a piece of the active color
    if (selected.selectedList.length === 0 && targetPiece && targetPiece.color === game.activeColor) {
      selected.append(index);
      return;
    }

    // Second click: attempt a move
    if (selected.selectedList.length === 1) {
      selected.selectedList.push(index)
      const start = selected.selectedList[0];
      const end = index;

      const movingPiece = game.board.squares[start].piece;
      const planned = movingPiece?.validMoves.find(m => m.startIndex === start && m.endIndex === end);

      // Promotion path -> open modal and bail
      if (planned?.isPromotion) {
        openPromotionModal();
        return;
      }

      // Decide capture BEFORE the request (fallback to piece on target)
      const wasCapture = (planned as any)?.isCapture ?? Boolean(game.board.squares[end].piece);

      try {
        const updatedGame = await executeMoveMutation.mutateAsync({ start, end, gameId: game.id });

        // Play correct sound after a real success
        playSound(wasCapture);

        // Write fresh server snapshot to cache
        queryClient.setQueryData(["game"], updatedGame);

        // Game over?
        if (
          updatedGame.status !== GameStatus.ONGOING &&
          updatedGame.status !== GameStatus.IN_CHECK
        ) {
          openGameOverModal();
        }
      } catch (err) {
        console.error("executeMove failed", err);
      } finally {
        // Always clear the selection
        selected.clear();
      }
    }
  };


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
