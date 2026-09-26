import { Color } from 'base/zod/emums/Color';
import { PieceType } from 'base/zod/emums/PieceType';

import wP from 'base/assets/pieces/wP.svg';
import wN from 'base/assets/pieces/wN.svg';
import wB from 'base/assets/pieces/wB.svg';
import wR from 'base/assets/pieces/wR.svg';
import wQ from 'base/assets/pieces/wQ.svg';
import wK from 'base/assets/pieces/wK.svg';
import bP from 'base/assets/pieces/bP.svg';
import bN from 'base/assets/pieces/bN.svg';
import bB from 'base/assets/pieces/bB.svg';
import bR from 'base/assets/pieces/bR.svg';
import bQ from 'base/assets/pieces/bQ.svg';
import bK from 'base/assets/pieces/bK.svg';

// Indexed by PieceType: PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING
const WHITE = [wP, wN, wB, wR, wQ, wK];
const BLACK = [bP, bN, bB, bR, bQ, bK];

const NAMES = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

export function getPieceSrc(pieceType: PieceType, color: Color) {
  return color === Color.WHITE ? WHITE[pieceType] : BLACK[pieceType];
}

export function getPieceName(pieceType: PieceType, color: Color) {
  return `${color === Color.WHITE ? 'white' : 'black'} ${NAMES[pieceType]}`;
}
