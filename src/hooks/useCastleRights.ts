import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { PieceColor } from '../enums/PieceColor';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { BoardState, Piece } from '../context/board/InitialState';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { PieceWithIndex } from '../helpers/board/isCheckmate';

export interface CastleRights {
  canCastleQueenSide: boolean;
  canCastleKingSide: boolean;
}

export function useCastleRights(color: PieceColor) {
  const { board } = useContext(BoardContext);
  const [castleRights, setCastleRights] = useState<CastleRights>(
    getCastleRights(board, color)
  );

  useEffect(() => {
    setCastleRights(getCastleRights(board, color));
  }, [board]);

  return { castleRights };
}

function getCastleRights(board: BoardState, color: PieceColor) {
  const kingIndex = getKingIndex(board, color);
  const king = board[kingIndex].piece;

  if (!king || king.hasMoved)
    return { canCastleQueenSide: false, canCastleKingSide: false };

  let isQueenSide = true;
  let isKingSide = true;

  const queenSideRook = getQueenSideRookSquare(board, color).piece;
  const kingSideRook = getKingSideRookSquare(board, color).piece;

  if (!queenSideRook || queenSideRook.hasMoved === true) isQueenSide = false;
  if (!kingSideRook || kingSideRook.hasMoved === true) isKingSide = false;

  const queenSideSquaresAlongPath = getQueenSideSquaresAlongPath(color);
  const kingSideSquaresAlongPath = getKingSideSquaresAlongPath(color);

  const isQueenSidePathObstructed = isPathObstructed(board, queenSideSquaresAlongPath);
  const isKingSidePathObstructed = isPathObstructed(board, kingSideSquaresAlongPath);

  if (isQueenSidePathObstructed) isQueenSide = false;
  if (isKingSidePathObstructed) isKingSide = false;

  const isQueenSideAttacked = getIsQueenSideAttacked(
    board,
    queenSideSquaresAlongPath,
    color
  );

  return { canCastleQueenSide: isQueenSide, canCastleKingSide: isKingSide };
}

function getIsQueenSideAttacked(
  board: BoardState,
  pathSquares: number[],
  color: PieceColor
) {
  // get all opponent pieces
  // run validations on all of them to see what squares they can go to.
  // if any of the above 'attack' squares are in the list of pathSquares then true
  // otherwise false
  const opponentPieces: PieceWithIndex[] = [];

  board.forEach((square, index) => {
    const piece = square.piece;
    if (!piece) return;
    else if (piece.color !== color) opponentPieces.push({ ...piece, index });
  });

  const isAttacked = opponentPieces.some((piece) => {
    //const attackingSquares = validatePieceMove(board, piece);
  });
}

function isPathObstructed(board: BoardState, squaresAlongPath: number[]) {
  // Only care about spaces between.
  return squaresAlongPath.some((square, index) => {
    if (index === 0 || index === squaresAlongPath.length - 1) return false;
    if (board[square].piece !== null) return true;
    else return false;
  });
}

function getQueenSideSquaresAlongPath(color: PieceColor) {
  if (color === PieceColor.WHITE) return [0, 1, 2, 3, 4];
  else return [56, 57, 58, 59, 60];
}

function getKingSideSquaresAlongPath(color: PieceColor) {
  if (color === PieceColor.WHITE) return [4, 5, 6, 7];
  else return [60, 61, 62, 63];
}

function getQueenSideRookSquare(board: BoardState, color: PieceColor) {
  if (color === PieceColor.BLACK) return board[56];
  else return board[0];
}

function getKingSideRookSquare(board: BoardState, color: PieceColor) {
  if (color === PieceColor.BLACK) return board[63];
  else return board[7];
}
