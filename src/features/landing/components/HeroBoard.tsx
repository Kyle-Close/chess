import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BoardView, BoardPiece } from 'base/features/game-board/components/BoardView';
import { buildBoardFromFen } from 'base/features/game-board/utils/board-utility/buildBoardFromFen';
import { PieceType } from 'base/zod/emums/PieceType';
import { Color } from 'base/zod/emums/Color';

// Paul Morphy vs. Duke Karl of Brunswick & Count Isouard, Paris 1858 - "The Opera Game"
const MOVES = [
  'e2e4', 'e7e5', 'g1f3', 'd7d6', 'd2d4', 'c8g4', 'd4e5', 'g4f3', 'd1f3', 'd6e5', 'f1c4', 'g8f6',
  'f3b3', 'd8e7', 'b1c3', 'c7c6', 'c1g5', 'b7b5', 'c3b5', 'c6b5', 'c4b5', 'b8d7', 'e1c1', 'a8d8',
  'd1d7', 'd8d7', 'h1d1', 'e7e6', 'b5d7', 'f6d7', 'b3b8', 'd7b8', 'd1d8',
];
const SAN = [
  'e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6',
  'Qb3', 'Qe7', 'Nc3', 'c6', 'Bg5', 'b5', 'Nxb5', 'cxb5', 'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8',
  'Rxd7', 'Rxd7', 'Rd1', 'Qe6', 'Bxd7+', 'Nxd7', 'Qb8+', 'Nxb8', 'Rd8#',
];

const STEP_MS = 1300;
const FINAL_PAUSE_MS = 4500;

const toIndex = (sq: string) => (8 - Number(sq[1])) * 8 + (sq.charCodeAt(0) - 97);

const POSITIONS: (BoardPiece | null)[][] = (() => {
  let board: (BoardPiece | null)[] = buildBoardFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR').map((s) => s.piece);
  const positions = [board];
  for (const move of MOVES) {
    board = [...board];
    const from = toIndex(move.slice(0, 2));
    const to = toIndex(move.slice(2));
    const piece = board[from];
    board[to] = piece;
    board[from] = null;
    // Castling: bring the rook across too
    if (piece?.pieceType === PieceType.KING && Math.abs(from - to) === 2) {
      const rookFrom = to > from ? to + 1 : to - 2;
      board[(from + to) / 2] = board[rookFrom];
      board[rookFrom] = null;
    }
    positions.push(board);
  }
  return positions;
})();

export function HeroBoard() {
  const [ply, setPly] = useState(0);

  useEffect(() => {
    const isFinal = ply === MOVES.length;
    const timer = setTimeout(() => setPly(isFinal ? 0 : ply + 1), isFinal ? FINAL_PAUSE_MS : ply === 0 ? 900 : STEP_MS);
    return () => clearTimeout(timer);
  }, [ply]);

  const pieces = POSITIONS[ply];
  const move = ply > 0 ? MOVES[ply - 1] : null;
  const san = ply > 0 ? SAN[ply - 1] : null;
  const givesCheck = san !== null && /[+#]$/.test(san);
  const sideToMove = ply % 2 === 0 ? Color.WHITE : Color.BLACK;
  const checkSquare = givesCheck
    ? pieces.findIndex((p) => p?.pieceType === PieceType.KING && p.color === sideToMove)
    : null;

  const moveLabel = san ? `${Math.ceil(ply / 2)}.${ply % 2 === 0 ? '..' : ''} ${san}` : 'Starting position';

  return (
    <Box>
      <BoardView
        pieces={pieces}
        lastMove={move ? { from: toIndex(move.slice(0, 2)), to: toIndex(move.slice(2)) } : null}
        checkSquare={checkSquare}
      />
      <Flex mt={4} align='center' justify='space-between' gap={4}>
        <Box minW={0}>
          <Text fontSize='sm' fontWeight='semibold' truncate>The Opera Game</Text>
          <Text fontSize='xs' color='fg.muted' truncate>Morphy vs. Duke Karl &amp; Count Isouard · Paris, 1858</Text>
        </Box>
        <Text className='tabular' fontSize='sm' fontWeight='bold' color={san?.endsWith('#') ? 'gold.300' : 'fg'} whiteSpace='nowrap'>
          {moveLabel}
        </Text>
      </Flex>
      <Box mt={3} h='2px' bg='whiteAlpha.100' borderRadius='full' overflow='hidden'>
        <Box h='full' bg='gold.400' transition='width 400ms ease' style={{ width: `${(ply / MOVES.length) * 100}%` }} />
      </Box>
    </Box>
  );
}
