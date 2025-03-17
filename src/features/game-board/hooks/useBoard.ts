import { AppDispatch, RootState } from 'base/redux/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useStartEndAction } from './useStartEndAction';
import { ISquare, useGetValidMovesMutation } from 'base/redux/slices/chess-api';
import { useEffect } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBoard(squares: ISquare[], gameId: string) {
  const startEnd = useStartEndAction();
  const [getValidMoves, { data }] = useGetValidMovesMutation();

  useEffect(() => {
    console.log('Valid moves: ', data)
  }, [data])

  const handleSquareClicked = (index: number) => {
    const isValidClick = isClickingValidSquare(/*index, startEnd.startPos !== null*/);
    if (isValidClick) startEnd.setPosition(index, squares);
  };

  const handleRightClickOnBoard = () => {
    startEnd.setStartPos(null);
  };

  const isClickingValidSquare = () => {
    return true;
  };

  useEffect(() => {
    if (startEnd.startPos !== null && startEnd.endPos === null) {
      if (isClickingValidSquare()) {
        console.log('Send start position ', startEnd.startPos, ' to get-valid-moves api.')//handleShowValidMoves(startEnd.startPos);
        getValidMoves({ GameId: gameId, Index: startEnd.startPos });
      }
    }

    // Handle move execution
    else if (startEnd.startPos !== null && startEnd.endPos !== null) {
      const piece = squares[startEnd.startPos].piece;

      if (piece) {
        console.log('Send move execution attempt to api. Start square: ', startEnd.startPos, '. Target square: ', startEnd.endPos);
      }

      startEnd.clear();
    }

  }, [startEnd.startPos, startEnd.endPos]);

  return {
    handleRightClickOnBoard,
    handleSquareClicked,
    isClickingValidSquare,
    startPos: startEnd.startPos
  }
}
