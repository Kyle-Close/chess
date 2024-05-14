import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { validatePieceMove } from '../helpers/validatePieceMove';

export function useStartEndAction<T, U>(
  callbackFn?: (startPos: number, endPos: number) => U
) {
  const { getPieceAtPosition, setBoard, clearIsValidSquares } =
    useContext(BoardContext);
  const [startPos, setStartPos] = useState<number | null>(null);
  const [endPos, setEndPos] = useState<number | null>(null);

  const clear = () => {
    setStartPos(null);
    setEndPos(null);
  };

  const setPosition = (index: number) => {
    const piece = getPieceAtPosition(index);
    if (startPos === null && !piece) return; // Clicked an empty square as starting pos. Return

    if (startPos === null) setStartPos(index);
    else if (startPos === index) return;
    else setEndPos(index);
  };

  function getCurrentSelectedPiece() {
    if (startPos === null) return null;
    return getPieceAtPosition(startPos);
  }

  function handleShowValidMoves(startPos: number) {
    const currentPiece = getCurrentSelectedPiece();
    if (currentPiece) {
      const validMoves = validatePieceMove(currentPiece, startPos);
      if (validMoves) {
        setBoard((prevBoard) => {
          const copy = [...prevBoard];
          validMoves.forEach((index) => {
            copy[index].isValidMove = true;
          });
          return copy;
        });
      }
    }
  }

  useEffect(() => {
    if (startPos === null) clearIsValidSquares();
    else if (startPos !== null && endPos === null)
      handleShowValidMoves(startPos);
    else if (startPos !== null && endPos !== null && callbackFn) {
      callbackFn(startPos, endPos);
      clear();
    }
  }, [startPos, endPos]);

  useEffect(() => {
    const handleScreenClick = (e: MouseEvent) => {
      clear();
    };

    document.addEventListener('contextmenu', (e) => handleScreenClick(e));
    return () => {
      document.removeEventListener('contextmenu', handleScreenClick);
    };
  }, []);

  return { clear, setPosition, startPos, setStartPos };
}
