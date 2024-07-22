import { Square } from '../square';
import { useAppSelector, useBoard } from '../../hooks/useBoard';
import { useContext } from 'react';
import { GameState } from '../../context/game-state/GameState';

export function Board() {
  const board = useAppSelector((state) => state.board);
  const { startPos, handleSquareClicked, handleRightClickOnBoard } = useBoard();
  const gameState = useContext(GameState);
  const { isWhiteTurn } = gameState;

  return (
    <div onAuxClick={handleRightClickOnBoard} className={getBoardClasses(isWhiteTurn)}>
      <div className='grid grid-cols-8 grid-rows-8 grow'>
        {board.map((square, key) => {
          const isStart = startPos === key;
          return (
            <Square
              currentPiece={square.piece}
              index={key}
              key={key}
              handleSquareClicked={handleSquareClicked}
              isStartPos={isStart}
              isValidMove={square.isValidMove}
              isCapture={square.isCapture}
            />
          );
        })}
      </div>
    </div>
  );
}

function getBoardClasses(isFlipped: boolean) {
  const core = ['flex', 'flex-grow'];
  const responsive = [
    'min-w-96',
    'md:min-w-128',
    'xl:min-w-160',
    'max-w-96',
    'md:max-w-128',
    'xl:max-w-160',
    'min-h-96',
    'md:min-h-128',
    'xl:min-h-160',
    'max-h-96',
    'md:max-h-128',
    'xl:max-h-160',
  ];

  return [...core, ...responsive].join(' ');
}
