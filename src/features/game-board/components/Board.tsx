import { ValidMove, ValidMoveArraySchema } from 'base/zod/ValidMovesSchema';
import { useBoard } from '../hooks/useBoard';
import { Square } from './Square';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Game } from 'base/zod/GameSchema';

const fetchValidMoves = async (gameId: string): Promise<ValidMove[]> => {
  try {
    const response = await fetch("http://localhost:5165/chess-api/get-valid-moves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId }), // Send gameId in the request body
    });

    if (!response.ok) {
      throw new Error("Failed to fetch valid moves");
    }

    const jsonData = await response.json();
    return ValidMoveArraySchema.parse(jsonData)
  } catch (err) {
    throw err;
  }
};



export function Board() {
  const { handleSquareClicked, selected } = useBoard();
  const queryClient = useQueryClient();
  const game = queryClient.getQueryData<Game>(["game"]);

  if (!game) return;
  const squares = game.board.squares;

  return (
    <div className={getBoardClasses()}>
      <div className="grid grid-cols-8 grid-rows-8 grow">
        {squares.map((square, key) => {
          const isStart = selected.selectedIndex === key;

          return (
            <Square
              currentPiece={square.piece}
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

