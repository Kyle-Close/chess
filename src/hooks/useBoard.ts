import { useEffect } from 'react';
import { useStartEndAction } from './useStartEndAction';
import { getInitialBoardState } from '../context/board/InitialState';
import { ValidMoves } from '../helpers/game-core/piece-validation/kingMoveValidation';
import { useMove } from './useMove';
import { calculateAllValidMoves } from '../helpers/game-core/move-execution/calculateAllValidMoves';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { deepCopyBoard } from '../helpers/utilities/deepCopyBoard';
import { clearIsValidSquares, setupBoard } from '../redux/slices/board';
import { selectPlayerById } from '../redux/slices/player';
import { selectCastleRightsById } from '../redux/slices/castleRights';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { PieceColor } from '../enums/PieceColor';
import { PieceType } from '../enums/PieceType';
import { useTransitionTurn } from './useTransitionTurn';

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
  const {} = useTransitionTurn();
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

  function replacePieceAtPosition(pos: number, type: PieceType) {
    const copy = deepCopyBoard(board);
    const piece = copy[pos].piece;

    if (!piece) throw Error('No piece found at position: ' + pos);

    const color = piece.color;
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
        console.log(moveMetaData);
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
