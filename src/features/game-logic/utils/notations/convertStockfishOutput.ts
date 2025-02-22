interface StockfishMove {
  startIndex: number,
  endIndex: number
}

export function convertStockfishPosition(pos: string): StockfishMove {
  // ex e2e3
  const parts = splitString(pos, /[a-zA-Z]\d+/g)

  const startIndex = convertAlgebraicNotationToIndex(parts[0])
  const endIndex = convertAlgebraicNotationToIndex(parts[1])
  return { startIndex, endIndex }
}

function splitString(input: string, pattern: RegExp) {
  return input.match(pattern) || [];

}


function convertAlgebraicNotationToIndex(notation: string) {
  // ex. e2
  const rank = splitString(notation, /\d/);
  const file = splitString(notation, /[a-z]/)
  console.log('here', rank, file)
  return getRankIndex(rank) * getFileIndex(file)
}

function getRankIndex(rank: string) {
  return Number(rank) - 1
}

function getFileIndex(file: string) {
  switch (file.toUpperCase()) {
    case "A":
      return 0;
    case "B":
      return 1
    case "C":
      return 2
    case "D":
      return 3
    case "E":
      return 4
    case "F":
      return 5
    case "G":
      return 6
    case "H":
      return 7;
    default:
      throw Error('Invalid file index')
  }
}
