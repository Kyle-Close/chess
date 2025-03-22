import { Board as BoardLocal } from 'base/zod/BoardSchema';
import { useBoard } from '../hooks/useBoard';
import { Square } from './Square';

interface BoardProps {
  board: BoardLocal
}

export function Board({ board }: BoardProps) {
  const { handleSquareClicked, selected } = useBoard();
  if (!board) return

  const selectedPieceMoves = selected.selectedIndex ? board.squares[selected.selectedIndex].piece?.validMoves : null;
  console.log(selectedPieceMoves)

  return (
    <div className={getBoardClasses()}>
      <div className="grid grid-cols-8 grid-rows-8 grow">
        {board.squares.map((square, key) => {
          const isSelected = selected.selectedIndex === key;
          const piece = square.piece ? square.piece : null;

          let isCapture = false;
          let isValidMove = false;

          if (selectedPieceMoves) {
            const move = selectedPieceMoves.find(move => move.endIndex === key)
            if (move) {
              if (move.isCapture) isCapture = true;
              else isValidMove = true;
            }
          }

          return (
            <Square
              currentPiece={piece}
              index={key}
              key={key}
              handleSquareClicked={handleSquareClicked}
              isStartPos={isSelected}
              isCaptureSquare={isCapture}
              isValidSquare={isValidMove}
            />
          );
        })}
      </div>
    </div>
  );
}

function getBoardClasses() {
  const core = ['flex', 'flex-grow'];
  const responsive = [
    'min-w-80',
    'xs:min-w-96',
    'sm:min-w-128',
    'lg:min-w-160',
    'max-w-80',
    'xs:max-w-96',
    'sm:max-w-128',
    'lg:max-w-160',
    'min-h-80',
    'xs:min-h-96',
    'sm:min-h-128',
    'lg:min-h-160',
    'max-h-80',
    'xs:max-h-96',
    'sm:max-h-128',
    'lg:max-h-160',
  ];

  return [...core, ...responsive].join(' ');
}

