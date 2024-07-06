import { useEffect, useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { UseCastleRightsReturn, useCastleRights } from './useCastleRights';
import { UseTimerReturn, useTimer } from './useTimer';

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
  castleRights: UseCastleRightsReturn;
  reset: () => void;
  timer: UseTimerReturn;
}

export function usePlayer(
  initialName: string,
  initialColor: PieceColor,
  initialIsTurn: boolean
): UsePlayerReturn {
  const [name, setName] = useState(initialName);
  const [isTurn, setIsTurn] = useState(initialIsTurn);
  const [color, setColor] = useState<PieceColor>(initialColor);
  const [capturedPieces, setCapturedPieces] = useState<PieceType[]>([]);
  const [isInCheck, setIsInCheck] = useState(false);
  const isTimerInitOn = color === PieceColor.WHITE ? true : false;
  const timer = useTimer(300, isTimerInitOn);
  const castleRights = useCastleRights();

  const reset = () => {
    setName(initialName);
    setIsTurn(false);
    setColor(initialColor);
    setCapturedPieces([]);
    setIsInCheck(false);
    castleRights.reset();
  };

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

  const updatePlayerTurn = (isTurn: boolean) => {
    setIsTurn(isTurn);
  };

  useEffect(() => {
    if (isTurn) timer.start();
    else timer.stop();
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
    castleRights,
    reset,
    timer,
  };
}
