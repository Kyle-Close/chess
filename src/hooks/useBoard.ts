import { useContext, useEffect } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { usePiece } from './usePiece';
import { useStartEndAction } from './useStartEndAction';
import { validatePieceMove } from '../helpers/validations/validatePieceMove';
import { Piece } from '../context/board/InitialState';
import { GameState } from '../context/GameState';
import { copyBoardAndUpdate } from '../helpers/board/copyBoardAndUpdate';
import { buildChessNotation } from '../helpers/move/buildChessNotation';
import { buildFenStringFromGame } from '../helpers/game-setup/buildFenStringFromGame';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';

export function useBoard() {
  const { board, setBoard, getPieceAtPosition, clearIsValidSquares } =
    useContext(BoardContext);
  const gameState = useContext(GameState);
  const { move } = usePiece();
  const { setPosition, startPos, endPos, setStartPos, clear } = useStartEndAction();

  function tryMove(piece: Piece, startPos: number, endPos: number) {
    const validMoves = validatePieceMove(board, piece, startPos);
    if (!validMoves || validMoves.length === 0) return;
    if (!validMoves.some((move) => move.index === endPos)) return;

    const currentPlayer = gameState.getCurrentTurnPlayer();
    const capturedPiece = getPieceAtPosition(endPos);

    if (capturedPiece) {
      currentPlayer.enemyPieceCaptured(capturedPiece.type);
    }

    gameState.changeTurn();

    const opponent = gameState.getCurrentTurnOpponent();
    const updatedBoard = copyBoardAndUpdate(board, piece, startPos, endPos);
    const fenString = buildFenStringFromGame(
      updatedBoard,
      currentPlayer.color,
      '-',
      '-',
      gameState.turn + 1
    );

    const chessNotation = buildChessNotation(
      board,
      piece,
      startPos,
      endPos,
      opponent.color
    );

    gameState.pushToMoveHistory({ fenString, chessNotation });
    if (opponent.checkForCheckmate(updatedBoard)) gameState.updateWinner(currentPlayer);

    move(piece, startPos, endPos);
  }

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getPieceAtPosition(startPos);
    if (currentPiece) {
      const validMoves = validatePieceMove(board, currentPiece, startPos);
      if (currentPiece.type === PieceType.KING) {
        // append here
        const player = gameState.getCurrentTurnPlayer();
        const castleRights = player.castleRights;
        if (player.color === PieceColor.WHITE) {
          if (castleRights.canCastleKingSide)
            validMoves?.push({ index: 6, isCapture: false });
          if (castleRights.canCastleQueenSide)
            validMoves?.push({ index: 2, isCapture: false });
        } else {
          if (castleRights.canCastleKingSide)
            validMoves?.push({ index: 62, isCapture: false });
          if (castleRights.canCastleQueenSide)
            validMoves?.push({ index: 58, isCapture: false });
        }
      }
      if (validMoves) {
        setBoard((prevBoard) => {
          const copy = [...prevBoard];
          validMoves.forEach((move) => {
            if (move.isCapture) copy[move.index].isCapture = true;
            copy[move.index].isValidMove = true;
          });
          return copy;
        });
      }
    }
  }

  const handleSquareClicked = (index: number) => {
    const isFinalClick = startPos !== null ? true : false;
    const isValidClick = isClickingValidSquare(index, isFinalClick);
    if (isValidClick) setPosition(index);
  };

  const handleRightClickOnBoard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setStartPos(null);
    clearIsValidSquares();
  };

  const isClickingValidSquare = (index: number, isFinalClick: boolean) => {
    const piece = getPieceAtPosition(index);
    const currentTurnPlayer = gameState.getCurrentTurnPlayer();
    if ((piece && piece.color === currentTurnPlayer.color) || !piece) return true;
    else if (piece && piece.color !== currentTurnPlayer.color && isFinalClick)
      return true;
    else return false;
  };

  useEffect(() => {
    if (startPos === null) clearIsValidSquares();
    else if (startPos !== null && endPos === null) {
      if (isClickingValidSquare(startPos, true)) handleShowValidMoves(startPos);
    } else if (startPos !== null && endPos !== null) {
      const piece = getPieceAtPosition(startPos);
      if (piece) tryMove(piece, startPos, endPos);
      clear();
    }
  }, [startPos, endPos]);

  return {
    board,
    startPos,
    handleSquareClicked,
    handleRightClickOnBoard,
  };
}
