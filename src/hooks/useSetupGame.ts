import { useContext } from 'react';
import { GameState } from '../context/GameState';
import { BoardContext } from '../context/board/BoardContext';
import { buildBoardFromFen } from '../helpers/game-setup/buildBoardFromFen';
import { parseFenString } from '../helpers/game-setup/parseFenString';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceColor } from '../enums/PieceColor';
import { getPlayerCastleRightsFromFen } from '../helpers/game-setup/getPlayerCastleRightsFromFen';
import { buildEnPassantForFen } from '../helpers/game-setup/buildEnPassantForFen';
import { getEnPassantTargetSquareFromFen } from '../helpers/game-setup/getEnPassantTargetSquareFromFen';

export function useSetupGame() {
  const gameState = useContext(GameState);
  const { board, initializeBoard } = useContext(BoardContext);

  function setupFromFEN(fenString: string) {
    const fenSegments = parseFenString(fenString);
    const initialBoard = buildBoardFromFen(fenSegments.initialPositions);

    // Set up board state.
    initializeBoard(initialBoard);

    // Set game half turns
    gameState.move.updateHalfMoves(Number(fenSegments.halfMoves));

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

  function buildFenFromGame() {
    const opponent = gameState.getCurrentTurnOpponent();
    const white = gameState.whitePlayer;
    const black = gameState.blackPlayer;
    const enPassantSquareString = buildEnPassantForFen(gameState.enPassantSquare);

    const fenString = buildFenStringFromGame(
      board,
      opponent.color,
      enPassantSquareString,
      white.castleRights,
      black.castleRights,
      gameState.move
    );

    console.log(fenString);
  }

  return { setupFromFEN, buildFenFromGame };
}
