import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { isPawnInStartPosition } from '../board/isPawnInStartPosition';
import { isNumber } from '../generic/isNumber';

export function buildBoardFromFen(fenPositionString: string) {
  // The fen position string starts with the 8th rank and goes to the first.
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

  const ranks = fenPositionString.split('/');
  if (ranks.length !== 8)
    throw Error('FEN position string must include exactly 8 ranks.');

  const initialBoard: BoardState = [];

  for (let i = ranks.length - 1; i >= 0; i--) {
    for (let j = 0; j < ranks[i].length; j++) {
      const char = ranks[i][j];
      if (isNumber(char)) {
        console.log('something');
      } else {
        const piece = convertCharToPiece(char);
      }
    }
  }
}

function convertCharToPiece(char: string, index: number): Piece {
  // Only care if pawn is has moved. check if it's in correct start position.
  switch (char) {
    case 'P':
      return buildPiece(
        PieceType.PAWN,
        PieceColor.WHITE,
        isPawnInStartPosition(PieceColor.WHITE, index)
      );

    default:
      throw Error(`Character ${char} is not a valid piece.`);
  }
}

function buildPiece(type: PieceType, color: PieceColor, hasMoved: boolean): Piece {
  return { type, color, hasMoved };
}
