
//import pawnWhite from 'base/assets/white-pawn.png';
import pawnWhite from 'base/assets/white-pawn.png';
import rookWhite from 'base/assets/white-rook.png';
import knightWhite from 'base/assets/white-knight.png';
import bishopWhite from 'base/assets/white-bishop.png';
import queenWhite from 'base/assets/white-queen.png';
import kingWhite from 'base/assets/white-king.png';
import pawnBlack from 'base/assets/black-pawn.png';
import rookBlack from 'base/assets/black-rook.png';
import knightBlack from 'base/assets/black-knight.png';
import bishopBlack from 'base/assets/black-bishop.png';
import blackQueen from 'base/assets/black-queen.png';
import blackKing from 'base/assets/black-king.png';

import { PieceColor, PieceType } from '../hooks/usePiece';
import { Piece as PieceInterface } from 'base/data/getInitialBoardState';

interface PieceProps {
  piece: PieceInterface;
}

export function Piece({ piece }: PieceProps) {
  const getPieceSrc = () => {
    if (piece.color === PieceColor.WHITE) {
      if (piece.type === PieceType.PAWN) return pieceSrc.pawnWhite;
      else if (piece.type === PieceType.ROOK) return pieceSrc.rookWhite;
      else if (piece.type === PieceType.KNIGHT) return pieceSrc.knightWhite;
      else if (piece.type === PieceType.BISHOP) return pieceSrc.bishopWhite;
      else if (piece.type === PieceType.QUEEN) return pieceSrc.queenWhite;
      else if (piece.type === PieceType.KING) return pieceSrc.kingWhite;
    } else {
      if (piece.type === PieceType.PAWN) return pieceSrc.pawnBlack;
      else if (piece.type === PieceType.ROOK) return pieceSrc.rookBlack;
      else if (piece.type === PieceType.KNIGHT) return pieceSrc.knightBlack;
      else if (piece.type === PieceType.BISHOP) return pieceSrc.bishopBlack;
      else if (piece.type === PieceType.QUEEN) return pieceSrc.blackQueen;
      else if (piece.type === PieceType.KING) return pieceSrc.blackKing;
    }
  };
  return <img className={getPieceClasses()} src={getPieceSrc()} />;
}

function getPieceClasses(isShowWhiteOnBottom = false) {
  // bg-opacity-100
  const responsive = ['max-h-6', 'xs:max-h-8', 'md:max-h-10'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...responsive, ...flipped].join(' ');
}

const pieceSrc = {
  pawnWhite,
  rookWhite,
  knightWhite,
  bishopWhite,
  queenWhite,
  kingWhite,
  pawnBlack,
  rookBlack,
  knightBlack,
  bishopBlack,
  blackQueen,
  blackKing,
};
