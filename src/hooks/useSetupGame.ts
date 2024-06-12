import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/game-setup/parseFenString';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceColor } from '../enums/PieceColor';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { board, initializeBoard } = useContext(BoardContext);

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    initializeBoard(initialBoard);
    gameState.updateTurn(Number(fenSegments.halfMoves));

    // Update player castle rights
    const; // TO-DO: use the getPlayerCastleRightsFromFen fn I made
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
