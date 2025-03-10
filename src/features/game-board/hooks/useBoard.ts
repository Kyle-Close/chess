import { setupBoard } from 'base/redux/slices/board';
import { selectPlayerById } from 'base/redux/slices/player';
import { AppDispatch, RootState } from 'base/redux/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useStartEndAction } from './useStartEndAction';
import { PieceColor, PieceType } from './usePiece';
import { deepCopyBoard } from '../utils/board-utility/deepCopyBoard';
import { getKingIndex } from 'base/features/game-logic/utils/game-checks/getKingIndex';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBoard() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const board = useAppSelector((state) => state.board);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const dispatch = useAppDispatch();
  const startEnd = useStartEndAction();
  let checkIndex: number | null = null;

  // Look for check square - for highlighting
  if (whitePlayer.isInCheck) {
    const whiteKingIndex = getKingIndex(board, PieceColor.WHITE);
    checkIndex = whiteKingIndex;
  }

  if (blackPlayer.isInCheck) {
    const blackKingIndex = getKingIndex(board, PieceColor.BLACK);
    checkIndex = blackKingIndex;
  }

  const isWhiteTurn = whitePlayer.isTurn;
  const currentPlayer = isWhiteTurn ? whitePlayer : blackPlayer;

  function replacePieceAtPosition(pos: number, type: PieceType, useOppositeColor = false) {
    const copy = deepCopyBoard(board);
    const piece = copy[pos].piece;

    if (!piece) throw Error('No piece found at position: ' + pos);

    const currentColor = piece.color;
    const oppositeColor = currentColor === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;

    const color = useOppositeColor ? oppositeColor : currentColor;
    copy[pos].piece = { type, color, hasMoved: true };
    dispatch(setupBoard(copy));
  }

  const handleSquareClicked = (index: number) => {
    if (!gameInfo.isPlaying) return;

    const isValidClick = isClickingValidSquare(index, startEnd.startPos !== null);
    if (isValidClick) startEnd.setPosition(index);
  };

  const isClickingValidSquare = (index: number, isFinalClick: boolean) => {
    const piece = board[index].piece;
    if (currentPlayer.isAi) return false
    if ((piece && piece.color === currentPlayer.color) || !piece) return true;
    if (piece && piece.color !== currentPlayer.color && isFinalClick) return true;
    return false;
  };

  return {
    board,
    startPos: startEnd.startPos,
    handleSquareClicked,
    checkIndex,
    replacePieceAtPosition,
  };
}
