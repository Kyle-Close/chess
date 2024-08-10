import { BoardState, Piece } from '../../../context/board/InitialState';
import { initialCastleRights } from '../../../hooks/useCastleRights';
import { CastleRights } from '../../../redux/slices/castleRights';
import { getCapturedPiece } from '../piece-management/getCapturedPiece';
import { CastleMetaData, getCastleMetaData } from './getCastleMetaData';
import { isMoveCapture } from './isMoveCapture';
import { isMoveCastle } from './isMoveCastle';
import { isMoveEnPassant } from './isMoveEnPassant';
import { isMovePawnPromotion } from './isMovePawnPromotion';

interface Increment {
  timerId: string;
  secondsToIncrement: number;
}
export interface MoveMetaData {
  activePlayerId: string;
  waitingPlayerId: string;
  isMoveValid: boolean;
  piece: Piece;
  isCheck: boolean; // Indicates if this move puts opponent in check
  isCheckmate: boolean;
  isEnPassant: boolean;
  enPassantSquare: number | null;
  enPassantNotation: string;
  isCastle: boolean;
  castleMetaData: CastleMetaData | null;
  isPromotion: boolean;
  promotionPiece: Piece | null;
  isCapture: boolean;
  capturedPiece: Piece | null;
  startPosition: number;
  endPosition: number;
  updatedBoard: BoardState;
  activeCastleRights: CastleRights;
  waitingCastleRights: CastleRights;
  halfMoves: number;
  fullMoves: number;
  increment: Increment | null;
}

export function buildMoveMetaData(
  board: BoardState,
  enPassantSquare: number | null,
  activePlayerId: string,
  waitingPlayerId: string,
  piece: Piece,
  startPosition: number,
  endPosition: number
): MoveMetaData {
  const isEnPassant = isMoveEnPassant(piece, endPosition, enPassantSquare);
  const isCastle = isMoveCastle(piece, startPosition, endPosition);
  const castleMetaData = isCastle ? getCastleMetaData(piece, startPosition, endPosition) : null;
  const isPromotion = isMovePawnPromotion(piece, endPosition);
  const isCapture = isMoveCapture(board, endPosition);
  const capturedPiece = getCapturedPiece(board, endPosition);
  const isMoveValid = false;
  const initCastleRights = { ...initialCastleRights, id: '' };

  return {
    activePlayerId,
    waitingPlayerId,
    isMoveValid,
    isCheck: false,
    isCheckmate: false,
    piece,
    isEnPassant,
    enPassantSquare,
    enPassantNotation: '-',
    isCastle,
    castleMetaData,
    isPromotion,
    promotionPiece: null,
    isCapture,
    capturedPiece,
    startPosition,
    endPosition,
    updatedBoard: [...board],
    activeCastleRights: initCastleRights,
    waitingCastleRights: initCastleRights,
    halfMoves: 0,
    fullMoves: 1,
    increment: null,
  };
}
