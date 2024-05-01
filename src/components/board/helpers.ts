import { Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';

export function getPieceAbbreviation(piece: Piece | null) {
  if (piece === null) return '';
  else if (piece.type === PieceType.PAWN) return 'P';
  else if (piece.type === PieceType.ROOK) return 'R';
  else if (piece.type === PieceType.KNIGHT) return 'N';
  else if (piece.type === PieceType.BISHOP) return 'B';
  else if (piece.type === PieceType.QUEEN) return 'Q';
  else if (piece.type === PieceType.KING) return 'K';
}
