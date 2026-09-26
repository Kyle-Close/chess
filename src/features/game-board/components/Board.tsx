import { useEffect, useRef } from 'react';
import { Game } from 'base/zod/GameSchema';
import { useBoard } from '../hooks/useBoard';
import { GameOverModal } from './GameOverModal';
import { PromotionPicker } from './PromotionPicker';
import { BoardView } from './BoardView';

interface BoardProps {
  game: Game
  flipped: boolean
}

export function Board({ game, flipped }: BoardProps) {
  const board = useBoard(game);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Soften the orientation change when the board turns to face the other player
  const isFirstOrientation = useRef(true);
  useEffect(() => {
    if (isFirstOrientation.current) {
      isFirstOrientation.current = false;
      return;
    }
    wrapperRef.current?.animate(
      [{ opacity: 0.2, transform: 'scale(0.985)' }, { opacity: 1, transform: 'none' }],
      { duration: 260, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' }
    );
  }, [flipped]);

  const lastMove = game.lastMoveMetaData
    ? { from: game.lastMoveMetaData.startIndex, to: game.lastMoveMetaData.endIndex }
    : null;

  return (
    <div ref={wrapperRef}>
      {board.isGameOverModalOpen && <GameOverModal isOpen onClose={board.closeGameOverModal} game={game} />}
      <BoardView
        pieces={game.board.squares.map((s) => s.piece)}
        flipped={flipped}
        lastMove={lastMove}
        selected={board.selected}
        targets={board.targets}
        checkSquare={board.checkSquare}
        draggableColor={board.canMove ? game.activeColor : null}
        onSquareClick={board.handleSquareClicked}
        onPieceDragStart={board.handleDragStart}
        onSquareDrop={board.handleDrop}
        overlay={board.promotion && (
          <PromotionPicker
            square={board.promotion.end}
            color={game.activeColor}
            flipped={flipped}
            onSelect={board.choosePromotion}
            onCancel={board.cancelPromotion}
          />
        )}
      />
    </div>
  );
}
