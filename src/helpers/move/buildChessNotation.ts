import { Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { getSquareNotation } from '../notation-setup/fen-management/getSquareNotation';
import { getPieceFile } from '../generic/pieceLocation';
import { MoveMetaData } from './buildMoveMetaData';
import { CastleMetaData } from './getCastleMetaData';

export function buildChessNotation(moveMetaData: MoveMetaData) {
  // TO-DO:
  // - Disambiguous moves (see wiki)

  const pieceNotationLetter = convertPieceToNotationLetter(moveMetaData.piece);
  const startSquareFile = getPieceFile(moveMetaData.startPosition);
  const endSquareNotation = getSquareNotation(moveMetaData.endPosition);
  let checkNotation = moveMetaData.isCheck ? '+' : '';
  if (moveMetaData.isCheckmate) checkNotation = '#';

  // Handle capture
  if (moveMetaData.isCapture) {
    if (moveMetaData.isEnPassant)
      return `${startSquareFile}x${endSquareNotation} e.p.${checkNotation}`;

    if (pieceNotationLetter === 'P') {
      if (moveMetaData.promotionPiece)
        return `${startSquareFile}x${endSquareNotation}${convertPieceToNotationLetter(
          moveMetaData.promotionPiece
        )}${checkNotation}`;

      return startSquareFile + 'x' + endSquareNotation + checkNotation;
    } else {
      return `${pieceNotationLetter}x${endSquareNotation}${checkNotation}`;
    }
  }

  // Handle castle
  if (moveMetaData.isCastle) {
    if (moveMetaData.castleMetaData === CastleMetaData.KING_SIDE)
      return 'O-O' + checkNotation;
    else if (moveMetaData.castleMetaData === CastleMetaData.QUEEN_SIDE)
      return 'O-O-O' + checkNotation;
  }

  // Handle pawn promotion
  if (moveMetaData.isPromotion && moveMetaData.promotionPiece) {
    const promotedPieceNotationLetter = convertPieceToNotationLetter(
      moveMetaData.promotionPiece
    );
    return (
      pieceNotationLetter +
      endSquareNotation +
      promotedPieceNotationLetter +
      checkNotation
    );
  }

  // Handle standard pawn move (not a capture, en passant or promotion)
  if (pieceNotationLetter === 'P') return endSquareNotation + checkNotation;
  else return pieceNotationLetter + endSquareNotation + checkNotation;
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
