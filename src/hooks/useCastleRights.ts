import { useState } from 'react';
import { PieceColor } from '../enums/PieceColor';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { BoardState } from '../context/board/InitialState';
import { isSquaresAttacked } from '../helpers/game-core/move-utility/isSquaresAttacked';
import { isPathObstructed } from '../helpers/game-core/move-utility/isPathObstructed';

export interface CastleRights {
  canCastleQueenSide: boolean;
  canCastleKingSide: boolean;
  queenSideIsAvailable: boolean;
  kingSideIsAvailable: boolean;
}

export interface UseCastleRightsReturn {
  castleRights: CastleRights;
  updateCastleRights: (board: BoardState, color: PieceColor) => void;
  reset: () => void;
}

const initialCastleRights = {
  canCastleKingSide: true,
  canCastleQueenSide: true,
  kingSideIsAvailable: false,
  queenSideIsAvailable: false,
};

export function useCastleRights(): UseCastleRightsReturn {
  const [castleRights, setCastleRights] = useState<CastleRights>(initialCastleRights);

  function reset() {
    setCastleRights(initialCastleRights);
  }

  function updateCastleRights(board: BoardState, color: PieceColor) {
    setCastleRights(getCastleRights(board, color));
  }

  return { castleRights, updateCastleRights, reset };
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

  const isQueenSideAttacked = isSquaresAttacked(board, queenSideSquaresAlongPath, color);
  const isKingSideAttacked = isSquaresAttacked(board, kingSideSquaresAlongPath, color);

  if (isQueenSideAttacked) canCastleQueenSide = false;
  if (isKingSideAttacked) canCastleKingSide = false;

  return {
    canCastleQueenSide,
    canCastleKingSide,
    queenSideIsAvailable,
    kingSideIsAvailable,
  };
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
