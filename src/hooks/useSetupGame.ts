import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/game-setup/parseFenString';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { board, initializeBoard } = useContext(BoardContext);

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    initializeBoard(initialBoard);
    gameState.updateTurn(Number(fenSegments.halfMoves));
  }

  function buildFenFromGame() {
    const currentPlayer = gameState.getCurrentTurnPlayer();
    const fenString = buildFenStringFromGame(
      board,
      currentPlayer.color,
      '-',
      '-',
      gameState.turn
    );
    console.log(fenString);
  }

  return { setupFromFEN, buildFenFromGame };
}