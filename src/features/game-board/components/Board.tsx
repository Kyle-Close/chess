import { Game } from 'base/zod/GameSchema';
import { useBoard } from '../hooks/useBoard';
import { GameOverModal } from './GameOverModal';
import { PromotionModal } from './PromotionModal';
import { Square } from './Square';
import { GameType } from 'base/zod/emums/GameType';
import { Color } from 'base/zod/emums/Color';

interface BoardProps {
  game: Game
}

export function Board({ game }: BoardProps) {
  const { handleSquareClicked, selected, isPromotionModalOpen, closePromotionModal, isGameOverModalOpen, closeGameOverModal
  } = useBoard(game);
  if (!game) return

  const selectedPiece = selected.selectedList.length === 1 ? game.board.squares[selected.selectedList[0]].piece : null;
  const selectedPieceMoves = selectedPiece ? selectedPiece.validMoves : null;
  const isSelectingActivePiece = selectedPiece ? selectedPiece.color === game?.activeColor : false;
  let rotateBoard = false;

  if (game.type === GameType.LOCAL && game.activeColor === Color.BLACK)
    rotateBoard = true;

  if (game.type === GameType.STOCKFISH && game.stockfishInfo?.playingAs === Color.WHITE)
    rotateBoard = true;

  return (
    <div className={getBoardClasses(rotateBoard)}>
      {isPromotionModalOpen && <PromotionModal clearSelected={selected.clear} isOpen={isPromotionModalOpen} onClose={closePromotionModal} gameId={game.id} start={selected.selectedList[0]} end={selected.selectedList[1]} />}
      {isGameOverModalOpen && <GameOverModal isOpen={isGameOverModalOpen} onClose={closeGameOverModal} game={game} />}
      <div className="grid grid-cols-8 grid-rows-8 grow">
        {game.board.squares.map((square, key) => {
          const isSelected = selected.selectedList[0] === key;
          const piece = square.piece ? square.piece : null;

          let isCapture = false;
          let isValidMove = false;

          if (selectedPieceMoves && isSelectingActivePiece) {
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
              rotate={rotateBoard}
            />
          );
        })}
      </div>
    </div>
  );
}


function getBoardClasses(rotate: boolean) {
  const core = ['flex', 'flex-grow'];
  const responsive = [
    'min-w-80', 'xs:min-w-96', 'sm:min-w-128', 'lg:min-w-160',
    'max-w-80', 'xs:max-w-96', 'sm:max-w-128', 'lg:max-w-160',
    'min-h-80', 'xs:min-h-96', 'sm:min-h-128', 'lg:min-h-160',
    'max-h-80', 'xs:max-h-96', 'sm:max-h-128', 'lg:max-h-160',];
  if (rotate) responsive.push('rotate-180')
  return [...core, ...responsive].join(' ');
}


