import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/game-setup/parseFenString';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceColor } from '../enums/PieceColor';
import { getPlayerCastleRightsFromFen } from '../helpers/game-setup/getPlayerCastleRightsFromFen';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { board, initializeBoard } = useContext(BoardContext);

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    // Set up board state.
    initializeBoard(initialBoard);

    // Set game half turns
    gameState.updateTurn(Number(fenSegments.halfMoves));

    // Set player castle rights
    gameState.whitePlayer.castleRights = getPlayerCastleRightsFromFen(
      fenSegments.castleRights,
      PieceColor.WHITE
    );
    gameState.blackPlayer.castleRights = getPlayerCastleRightsFromFen(
      fenSegments.castleRights,
      PieceColor.BLACK
    );
  }

  function buildFenFromGame() {
    const currentPlayer = gameState.getCurrentTurnPlayer();
    const opponent = gameState.getCurrentTurnOpponent();
    const white = currentPlayer.color === PieceColor.WHITE ? currentPlayer : opponent;
    const black = currentPlayer.color === PieceColor.BLACK ? currentPlayer : opponent;

    const fenString = buildFenStringFromGame(
      board,
      currentPlayer.color,
      '-',
      white.castleRights,
      black.castleRights,
      gameState.turn
    );
    console.log(fenString);
  }

  return { setupFromFEN, buildFenFromGame };
}
