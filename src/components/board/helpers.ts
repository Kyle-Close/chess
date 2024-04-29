import { Pieces } from '../../enums/Pieces';

export function getPieceAbbreviation(piece: Pieces) {
  if (piece === Pieces.PAWN_BL || piece === Pieces.PAWN_WH) return 'P';
  else if (piece === Pieces.ROOK_BL || piece === Pieces.ROOK_WH) return 'R';
  else if (piece === Pieces.KNIGHT_BL || piece === Pieces.KNIGHT_WH) return 'N';
  else if (piece === Pieces.BISHOP_BL || piece === Pieces.BISHOP_WH) return 'B';
  else if (piece === Pieces.QUEEN_BL || piece === Pieces.QUEEN_WH) return 'Q';
  else if (piece === Pieces.KING_BL || piece === Pieces.KING_WH) return 'K';
  else return '';
}
