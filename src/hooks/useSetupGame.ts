import { useContext } from 'react';
import { GameState } from '../context/game-state/GameState';
import { buildBoardFromFen } from '../helpers/notation-setup/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/notation-setup/game-setup/parseFenString';
import { PieceColor } from '../enums/PieceColor';
import { getEnPassantTargetSquareFromFen } from '../helpers/notation-setup/game-setup/getEnPassantTargetSquareFromFen';
import { GameSettings } from './useGameSettings';
import { useAppDispatch, useAppSelector } from './useBoard';
import { setupBoard } from '../redux/slices/board';

export function useSetupGame() {
  const board = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const gameState = useContext(GameState);

  /*
      Sets up the following: board, white turn to move, game moves, castle rights, clear en passant square

      REMAINING: player names, time control, increment time on move, undo/redo, fifty-move rule
  */
  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    // Set up board state.
    dispatch(setupBoard(initialBoard));

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

  function setupAndStartGame(settings: GameSettings) {
    setupAndStartGame(settings);
  }

  return { setupFromFEN, setupAndStartGame };
}
