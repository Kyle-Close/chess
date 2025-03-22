import { Board as BoardLocal } from 'base/zod/BoardSchema';
import { useBoard } from '../hooks/useBoard';
import { Square } from './Square';

interface BoardProps {
  board: BoardLocal
}

export function Board({ board }: BoardProps) {
  console.log("Rendering Board")
  const { handleSquareClicked, selected } = useBoard();
  if (!board) return
  console.log(board)

  return (
    <div className={getBoardClasses()}>
      <div className="grid grid-cols-8 grid-rows-8 grow">
        {board.squares.map((square, key) => {
          const isStart = selected.selectedIndex === key;
          const piece = square.piece ? square.piece : null;
          let isTargetSquare = false;
          let isValidSquare = false;

          if (selected.selectedIndex === piece?.index) {
            const validMoves = piece.validMoves;
          }
          piece?.validMoves

          return (
            <Square
              currentPiece={piece}
              index={key}
              key={key}
              handleSquareClicked={handleSquareClicked}
              isStartPos={isStart}
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

