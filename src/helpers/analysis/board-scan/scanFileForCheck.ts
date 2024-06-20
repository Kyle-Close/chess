import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { ScanResult } from './scanRank';

export function scanFileForCheck(fileScan: ScanResult[], opponentPieceColor: PieceColor) {
  let isCheck = false;
  const top = getTopFileScan(fileScan, opponentPieceColor);
  const bottom = TODO;

  // scan top down for unubstructed rook or queen
  for (let i = 0; i < 8; i++) {
    const piece = rankScan[i];

    // If the square is unoccupied, go to next square
    if (piece === null) continue;

    const isEnemy = piece.color === opponentPieceColor;
    const isQueen = piece.type === PieceType.QUEEN;
    const isRook = piece.type === PieceType.ROOK;

    // If the square is occupied by opponent rook or queen, isCheck
    if (isEnemy && isQueen && isRook) {
      isCheck = true;
      continue;
    }

    // else, the square is occupied by your piece OR enemy piece that is not a rook or queen. Blocking
    else isCheck = false;
  }

  if (isCheck) return true;

  // scan right side for unubstructed rook or queen
  for (let i = 7; i >= 0; i--) {
    const piece = rankScan[i];

    // If the square is unoccupied, go to next square
    if (piece === null) continue;

    const isEnemy = piece.color === opponentPieceColor;
    const isQueen = piece.type === PieceType.QUEEN;
    const isRook = piece.type === PieceType.ROOK;

    // If the square is occupied by opponent rook or queen, isCheck
    if (isEnemy && isQueen && isRook) {
      isCheck = true;
      continue;
    }

    // else, the square is occupied by your piece OR enemy piece that is not a rook or queen. Blocking
    else isCheck = false;
  }

  return isCheck;
}

function getTopFileScan(fileScan: ScanResult[], opponentColor: PieceColor) {
  const newFileScan: ScanResult[] = [];

  for (let i = 0; i < fileScan.length; i++) {
    const piece = fileScan[i];

    if (piece && piece.color !== opponentColor && piece.type === PieceType.QUEEN) break;
    newFileScan.push(piece);
  }

  return newFileScan;
}
