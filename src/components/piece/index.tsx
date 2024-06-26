import { Piece as PieceInterface } from '../../context/board/InitialState';
import pawnWhite from '../../assets/white-pawn.png';
import rookWhite from '../../assets/white-rook.png';
import knightWhite from '../../assets/white-knight.png';
import bishopWhite from '../../assets/white-bishop.png';
import queenWhite from '../../assets/white-queen.png';
import kingWhite from '../../assets/white-king.png';
import pawnBlack from '../../assets/black-pawn.png';
import rookBlack from '../../assets/black-rook.png';
import knightBlack from '../../assets/black-knight.png';
import bishopBlack from '../../assets/black-bishop.png';
import blackQueen from '../../assets/black-queen.png';
import blackKing from '../../assets/black-king.png';

import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';

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
  return <img className='sm:max-h-8 md:max-h-10 md:max-w-10 bg-opacity-100' src={getPieceSrc()} />;
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
