import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { PieceColor } from '../enums/PieceColor';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { BoardState } from '../context/board/InitialState';
import { scanAttackingSquares } from '../helpers/analysis/board-scan/scanAttackingSquares';

export interface CastleRights {
  canCastleQueenSide: boolean;
  canCastleKingSide: boolean;
  queenSideIsAvailable: boolean;
  kingSideIsAvailable: boolean;
  // the available properties indicate a situation where the king and rook(s)
  //   have not moved. But the canCastle may not be possible due to a temporary
  //   situation where castling is not available (e.g. being blocked)
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

function getCastleRights(board: BoardState, color: PieceColor): CastleRights {
  const kingIndex = getKingIndex(board, color);
  const king = board[kingIndex].piece;

  if (!king || king.hasMoved)
    return {
      canCastleQueenSide: false,
      canCastleKingSide: false,
      queenSideIsAvailable: false,
      kingSideIsAvailable: false,
    };

  let canCastleQueenSide = true;
  let canCastleKingSide = true;
  let queenSideIsAvailable = true;
  let kingSideIsAvailable = true;

  const queenSideRook = getQueenSideRookSquare(board, color).piece;
  const kingSideRook = getKingSideRookSquare(board, color).piece;

  if (!queenSideRook || queenSideRook.hasMoved) queenSideIsAvailable = false;
  if (!kingSideRook || kingSideRook.hasMoved) kingSideIsAvailable = false;

  if (!queenSideRook || queenSideRook.hasMoved === true) canCastleQueenSide = false;
  if (!kingSideRook || kingSideRook.hasMoved === true) canCastleKingSide = false;

  const queenSideSquaresAlongPath = getQueenSideSquaresAlongPath(color);
  const kingSideSquaresAlongPath = getKingSideSquaresAlongPath(color);

  const isQueenSidePathObstructed = isPathObstructed(board, queenSideSquaresAlongPath);
  const isKingSidePathObstructed = isPathObstructed(board, kingSideSquaresAlongPath);

  if (isQueenSidePathObstructed) canCastleQueenSide = false;
  if (isKingSidePathObstructed) canCastleKingSide = false;

  const isQueenSideAttacked = checkIfPathIsAttacked(
    board,
    queenSideSquaresAlongPath,
    color
  );
  const isKingSideAttacked = checkIfPathIsAttacked(
    board,
    kingSideSquaresAlongPath,
    color
  );

  if (isQueenSideAttacked) canCastleQueenSide = false;
  if (isKingSideAttacked) canCastleKingSide = false;

  return {
    canCastleQueenSide,
    canCastleKingSide,
    queenSideIsAvailable,
    kingSideIsAvailable,
  };
}

function checkIfPathIsAttacked(
  board: BoardState,
  pathSquares: number[],
  color: PieceColor
) {
  // Checks if any of the passed in squares are being attacked by opponent
  const opponentColor = color === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  const attackedIndexes = scanAttackingSquares(board, opponentColor);

  return pathSquares.some((square) => attackedIndexes.includes(square));
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
