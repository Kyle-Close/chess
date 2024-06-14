import { BoardState, Piece } from '../../context/board/InitialState';
import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';
import { checkIsCapture } from '../board/checkIfCapture';
import { getSquareNotation } from '../board/getSquareNotation';
import { getPieceFile } from '../generic/pieceLocation';
import { isMoveCastle } from './isMoveCastle';

export function buildChessNotation(
  board: BoardState,
  piece: Piece,
  startPos: number,
  endPos: number,
  opponentColor: PieceColor
) {
  // TO-DO:
  // - Disambiguous moves (see wiki)
  // - Castling notation
  // - En Passant notation
  // - Check notation
  // - Checkmate notation
  // - special cases (very rare)
  const pieceNotationLetter = convertPieceToNotationLetter(piece);
  const squareNotation = getSquareNotation(endPos);

  // Handle capture
  const isCapture = checkIsCapture(board, endPos, opponentColor);
  if (isCapture) {
    if (pieceNotationLetter === 'P') {
      return getPieceFile(startPos) + 'x' + squareNotation;
    } else {
      return `${pieceNotationLetter}x${squareNotation}`;
    }
  }

  // Handle castle
  const castleMove = isMoveCastle(piece, startPos, endPos);
  if (castleMove) {
    if (castleMove === 'KING_SIDE') return 'O-O';
    else if (castleMove === 'QUEEN_SIDE') return 'O-O-O';
  }

  // Handle pawn move
  if (pieceNotationLetter === 'P') return squareNotation;
  else return pieceNotationLetter + squareNotation;
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
