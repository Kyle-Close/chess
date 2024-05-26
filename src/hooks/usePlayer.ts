import { useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';

export interface UsePlayerReturn {
  name: string;
  updateName: (name: string) => void;
  capturedPieces: PieceType[];
  enemyPieceCaptured: (pieceType: PieceType) => void;
  isInCheck: boolean;
  updateIsInCheck: (isCheck: boolean) => void;
  color: PieceColor;
  updateColor: (color: PieceColor) => void;
}

export function usePlayer(
  initialName: string,
  initialColor: PieceColor
): UsePlayerReturn {
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState<PieceColor>(initialColor);
  const [capturedPieces, setCapturedPieces] = useState<PieceType[]>([]);
  const [isInCheck, setIsInCheck] = useState(false);

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

  return {
    name,
    updateName,
    capturedPieces,
    enemyPieceCaptured,
    isInCheck,
    updateIsInCheck,
    color,
    updateColor,
  };
}

const initialRemainingPieces: PieceType[] = [
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.PAWN,
  PieceType.ROOK,
  PieceType.ROOK,
  PieceType.BISHOP,
  PieceType.BISHOP,
  PieceType.KNIGHT,
  PieceType.KNIGHT,
  PieceType.QUEEN,
  PieceType.KING,
];
