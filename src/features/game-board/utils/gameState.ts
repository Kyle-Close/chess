import { Game } from 'base/zod/GameSchema';
import { Color } from 'base/zod/emums/Color';
import { GameStatus } from 'base/zod/emums/GameStatus';
import { GameType } from 'base/zod/emums/GameType';
import { PieceType } from 'base/zod/emums/PieceType';

export function isGamePlaying(game: Game) {
  return game.status === GameStatus.ONGOING || game.status === GameStatus.IN_CHECK;
}

export function isDrawStatus(status: GameStatus) {
  return (
    status === GameStatus.DRAW_BY_AGREEMENT ||
    status === GameStatus.DRAW_STALEMATE ||
    status === GameStatus.DRAW_INSUFFICIENT_MATERIAL ||
    status === GameStatus.DRAW_FIFTY_MOVE_RULE ||
    status === GameStatus.DRAW_THREE_FOLD_REPETITION
  );
}

export function getGameOverReason(status: GameStatus) {
  switch (status) {
    case GameStatus.CHECKMATE:
      return 'Checkmate';
    case GameStatus.DRAW_BY_AGREEMENT:
      return 'Draw by agreement';
    case GameStatus.DRAW_STALEMATE:
      return 'Stalemate';
    case GameStatus.DRAW_INSUFFICIENT_MATERIAL:
      return 'Insufficient material';
    case GameStatus.DRAW_FIFTY_MOVE_RULE:
      return 'Fifty-move rule';
    case GameStatus.DRAW_THREE_FOLD_REPETITION:
      return 'Threefold repetition';
    case GameStatus.RESIGNATION:
      return 'Resignation';
    case GameStatus.TIMEOUT:
      return 'Time out';
    default:
      return '';
  }
}

export const opposite = (color: Color) => (color === Color.WHITE ? Color.BLACK : Color.WHITE);

/** The color controlled by the person at the screen, or null for pass-and-play */
export function getHumanColor(game: Game): Color | null {
  if (game.type === GameType.STOCKFISH && game.stockfishInfo) return opposite(game.stockfishInfo.playingAs);
  return null;
}

/**
 * Whether black should be shown at the bottom. Local games follow the side to move so each
 * player sees the board from their own perspective; engine games follow the human's color.
 */
export function getDefaultFlipped(game: Game) {
  const human = getHumanColor(game);
  if (human !== null) return human === Color.BLACK;
  if (game.type === GameType.LOCAL) return game.activeColor === Color.BLACK;
  return false;
}

export function findKing(game: Game, color: Color) {
  const square = game.board.squares.find(
    (s) => s.piece?.pieceType === PieceType.KING && s.piece.color === color
  );
  return square ? square.index : null;
}

interface MoveInput {
  start: number;
  end: number;
  promotionPiece?: PieceType;
}

/**
 * Applies a move locally so the board responds instantly while the server validates it.
 * Legal-move lists are emptied so nothing can be played until the authoritative game arrives.
 * Turn, clocks and history are left untouched - the server response owns those.
 */
export function applyOptimisticMove(game: Game, { start, end, promotionPiece }: MoveInput): Game {
  const squares = game.board.squares.map((s) => ({
    ...s,
    piece: s.piece ? { ...s.piece, validMoves: [] } : null,
  }));

  const moving = squares[start].piece;
  const meta = game.board.squares[start].piece?.validMoves.find((m) => m.endIndex === end);
  if (!moving || !meta) return game;

  const place = (from: number, to: number) => {
    const piece = squares[from].piece;
    squares[to] = { ...squares[to], piece: piece ? { ...piece, index: to, hasMoved: true } : null };
    squares[from] = { ...squares[from], piece: null };
  };

  place(start, end);

  if (meta.isEnPassantCapture) {
    const capturedIndex = end + (moving.color === Color.WHITE ? 8 : -8);
    squares[capturedIndex] = { ...squares[capturedIndex], piece: null };
  }

  if (meta.isCastle) {
    const kingSide = end > start;
    const rookFrom = kingSide ? end + 1 : end - 2;
    const rookTo = kingSide ? end - 1 : end + 1;
    place(rookFrom, rookTo);
  }

  if (meta.isPromotion && promotionPiece !== undefined) {
    const promoted = squares[end].piece!;
    squares[end] = { ...squares[end], piece: { ...promoted, pieceType: promotionPiece } };
  }

  return { ...game, board: { squares }, lastMoveMetaData: meta };
}
