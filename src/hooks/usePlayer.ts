import { useContext, useEffect, useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { BoardState } from '../context/board/InitialState';
import { isKingInCheck } from '../helpers/board/isKingInCheck';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { BoardContext } from '../context/board/BoardContext';

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
    const isCheck = isKingInCheck(board, getKingIndex(board, color));
    if (isCheck) setIsInCheck(true);
    else setIsInCheck(false);
  };

  const updatePlayerTurn = (isTurn: boolean) => {
    setIsTurn(isTurn);
  };

  useEffect(() => {
    if (isTurn) updatePlayerInCheck();
  }, [isTurn]);

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
  };
}
