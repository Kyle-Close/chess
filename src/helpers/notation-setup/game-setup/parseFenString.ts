export function parseFenString(fenString: string) {
  const parts = fenString.split(' ');
  if (parts.length < 6) throw Error('FEN string must include all 6 segments.');

  return {
    initialPositions: parts[0],
    turn: parts[1],
    castleRights: parts[2],
    enPassant: parts[3],
    halfMoves: parts[4],
    fullMoves: parts[5],
  };
}
