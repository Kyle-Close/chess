import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";
import { buildFenCastleSegment } from "./buildFenCastleSegment";
import { CastleRights } from "base/redux/slices/castleRights";
import { MoveMetaData } from "../move-execution/buildMoveMetaData";
import { BoardState, Piece } from "base/data/getInitialBoardState";

export function buildFenStringFromGame(
  moveMetaData: MoveMetaData,
  whiteCastleRights: CastleRights,
  blackCastleRights: CastleRights
) {
  const piecePlacementString = buildPiecePlacementString(moveMetaData.updatedBoard);
  const color = moveMetaData.piece.color === PieceColor.WHITE ? 'b' : 'w';
  const castleSegment = buildFenCastleSegment(whiteCastleRights, blackCastleRights);

  return `${piecePlacementString} ${color} ${castleSegment} ${moveMetaData.enPassantNotation} ${moveMetaData.halfMoves} ${moveMetaData.fullMoves}`;
}

function buildPiecePlacementString(board: BoardState) {
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  let fenString = '';

  for (let i = 0; i < 8; i++) {
    let consecutiveEmptySquares = 0;

    for (let j = 0; j < 8; j++) {
      const index = i * 8 + j;
      const square = board[index];

      if (square.piece !== null) {
        if (consecutiveEmptySquares !== 0) {
          fenString += consecutiveEmptySquares;
          consecutiveEmptySquares = 0;
        }
        fenString += convertPieceToChar(square.piece);
      } else {
        consecutiveEmptySquares += 1;
      }
    }
    if (consecutiveEmptySquares !== 0) fenString += consecutiveEmptySquares;
    if (i !== 7) fenString += '/';
  }

  return fenString;
}

function convertPieceToChar(piece: Piece) {
  let letter = '';
  switch (piece.type) {
    case PieceType.PAWN:
      letter = 'p';
      break;
    case PieceType.ROOK:
      letter = 'r';
      break;
    case PieceType.KNIGHT:
      letter = 'n';
      break;
    case PieceType.BISHOP:
      letter = 'b';
      break;
    case PieceType.QUEEN:
      letter = 'q';
      break;
    case PieceType.KING:
      letter = 'k';
      break;
    default:
      throw Error('Unknown piece encountered.');
  }

  if (piece.color === PieceColor.WHITE) return letter.toUpperCase();
  else return letter;
}
