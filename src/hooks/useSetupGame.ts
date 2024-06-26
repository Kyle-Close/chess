import { useContext } from 'react';
import { GameState } from '../context/game-state/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/notation-setup/game-setup/parseFenString';
import { PieceColor } from '../enums/PieceColor';
import { getEnPassantTargetSquareFromFen } from '../helpers/notation-setup/game-setup/getEnPassantTargetSquareFromFen';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { initializeBoard, board } = useContext(BoardContext);

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
    gameState.whitePlayer.castleRights.updateCastleRights(board, PieceColor.WHITE);
    gameState.blackPlayer.castleRights.updateCastleRights(board, PieceColor.BLACK);

    // Set en passant target square
    const enPassantTargetSquare = getEnPassantTargetSquareFromFen(fenSegments.enPassant);
    gameState.updateEnPassantSquare(enPassantTargetSquare);
  }

  return { setupFromFEN };
}
