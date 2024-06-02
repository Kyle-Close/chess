import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { checkIsCapture } from '../board/checkIfCapture';
import { getSquareNotation } from '../board/getSquareNotation';
import { getPieceFile } from '../generic/pieceLocation';

export function buildChessNotation(
  board: BoardState,
  piece: Piece,
  startPos: number,
  endPos: number,
  opponentColor: PieceColor
) {
  // TO-DO:
  // - Castling notation
  // - En Passant notation
  // - Check notation
  // - Checkmate notation
  // - special cases (very rare)
  const pieceNotationLetter = convertPieceToNotationLetter(piece);
  const moveNotation = getSquareNotation(endPos);
  const isCapture = checkIsCapture(board, endPos, opponentColor);

  if (isCapture) {
    if (pieceNotationLetter === 'P') {
      return getPieceFile(endPos) + 'x' + moveNotation;
    } else {
      return `${pieceNotationLetter}x${moveNotation}`;
    }
  }

  if (pieceNotationLetter === 'P') return moveNotation;
  else return pieceNotationLetter + moveNotation;
}

function convertPieceToNotationLetter(piece: Piece) {
  switch (piece.type) {
    case PieceType.PAWN:
      return 'P';
    case PieceType.ROOK:
      return 'R';
    case PieceType.BISHOP:
      return 'B';
    case PieceType.KNIGHT:
      return 'N';
    case PieceType.QUEEN:
      return 'Q';
    case PieceType.KING:
      return 'K';

    default:
      throw Error(`Unknown piece ${piece.type} encountered.`);
  }
}
