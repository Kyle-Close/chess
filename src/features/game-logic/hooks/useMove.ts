import { Piece } from '../../../context/board/InitialState';
import {
  MoveMetaData,
  buildMoveMetaData,
} from '../../../helpers/game-core/move-execution/buildMoveMetaData';
import { executeMove } from '../../../helpers/game-core/move-execution/executeMove';
import { getEnPassantCapturedPieceIndex } from '../../../helpers/game-core/board-utility/getEnPassantCapturedPieceIndex';
import { clearSquare } from '../../../helpers/game-core/board-management/clearSquare';
import { isPawnAdvancingTwoSquares } from '../../../helpers/game-core/move-execution/isPawnAdvancingTwoSquares';
import { translatePositionToIndex } from '../../../helpers/game-core/board-utility/translatePositionToIndex';
import { getSquareRank } from '../../../helpers/analysis/board-mapping/getSquareRank';
import { getSquareFile } from '../../../helpers/analysis/board-mapping/getSquareFile';
import { isHalfMoveResetCondition } from '../../../helpers/game-core/move-execution/isHalfMoveResetCondition';
import { handleOpponentCheckState } from '../../../helpers/game-core/move-utility/handleOpponentCheckState';
import { handleEnPassant } from '../../../helpers/game-core/move-utility/handleEnPassant';
import { handleCastle } from '../../../helpers/game-core/move-utility/handleCastle';
import { updateIsValidMove } from '../../../helpers/game-core/move-utility/updateIsValidMove';
import { handlePawnPromotion } from '../../../helpers/game-core/move-utility/handlePawnPromotion';
import { useAppSelector } from '../../game-board/hooks/useBoard';
import { selectCastleRightsById } from '../../../redux/slices/castleRights';
import { usePlayer } from './usePlayer';
import { deepCopyBoard } from '../../../helpers/utilities/deepCopyBoard';
import { getSecondsToIncrement } from '../../../helpers/game-core/move-utility/getSecondsToIncrement';
import { useCastleRights } from './useCastleRights';
import { SquareRank } from 'base/features/game-board/hooks/useSquare';
import { PieceColor, PieceType } from 'base/features/game-board/hooks/usePiece';

export interface UseMoveReturn {
  buildInitMoveMetaData: (piece: Piece, startPos: number, endPos: number) => MoveMetaData | null;
}

export function useMove(): UseMoveReturn {
  const board = useAppSelector((state) => state.board);
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const settings = useAppSelector((state) => state.gameSettings);

  const whitePlayer = usePlayer({ playerId: gameInfo.whitePlayerId });
  const blackPlayer = usePlayer({ playerId: gameInfo.blackPlayerId });

  const { getNewCastleRights } = useCastleRights();

  const activePlayer = whitePlayer.isTurn ? whitePlayer : blackPlayer;
  const waitingPlayer = whitePlayer.isTurn ? blackPlayer : whitePlayer;

  const whiteCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, whitePlayer.castleRightsId)
  );
  const blackCastleRights = useAppSelector((state) =>
    selectCastleRightsById(state, blackPlayer.castleRightsId)
  );

  function buildInitMoveMetaData(
    piece: Piece,
    startPos: number,
    endPos: number
  ): MoveMetaData | null {
    const newBoard = deepCopyBoard(board);
    const moveMetaData = buildMoveMetaData(
      newBoard,
      gameInfo.enPassantSquare,
      activePlayer.id,
      waitingPlayer.id,
      piece,
      startPos,
      endPos
    );

    updateIsValidMove(
      moveMetaData,
      whitePlayer.isTurn ? whiteCastleRights : blackCastleRights,
      gameInfo.enPassantSquare
    );

    if (!moveMetaData.isMoveValid) return null;

    handleSpecialMoves(moveMetaData);
    updateGameState(moveMetaData);

    return moveMetaData;
  }

  function updateGameState(moveMetaData: MoveMetaData) {
    // Update enPassantNotation & enPassantTargetSquare
    handleEnPassant(moveMetaData);

    // Update turn data
    moveMetaData.activePlayerId = activePlayer.id;
    moveMetaData.waitingPlayerId = waitingPlayer.id;

    // Update move counters
    updateMoveCounts(moveMetaData);

    // Update the moveMetaData board with the move being executed
    executeMove(moveMetaData.updatedBoard, moveMetaData.startPosition, moveMetaData.endPosition);

    // Update player castle rights
    const { whiteCastleRights, blackCastleRights } = getNewCastleRights(moveMetaData.updatedBoard);

    moveMetaData.whiteCastleRights = {
      ...whiteCastleRights,
      id: whitePlayer.castleRightsId,
    };
    moveMetaData.blackCastleRights = {
      ...blackCastleRights,
      id: blackPlayer.castleRightsId,
    };

    // Handle pawn promotion (if applicable)
    handlePawnPromotion(moveMetaData);

    // Handle opponent check & checkmate status
    handleOpponentCheckState(
      moveMetaData,
      waitingPlayer,
      whitePlayer.isTurn
        ? { ...whiteCastleRights, id: whitePlayer.id }
        : { ...blackCastleRights, id: blackPlayer.id },
      gameInfo.enPassantSquare
    );

    // Remove any square markings
    moveMetaData.updatedBoard.forEach((square) => {
      square.isCapture = false;
      square.isValidMove = false;
    });
  }

  function handleSpecialMoves(moveMetaData: MoveMetaData) {
    if (moveMetaData.isCastle) handleCastle(moveMetaData);
    if (moveMetaData.piece.type === PieceType.PAWN) handlePawnMoves(moveMetaData);
    else moveMetaData.enPassantSquare = null;
  }

  function updateMoveCounts(moveMetaData: MoveMetaData) {
    // Update game half moves
    moveMetaData.halfMoves = gameInfo.halfMoves + 1;
    if (isHalfMoveResetCondition(moveMetaData.piece, board[moveMetaData.endPosition].isCapture)) {
      moveMetaData.halfMoves = 0;
    }

    // Update game full moves
    if (activePlayer.color === PieceColor.BLACK) moveMetaData.fullMoves += 1;

    // Handle increment when enabled
    if (settings.isIncrement)
      moveMetaData.increment = {
        timerId: activePlayer.timerId,
        secondsToIncrement: getSecondsToIncrement(settings.timeControl),
      };
  }

  function handlePawnMoves(moveMetaData: MoveMetaData) {
    // Handle capture when en passant executed
    if (moveMetaData.isEnPassant) {
      const capturedPawnIndex = getEnPassantCapturedPieceIndex(
        moveMetaData.endPosition,
        moveMetaData.piece.color
      );

      moveMetaData.isCapture = true;
      moveMetaData.capturedPiece = moveMetaData.updatedBoard[capturedPawnIndex].piece;
      clearSquare(moveMetaData.updatedBoard, capturedPawnIndex);
    }

    // Set enPassantSquare or null it
    if (isPawnAdvancingTwoSquares(moveMetaData.startPosition, moveMetaData.endPosition)) {
      const rank = (getSquareRank(moveMetaData.startPosition) +
        (moveMetaData.piece.color === PieceColor.WHITE ? 1 : -1)) as SquareRank;
      const file = getSquareFile(moveMetaData.startPosition);
      const enPassantSquare = translatePositionToIndex(rank, file);
      moveMetaData.enPassantSquare = enPassantSquare;
    } else moveMetaData.enPassantSquare = null;
  }

  return {
    buildInitMoveMetaData,
  };
}
