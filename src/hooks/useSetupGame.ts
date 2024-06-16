import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/game-setup/building/buildBoardFromFen';
import { parseFenString } from '../helpers/game-setup/parsing/parseFenString';
import { PieceColor } from '../enums/PieceColor';
import { getPlayerCastleRightsFromFen } from '../helpers/game-setup/building/getPlayerCastleRightsFromFen';
import { getEnPassantTargetSquareFromFen } from '../helpers/game-setup/building/getEnPassantTargetSquareFromFen';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { initializeBoard } = useContext(BoardContext);

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    // Set up board state.
    initializeBoard(initialBoard);

    // Set turn
    if (fenSegments.turn === 'w' && !gameState.isWhiteTurn) gameState.toggleTurn();
    else if (fenSegments.turn === 'b' && gameState.isWhiteTurn) gameState.toggleTurn();

    // Set game half moves
    gameState.move.updateHalfMoves(Number(fenSegments.halfMoves));

    // Set game full moves
    gameState.move.updateFullMoves(Number(fenSegments.fullMoves));

    // Set player castle rights
    gameState.whitePlayer.castleRights = getPlayerCastleRightsFromFen(
      fenSegments.castleRights,
      PieceColor.WHITE
    );
    gameState.blackPlayer.castleRights = getPlayerCastleRightsFromFen(
      fenSegments.castleRights,
      PieceColor.BLACK
    );

    // Set en passant target square
    const enPassantTargetSquare = getEnPassantTargetSquareFromFen(fenSegments.enPassant);
    gameState.updateEnPassantSquare(enPassantTargetSquare);
  }

  return { setupFromFEN };
}
