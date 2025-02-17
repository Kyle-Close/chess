import { useMove } from 'base/features/game-logic/hooks/useMove';
import { useTransitionTurn } from 'base/features/game-logic/hooks/useTransitionTurn';
import { clearIsValidSquares, setupBoard } from 'base/redux/slices/board';
import { selectCastleRightsById } from 'base/redux/slices/castleRights';
import { setPawnPromotionSquare } from 'base/redux/slices/gameInfo';
import { setMoveMetaData } from 'base/redux/slices/move';
import { selectPlayerById } from 'base/redux/slices/player';
import { AppDispatch, RootState } from 'base/redux/store';
import { useEffect } from 'react';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useStartEndAction } from './useStartEndAction';
import { PieceColor, PieceType } from './usePiece';
import { deepCopyBoard } from '../utils/board-utility/deepCopyBoard';
import { ValidMoves } from 'base/features/game-logic/utils/piece-validation/kingMoveValidation';
import { calculateAllValidMoves } from 'base/features/game-logic/utils/move-execution/calculateAllValidMoves';
import { getInitialBoardState } from 'base/data/getInitialBoardState';
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
  const { buildInitMoveMetaData } = useMove();
  const { transition } = useTransitionTurn();
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
  const currentPlayerCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, currentPlayer.castleRightsId)
  );

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

  function resetBoard() {
    dispatch(setupBoard(getInitialBoardState()));
  }

  function handleShowValidMoves(startPos: number) {
    const currentPiece = board[startPos].piece;
    if (currentPiece) {
      const boardCopy = [...board];
      const validMoves = calculateAllValidMoves(
        boardCopy,
        currentPiece,
        startPos,
        currentPlayerCastleRights,
        gameInfo.enPassantSquare
      );
      if (validMoves) highlightValidMoves(validMoves);
    }
  }

  function highlightValidMoves(validMoves: ValidMoves[]) {
    const copy = deepCopyBoard(board);

    validMoves.forEach((move) => {
      if (move.isCapture) copy[move.index].isCapture = true;
      copy[move.index].isValidMove = true;
    });

    dispatch(setupBoard(copy));
  }

  const handleSquareClicked = (index: number) => {
    if (!gameInfo.isPlaying) return;

    const isValidClick = isClickingValidSquare(index, startEnd.startPos !== null);
    if (isValidClick) startEnd.setPosition(index);
  };

  const handleRightClickOnBoard = () => {
    startEnd.setStartPos(null);
    dispatch(clearIsValidSquares());
  };

  const isClickingValidSquare = (index: number, isFinalClick: boolean) => {
    const piece = board[index].piece;
    if ((piece && piece.color === currentPlayer.color) || !piece) return true;
    if (piece && piece.color !== currentPlayer.color && isFinalClick) return true;
    return false;
  };

  useEffect(() => {
    // Handle reset - don't show any valid moves
    if (startEnd.startPos === null) dispatch(clearIsValidSquares());
    // Handle first click - show the valid moves
    else if (startEnd.startPos !== null && startEnd.endPos === null) {
      if (isClickingValidSquare(startEnd.startPos, true)) handleShowValidMoves(startEnd.startPos);
    }

    // Handle move execution
    else if (startEnd.startPos !== null && startEnd.endPos !== null) {
      const piece = board[startEnd.startPos].piece;
      if (piece) {
        const moveMetaData = buildInitMoveMetaData(piece, startEnd.startPos, startEnd.endPos);

        if (moveMetaData && moveMetaData.isMoveValid) {
          console.log(moveMetaData);
          dispatch(setMoveMetaData(moveMetaData));

          if (!moveMetaData.isPromotion) transition(moveMetaData);
          else dispatch(setPawnPromotionSquare(moveMetaData.endPosition));
        }

        startEnd.clear();
      }
    }
  }, [startEnd.startPos, startEnd.endPos]);

  return {
    board,
    startPos: startEnd.startPos,
    handleSquareClicked,
    handleRightClickOnBoard,
    resetBoard,
    checkIndex,
    replacePieceAtPosition,
  };
}
