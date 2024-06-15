import { Piece } from '../../context/board/InitialState';
import { PieceType } from '../../enums/PieceType';
import { getSquareNotation } from '../board/getSquareNotation';
import { getPieceFile } from '../generic/pieceLocation';
import { MoveMetaData } from './buildMoveMetaData';
import { CastleMetaData } from './getCastleMetaData';

export function buildChessNotation(moveMetaData: MoveMetaData) {
  // TO-DO:
  // - Disambiguous moves (see wiki)
  // - En Passant notation
  // - Check notation
  // - Checkmate notation

  const pieceNotationLetter = convertPieceToNotationLetter(moveMetaData.piece);
  const squareNotation = getSquareNotation(moveMetaData.endPosition);

  // Handle capture
  if (moveMetaData.isCapture) {
    if (pieceNotationLetter === 'P') {
      if (moveMetaData.promotionPiece)
        return (
          getPieceFile(moveMetaData.startPosition) +
          'x' +
          squareNotation +
          convertPieceToNotationLetter(moveMetaData.promotionPiece)
        );
      return getPieceFile(moveMetaData.startPosition) + 'x' + squareNotation;
    } else {
      return `${pieceNotationLetter}x${squareNotation}`;
    }
  }

  // Handle castle
  if (moveMetaData.isCastle) {
    if (moveMetaData.castleMetaData === CastleMetaData.KING_SIDE) return 'O-O';
    else if (moveMetaData.castleMetaData === CastleMetaData.QUEEN_SIDE) return 'O-O-O';
  }

  // Handle pawn promotion
  if (moveMetaData.isPromotion && moveMetaData.promotionPiece) {
    const promotedPieceNotationLetter = convertPieceToNotationLetter(
      moveMetaData.promotionPiece
    );
    return pieceNotationLetter + squareNotation + promotedPieceNotationLetter;
  }

  // Handle standard pawn move (not a capture, en passant or promotion)
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
