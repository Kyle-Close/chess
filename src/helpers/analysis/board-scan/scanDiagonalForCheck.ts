import { PieceColor } from '../../../enums/PieceColor';
import { PieceType } from '../../../enums/PieceType';
import { ScanResult } from './scanRank';

export function scanDiagonalForCheck(
  scannedDiagonalA: ScanResult[],
  scannedDiagonalB: ScanResult[],
  opponentColor: PieceColor
) {
  const isDiagonalAPawnCheck = scanDiagonalForPawnCheck(scannedDiagonalA, opponentColor);
  const isDiagonalBPawnCheck = scanDiagonalForPawnCheck(scannedDiagonalB, opponentColor);
  const isDiagonalABishopOrQueenCheck = scanDiagonalForBishopOrQueenCheck(
    scannedDiagonalA,
    opponentColor
  );
  const isDiagonalBBishopOrQueenCheck = scanDiagonalForBishopOrQueenCheck(
    scannedDiagonalB,
    opponentColor
  );
  return (
    isDiagonalAPawnCheck ||
    isDiagonalBPawnCheck ||
    isDiagonalABishopOrQueenCheck ||
    isDiagonalBBishopOrQueenCheck
  );
}

function getPawnPositionForCheck(kingIndex: number, opponentColor: PieceColor) {
  // Returns the index in the array that the enemy pawn needs to be in for check.
  if (opponentColor === PieceColor.BLACK) return kingIndex + 1;
  return kingIndex - 1;
}

function scanDiagonalForPawnCheck(scannedDiagonal: ScanResult[], opponentColor: PieceColor) {
  let isCheck = false;

  scannedDiagonal.forEach((square, index) => {
    if (!square) return;
    const isMyKing = square?.type === PieceType.KING && square.color !== opponentColor;
    if (!isMyKing) return;

    const pawnCheckPositionIndex = getPawnPositionForCheck(index, opponentColor);
    if (pawnCheckPositionIndex < 0 || pawnCheckPositionIndex >= scannedDiagonal.length) return;

    const pieceInPawnCheckPosition = scannedDiagonal[pawnCheckPositionIndex];

    if (pieceInPawnCheckPosition) {
      if (
        pieceInPawnCheckPosition.type === PieceType.PAWN &&
        pieceInPawnCheckPosition.color === opponentColor
      ) {
        isCheck = true;
      }
    }
  });

  return isCheck;
}

function scanDiagonalForBishopOrQueenCheck(
  scannedDiagonal: ScanResult[],
  opponentColor: PieceColor
) {
  const color = opponentColor === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
  const kingIndex = getKingIndexFromDiagonalScan(scannedDiagonal, color);
  // split scanned diagonal on king location into 2 arrays
  const left = scannedDiagonal.slice(0, kingIndex);
  const right = scannedDiagonal.slice(kingIndex + 1, scannedDiagonal.length);

  let isCheck = false;

  // the left array are all the pieces that come before the king
  for (let i = 0; i < left.length; i++) {
    const scanResult = left[i];

    // Blank space - skip to next square
    if (scanResult === null) continue;

    const isEnemyPiece = scanResult.color === opponentColor;
    const isQueenOrBishop =
      scanResult.type === PieceType.QUEEN || scanResult.type === PieceType.BISHOP;

    // If the piece is the enemies & is a bishop or queen, then inCheck
    if (isQueenOrBishop && isEnemyPiece) {
      isCheck = true;
      continue;
    }

    // else, the piece is yours OR the piece is the enemies but not a bishop or queen
    else isCheck = false;
  }

  if (isCheck) return true;

  // the right array is all the pieces that come after the king
  for (let i = right.length - 1; i >= 0; i--) {
    const scanResult = right[i];

    // Blank space - skip to next square
    if (scanResult === null) continue;

    const isEnemyPiece = scanResult.color === opponentColor;
    const isQueenOrBishop =
      scanResult.type === PieceType.QUEEN || scanResult.type === PieceType.BISHOP;

    // If the piece is the enemies & is a bishop or queen, then inCheck
    if (isQueenOrBishop && isEnemyPiece) {
      isCheck = true;
      continue;
    }

    // else, the piece is yours OR the piece is the enemies but not a bishop or queen
    else isCheck = false;
  }

  return isCheck;
}

function getKingIndexFromDiagonalScan(scannedDiagonal: ScanResult[], kingColor: PieceColor) {
  return scannedDiagonal.findIndex(
    (square) => square?.type === PieceType.KING && square.color === kingColor
  );
}
