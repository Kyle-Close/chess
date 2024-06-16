import { GameState } from '../../../context/GameState';
import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { MoveMetaData } from '../../move/execution/buildMoveMetaData';
import { buildFenCastleSegment } from './buildFenCastleSegment';

export function buildFenStringFromGame(
  gameState: GameState,
  moveMetaData: MoveMetaData,
  isBlackTurnEnding: boolean,
  enPassantAlgebraicNotation: string
) {
  console.log(gameState);
  const piecePlacementString = buildPiecePlacementString(moveMetaData.updatedBoard);
  const color = gameState.isWhiteTurn === true ? 'b' : 'w';
  const castleSegment = buildFenCastleSegment(
    gameState.whitePlayer.castleRights,
    gameState.blackPlayer.castleRights
  );
  const fullMoves = isBlackTurnEnding
    ? gameState.move.fullMoves + 2
    : gameState.move.fullMoves + 1;

  return `${piecePlacementString} ${color} ${castleSegment} ${enPassantAlgebraicNotation} ${gameState.move.halfMoves} ${fullMoves}`;
}

function buildPiecePlacementString(board: BoardState) {
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  let fenString = '';

  for (let i = 7; i >= 0; i--) {
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
    if (i !== 0) fenString += '/';
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
