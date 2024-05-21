import { BoardState, Piece } from '../../../context/board/InitialState';

export function knightMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  let allSquares = getAllKnightMoves(currentIndex);
  const filteredOutOfBounds = filterOutOfBounds(allSquares);
  console.log(filteredOutOfBounds);
}

function getAllKnightMoves(currentIndex: number) {
  return [
    currentIndex - 17,
    currentIndex - 15,
    currentIndex - 6,
    currentIndex + 10,
    currentIndex + 17,
    currentIndex + 15,
    currentIndex + 6,
    currentIndex - 10,
  ];
}

function filterOutOfBounds(allSquares: number[]) {
  return allSquares.filter((index) => index >= 0 && index <= 63);
}
