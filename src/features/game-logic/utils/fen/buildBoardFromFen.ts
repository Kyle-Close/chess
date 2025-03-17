import { Piece, Square } from "base/data/getInitialBoardState";
import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";
import { isPawnInStartPosition } from "../game-checks/isPawnInStartPosition";

export function buildBoardFromFen(fen: string) {
  // The fen position string starts with the 8th rank and goes to the first.
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

  console.warn(fen);
  const board: Square[] = [];
  const ranks = fen.split('/');

  if (ranks.length !== 8) {
    throw new Error("FEN string is malformed. Expected 8 segments.");
  }

  let count = 0;
  for (const rank of ranks) {
    for (const letter of rank) {
      const num = Number(letter);

      if (!isNaN(num) && num > 0) {
        // If it's a number, add empty squares
        for (let k = 0; k < num; k++) {
          board[count] = { piece: null, index: count }
          count++;
        }
      } else {
        // Otherwise, it's a piece
        const piece = convertCharToPiece(letter, count);
        board[count] = { piece, index: count };
        count++;
      }
    }
  }

  return board;
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
  return { pieceType: type, color, hasMoved };
}
