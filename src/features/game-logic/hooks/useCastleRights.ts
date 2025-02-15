import { BoardState } from 'base/data/getInitialBoardState';
import { useAppDispatch } from 'base/features/game-board/hooks/useBoard';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';
import { CastleRights, setCastleRights } from 'base/redux/slices/castleRights';
import { getKingIndex } from '../utils/game-checks/getKingIndex';
import { isPathObstructed } from '../utils/move-utility/isPathObstructed';
import { isSquaresAttacked } from '../utils/move-utility/isSquaresAttacked';

interface NewCastleRightsReturn {
  whiteCastleRights: Omit<CastleRights, 'id'>;
  blackCastleRights: Omit<CastleRights, 'id'>;
}

export interface UseCastleRightsReturn {
  updateCastleRights: (
    newCastleRights: NewCastleRightsReturn,
    whiteCastleRightsId: string,
    blackCastleRightsId: string
  ) => void;
  reset: (castleRightsId: string) => void;
  getNewCastleRights: (board: BoardState) => NewCastleRightsReturn;
}

export const initialCastleRights = {
  canCastleKingSide: true,
  canCastleQueenSide: true,
  kingSideIsAvailable: false,
  queenSideIsAvailable: false,
};

export function useCastleRights(): UseCastleRightsReturn {
  const dispatch = useAppDispatch();

  function reset(castleRightsId: string) {
    dispatch(setCastleRights({ castleRights: { ...initialCastleRights, id: castleRightsId } }));
  }

  function updateCastleRights(
    newCastleRights: NewCastleRightsReturn,
    whiteCastleRightsId: string,
    blackCastleRightsId: string
  ) {
    const { whiteCastleRights, blackCastleRights } = newCastleRights;
    dispatch(setCastleRights({ castleRights: { ...whiteCastleRights, id: whiteCastleRightsId } }));
    dispatch(setCastleRights({ castleRights: { ...blackCastleRights, id: blackCastleRightsId } }));
  }

  function getNewCastleRights(board: BoardState): NewCastleRightsReturn {
    const whiteCastleRights = getCastleRights(board, PieceColor.WHITE);
    const blackCastleRights = getCastleRights(board, PieceColor.BLACK);
    return { whiteCastleRights, blackCastleRights };
  }

  return { updateCastleRights, reset, getNewCastleRights };
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
