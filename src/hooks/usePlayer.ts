import { useContext, useState } from 'react';
import { PieceType } from '../enums/PieceType';
import { PieceColor } from '../enums/PieceColor';
import { BoardState } from '../context/board/InitialState';
import { isKingInCheck } from '../helpers/board/isKingInCheck';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { isCheckmate } from '../helpers/board/isCheckmate';
import { CastleRights, useCastleRights } from './useCastleRights';
import { getRemainingPiecesByColor } from '../helpers/board/getRemainingPiecesByColor';
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
    const remainingPieces = getRemainingPiecesByColor(board, color, true);

    if (!kingPiece) return false;

    if (isCheckmate(board, kingPiece, kingIndex, remainingPieces)) return true;
    else return false;
  };

  const updatePlayerTurn = (isTurn: boolean) => {
    setIsTurn(isTurn);
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
    checkForCheckmate,
    castleRights,
  };
}
