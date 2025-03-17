import { Square } from './Square';
import { buildBoardFromFen } from 'base/features/game-logic/utils/fen/buildBoardFromFen';

interface BoardProps {
  fen?: string;
}

export function Board({ fen }: BoardProps) {
  if (!fen) return;
  const squares = buildBoardFromFen(fen.split(' ')[0]);

  return (
    <div className={getBoardClasses()}>
      <div className='grid grid-cols-8 grid-rows-8 grow'>
        {squares.map((square, key) => {
          return (
            <Square
              currentPiece={square.piece}
              isCheck={false}
              index={key}
              key={key}
              handleSquareClicked={() => { }}
              isStartPos={true}
              isValidMove={false}
              isCapture={false}
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
