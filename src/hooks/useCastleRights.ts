import { useContext } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { PieceColor } from '../enums/PieceColor';
import { getKingIndex } from '../helpers/board/getKingIndex';
import { BoardState } from '../context/board/InitialState';

export interface CastleRights {
  canCastleQueenSide: boolean;
  canCastleKingSide: boolean;
}

export function useCastleRights(color: PieceColor) {
  const { board } = useContext(BoardContext);
  const kingIndex = getKingIndex(board, color);
  const king = board[kingIndex].piece;

  if(!king || king.hasMoved) return {canCastleQueenSide: false, canCastleKingSide: false};\

  let isQueenSide = true;
  let isKingSide = true;

  const queenSideRook = getQueenSideRookSquare(board, color).piece
  const kingSideRook = getKingSideRookSquare(board, color).piece

  if(!queenSideRook || queenSideRook.hasMoved === true) isQueenSide = false;
  if(!kingSideRook || kingSideRook.hasMoved === true) isKingSide = false;

  const queenSideSquaresAlongPath = getQueenSideSquaresAlongPath();
  const kingSideSquaresAlongPath = getKingSideSquaresAlongPath();

  if(isPathClear(color))
}

function getQueenSideRookSquare(board: BoardState, color: PieceColor){
  if(color === PieceColor.BLACK) return board[56];
  else return board[0]
}

function getKingSideRookSquare(board: BoardState, color: PieceColor){
  if(color === PieceColor.BLACK) return board[63]
  else return board[7];
}