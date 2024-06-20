import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { ScanResult } from './scanRank';

export function scanFileForCheck(fileScan: ScanResult[], opponentPieceColor: PieceColor) {
  let isCheck = false;
  const { top, bottom } = splitFileScan(fileScan, opponentPieceColor);

  // scan top down to king for unobstructed rook or queen
  for (let i = 0; i < top.length; i++) {
    const piece = top[i];

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
  for (let i = bottom.length - 1; i >= 0; i--) {
    const piece = bottom[i];

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

function splitFileScan(fileScan: ScanResult[], opponentColor: PieceColor) {
  const topScan: ScanResult[] = [];

  for (let i = 0; i < fileScan.length; i++) {
    const piece = fileScan[i];
    const isMyKing = piece && piece.type === PieceType.KING && piece.color !== opponentColor;
    if (isMyKing) break;
    else topScan.push(piece);
  }

  const bottomScan: ScanResult[] = [];

  for (let i = fileScan.length - 1; i >= 0; i--) {
    const piece = fileScan[i];
    const isMyKing = piece && piece.type === PieceType.KING && piece.color !== opponentColor;
    if (isMyKing) break;
    else bottomScan.push(piece);
  }

  return {
    top: topScan,
    bottom: bottomScan,
  };
}
