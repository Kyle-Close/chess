import { useContext, useEffect, useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { BoardState, Piece } from '../context/board/InitialState';
import { isKingInCheck } from '../helpers/board/isKingInCheck';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { BoardContext } from '../context/board/BoardContext';
import { PieceWithIndex, isCheckmate } from '../helpers/board/isCheckmate';
import { GameState } from '../context/GameState';

export interface UsePlayerReturn {
  name: string;
  isTurn: boolean;
  updatePlayerTurn: (isTurn: boolean) => void;
  updateName: (name: string) => void;
  capturedPieces: PieceType[];
  enemyPieceCaptured: (pieceType: PieceType) => void;
  isInCheck: boolean;
  updateIsInCheck: (isCheck: boolean) => void;
  color: PieceColor;
  updateColor: (color: PieceColor) => void;
  updatePlayerInCheck: (board: BoardState) => void;
  getRemainingPieces: () => Piece[];
}

export function usePlayer(
  initialName: string,
  initialColor: PieceColor
): UsePlayerReturn {
  const [name, setName] = useState(initialName);
  const [isTurn, setIsTurn] = useState(false);
  const [color, setColor] = useState<PieceColor>(initialColor);
  const [capturedPieces, setCapturedPieces] = useState<PieceType[]>([]);
  const [isInCheck, setIsInCheck] = useState(false);
  const { board } = useContext(BoardContext);
  const gameState = useContext(GameState);

  const updateName = (name: string) => {
    setName(name);
  };

  const updateColor = (color: PieceColor) => {
    setColor(color);
  };

  const updateIsInCheck = (isCheck: boolean) => {
    setIsInCheck(isCheck);
  };

  const enemyPieceCaptured = (pieceType: PieceType) => {
    setCapturedPieces((prevCapturedPieces) => [...prevCapturedPieces, pieceType]);
  };

  const updatePlayerInCheck = () => {
    const isCheck = isKingInCheck(board, getKingIndex(board, color), color);
    if (isCheck) setIsInCheck(true);
    else setIsInCheck(false);
  };

  const updatePlayerTurn = (isTurn: boolean) => {
    setIsTurn(isTurn);
  };

  const getRemainingPieces = () => {
    const pieces: PieceWithIndex[] = [];

    board.forEach((square, index) => {
      const piece = square.piece;
      if (piece && piece.color === color) pieces.push({ ...piece, index });
    });
    return pieces;
  };

  useEffect(() => {
    if (isTurn) updatePlayerInCheck();
    else updateIsInCheck(false);
  }, [isTurn]);

  useEffect(() => {
    if (isInCheck) {
      const kingIndex = getKingIndex(board, color);
      const kingPiece = board[kingIndex].piece;
      const remainingPieces = getRemainingPieces();
      if (!kingPiece) return;
      if (isCheckmate(board, kingPiece, kingIndex, remainingPieces))
        gameState.updateWinner(gameState.getCurrentTurnOpponent());
    }
  }, [isInCheck]);

  return {
    name,
    isTurn,
    updatePlayerTurn,
    updateName,
    capturedPieces,
    enemyPieceCaptured,
    isInCheck,
    updateIsInCheck,
    color,
    updateColor,
    updatePlayerInCheck,
    getRemainingPieces,
  };
}
