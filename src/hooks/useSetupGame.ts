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

    console.log('FEN Board: \n', initialBoard);
  }

  function buildFenFromGame() {
    const fenString = buildFenStringFromGame(board, PieceColor.WHITE, '-', '-', 0, 1);
    console.log(fenString);
  }

  return { setupFromFEN, buildFenFromGame };
}
