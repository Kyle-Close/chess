import { Square } from "base/zod/SquareSchema";
import { getSquareFile } from "./getSquareFile";
import { getSquareRank } from "./getSquareRank";
import { Piece } from "base/zod/PieceSchema";
import { PieceType } from "base/zod/emums/PieceType";
import { Color } from "base/zod/emums/Color";

export function buildBoardFromFen(fen: string) {
  // The fen position string starts with the 8th rank and goes to the first.
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

  const squares: Square[] = [];
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
          squares[count] = { index: count, file: getSquareFile(count), rank: getSquareRank(count) }
          count++;
        }
      } else {
        // Otherwise, it's a piece
        const piece = convertCharToPiece(letter);
        squares[count] = { piece, index: count, file: getSquareFile(count), rank: getSquareRank(count) };
        count++;
      }
    }
  }

  return squares;
}

function convertCharToPiece(char: string): Piece {
  switch (char) {
    case 'P':
      return buildPiece(PieceType.PAWN, Color.WHITE, false);
    case 'p':
      return buildPiece(PieceType.PAWN, Color.BLACK, false);
    case 'R':
      return buildPiece(PieceType.ROOK, Color.WHITE, false);
    case 'r':
      return buildPiece(PieceType.ROOK, Color.BLACK, false);
    case 'N':
      return buildPiece(PieceType.KNIGHT, Color.WHITE, false);
    case 'n':
      return buildPiece(PieceType.KNIGHT, Color.BLACK, false);
    case 'B':
      return buildPiece(PieceType.BISHOP, Color.WHITE, false);
    case 'b':
      return buildPiece(PieceType.BISHOP, Color.BLACK, false);
    case 'Q':
      return buildPiece(PieceType.QUEEN, Color.WHITE, false);
    case 'q':
      return buildPiece(PieceType.QUEEN, Color.BLACK, false);
    case 'K':
      return buildPiece(PieceType.KING, Color.WHITE, false);
    case 'k':
      return buildPiece(PieceType.KING, Color.BLACK, false);

    default:
      throw Error(`Character ${char} is not a valid piece.`);
  }
}

function buildPiece(type: PieceType, color: Color, hasMoved: boolean): Piece {
  return { pieceType: type, color, hasMoved, index: -1, validMoves: [] };
}
