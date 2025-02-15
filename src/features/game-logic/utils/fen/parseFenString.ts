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

export function isValidFEN(fen: string): boolean {
  const sections = fen.split(' ');
  if (sections.length !== 6) return false;

  const [piecePlacement, activeColor, castling, enPassant, halfmoveClock, fullmoveNumber] =
    sections;

  const piecePlacementRegex = /^([rnbqkpRNBQKP1-8]+\/){7}[rnbqkpRNBQKP1-8]+$/;
  if (!piecePlacementRegex.test(piecePlacement)) return false;

  if (!/^[bw]$/.test(activeColor)) return false;

  if (!/^(K?Q?k?q?|[-])$/.test(castling)) return false;

  if (!/^([a-h][36]|[-])$/.test(enPassant)) return false;

  if (!/^\d+$/.test(halfmoveClock) || !/^\d+$/.test(fullmoveNumber)) return false;

  return true;
}
