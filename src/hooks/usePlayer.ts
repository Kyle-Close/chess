import { useContext, useEffect, useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { BoardState, Piece } from '../context/board/InitialState';
import { isKingInCheck } from '../helpers/board/isKingInCheck';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { BoardContext } from '../context/board/BoardContext';
import { PieceWithIndex, isCheckmate } from '../helpers/board/isCheckmate';
import { CastleRights, useCastleRights } from './useCastleRights';

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
  getRemainingPieces: () => Piece[];
  checkForCheckmate: (board: BoardState) => boolean;
  castleRights: CastleRights;
}

export function usePlayer(
  initialName: string,
  initialColor: PieceColor
): UsePlayerReturn {
  const { board } = useContext(BoardContext);
  const [name, setName] = useState(initialName);
  const [isTurn, setIsTurn] = useState(false);
  const [color, setColor] = useState<PieceColor>(initialColor);
  const [capturedPieces, setCapturedPieces] = useState<PieceType[]>([]);
  const [isInCheck, setIsInCheck] = useState(false);
  const { castleRights } = useCastleRights(color);

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

  const checkForCheckmate = (board: BoardState) => {
    const isCheck = isKingInCheck(board, getKingIndex(board, color), color);

    if (!isCheck) return false;

    const kingIndex = getKingIndex(board, color);
    const kingPiece = board[kingIndex].piece;
    const remainingPieces = getRemainingPieces();

    if (!kingPiece) return false;

    if (isCheckmate(board, kingPiece, kingIndex, remainingPieces)) return true;
    else return false;
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
    getRemainingPieces,
    checkForCheckmate,
    castleRights,
  };
}
