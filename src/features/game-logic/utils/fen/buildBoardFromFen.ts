import { BoardState, Piece } from "base/data/getInitialBoardState";
import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";
import { isNumber } from "base/utils/isNumber";
import { isPawnInStartPosition } from "../game-checks/isPawnInStartPosition";

export function buildBoardFromFen(fenPositionString: string) {
  // The fen position string starts with the 8th rank and goes to the first.
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

  const ranks = fenPositionString.split('/');
  if (ranks.length !== 8) throw Error('FEN position string must include exactly 8 ranks.');

  const initialBoard: BoardState = [];

  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < ranks[i].length; j++) {
      const char = ranks[i][j];
      if (isNumber(char)) {
        pushEmptySquares(Number(char), initialBoard);
      } else {
        const index = (7 - i) * 8 + j;
        const piece = convertCharToPiece(char, index);
        initialBoard.push({ piece, isValidMove: false, isCapture: false });
      }
    }
  }
  return initialBoard;
}

function convertCharToPiece(char: string, index: number): Piece {
  switch (char) {
    case 'P':
      return buildPiece(
        PieceType.PAWN,
        PieceColor.WHITE,
        !isPawnInStartPosition(PieceColor.WHITE, index)
      );
    case 'p':
      return buildPiece(
        PieceType.PAWN,
        PieceColor.BLACK,
        !isPawnInStartPosition(PieceColor.BLACK, index)
      );
    case 'R':
      return buildPiece(PieceType.ROOK, PieceColor.WHITE, false);
    case 'r':
      return buildPiece(PieceType.ROOK, PieceColor.BLACK, false);
    case 'N':
      return buildPiece(PieceType.KNIGHT, PieceColor.WHITE, false);
    case 'n':
      return buildPiece(PieceType.KNIGHT, PieceColor.BLACK, false);
    case 'B':
      return buildPiece(PieceType.BISHOP, PieceColor.WHITE, false);
    case 'b':
      return buildPiece(PieceType.BISHOP, PieceColor.BLACK, false);
    case 'Q':
      return buildPiece(PieceType.QUEEN, PieceColor.WHITE, false);
    case 'q':
      return buildPiece(PieceType.QUEEN, PieceColor.BLACK, false);
    case 'K':
      return buildPiece(PieceType.KING, PieceColor.WHITE, false);
    case 'k':
      return buildPiece(PieceType.KING, PieceColor.BLACK, false);

    default:
      throw Error(`Character ${char} is not a valid piece.`);
  }
}

function buildPiece(type: PieceType, color: PieceColor, hasMoved: boolean): Piece {
  return { type, color, hasMoved };
}

function pushEmptySquares(count: number, board: BoardState) {
  for (let i = 0; i < count; i++) board.push({ piece: null, isCapture: false, isValidMove: false });
}
