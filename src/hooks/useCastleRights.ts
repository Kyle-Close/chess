import { PieceColor } from '../enums/PieceColor';
import { getKingIndex } from '../helpers/analysis/game-checks/getKingIndex';
import { BoardState } from '../context/board/InitialState';
import { isSquaresAttacked } from '../helpers/game-core/move-utility/isSquaresAttacked';
import { isPathObstructed } from '../helpers/game-core/move-utility/isPathObstructed';
import { useAppDispatch } from './useBoard';
import { CastleRights, setCastleRights } from '../redux/slices/castleRights';

export interface UseCastleRightsReturn {
  updateCastleRights: (board: BoardState, color: PieceColor) => void;
  reset: () => void;
}

export const initialCastleRights = {
  canCastleKingSide: true,
  canCastleQueenSide: true,
  kingSideIsAvailable: false,
  queenSideIsAvailable: false,
};

interface UseCastleRightsProps {
  id: string;
}

export function useCastleRights({ id }: UseCastleRightsProps): UseCastleRightsReturn {
  const dispatch = useAppDispatch();

  function reset() {
    dispatch(setCastleRights({ castleRights: { ...initialCastleRights, id } }));
  }

  function updateCastleRights(board: BoardState, color: PieceColor) {
    const newCastleRights = getCastleRights(board, color);
    dispatch(setCastleRights({ castleRights: { ...newCastleRights, id } }));
  }

  return { updateCastleRights, reset };
}

function getCastleRights(board: BoardState, color: PieceColor): Omit<CastleRights, 'id'> {
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
  if (color === PieceColor.WHITE) return [56, 57, 58, 59, 60];
  else return [0, 1, 2, 3, 4];
}

function getKingSideSquaresAlongPath(color: PieceColor) {
  if (color === PieceColor.WHITE) return [60, 61, 62, 63];
  else return [4, 5, 6, 7];
}

function getQueenSideRookSquare(board: BoardState, color: PieceColor) {
  if (color === PieceColor.WHITE) return board[56];
  else return board[0];
}

function getKingSideRookSquare(board: BoardState, color: PieceColor) {
  if (color === PieceColor.WHITE) return board[63];
  else return board[7];
}
