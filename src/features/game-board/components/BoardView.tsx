import { DragEvent, ReactNode, useState } from 'react';
import { Color } from 'base/zod/emums/Color';
import { PieceType } from 'base/zod/emums/PieceType';
import { getPieceName, getPieceSrc } from '../utils/pieceAssets';
import { getSquareName } from '../utils/board-utility/squareName';

export interface BoardPiece {
  pieceType: PieceType;
  color: Color;
}

export type MoveHint = 'move' | 'capture';

interface BoardViewProps {
  /** 64 entries, index 0 = a8 ... index 63 = h1 */
  pieces: (BoardPiece | null)[];
  flipped?: boolean;
  lastMove?: { from: number; to: number } | null;
  selected?: number | null;
  targets?: Map<number, MoveHint>;
  checkSquare?: number | null;
  showCoords?: boolean;
  /** Pieces of this color can be picked up and dragged */
  draggableColor?: Color | null;
  onSquareClick?: (index: number) => void;
  onPieceDragStart?: (index: number) => void;
  onSquareDrop?: (index: number) => void;
  overlay?: ReactNode;
}

export function BoardView({
  pieces,
  flipped = false,
  lastMove = null,
  selected = null,
  targets,
  checkSquare = null,
  showCoords = true,
  draggableColor = null,
  onSquareClick,
  onPieceDragStart,
  onSquareDrop,
  overlay,
}: BoardViewProps) {
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  const toDisplay = (index: number) => (flipped ? 63 - index : index);

  const handleDragStart = (index: number, e: DragEvent<HTMLImageElement>) => {
    e.dataTransfer.effectAllowed = 'move';
    // Center the drag image on the cursor, the way a physical piece is held
    const img = e.currentTarget;
    e.dataTransfer.setDragImage(img, img.width / 2, img.height / 2);
    setDragFrom(index);
    onPieceDragStart?.(index);
  };

  const endDrag = () => {
    setDragFrom(null);
    setDragOver(null);
  };

  return (
    <div className='board-wrap'>
      <div className='board' onContextMenu={(e) => e.preventDefault()}>
        {Array.from({ length: 64 }, (_, display) => {
          const index = flipped ? 63 - display : display;
          const row = Math.floor(display / 8);
          const col = display % 8;
          const isDark = (row + col) % 2 === 1;
          const piece = pieces[index];
          const hint = targets?.get(index);
          const isLastTo = lastMove?.to === index;

          let pieceStyle: React.CSSProperties | undefined;
          if (isLastTo && lastMove) {
            const from = toDisplay(lastMove.from);
            pieceStyle = {
              ['--from-x' as string]: `${((from % 8) - col) * 100}%`,
              ['--from-y' as string]: `${(Math.floor(from / 8) - row) * 100}%`,
            };
          }

          const label = `${getSquareName(index)}${piece ? `, ${getPieceName(piece.pieceType, piece.color)}` : ''}`;

          return (
            <div
              key={index}
              className={`sq${isDark ? ' sq--dark' : ''}`}
              aria-label={label}
              data-last={lastMove !== null && (lastMove.from === index || lastMove.to === index)}
              data-selected={selected === index}
              data-check={checkSquare === index}
              data-target={hint !== undefined}
              data-drop={dragOver === index && hint !== undefined}
              onClick={() => onSquareClick?.(index)}
              onDragOver={(e) => {
                if (dragFrom === null) return;
                e.preventDefault();
                if (dragOver !== index) setDragOver(index);
              }}
              onDrop={(e) => {
                e.preventDefault();
                endDrag();
                onSquareDrop?.(index);
              }}
            >
              {showCoords && col === 0 && (
                <span className='coord coord--rank'>{flipped ? row + 1 : 8 - row}</span>
              )}
              {showCoords && row === 7 && (
                <span className='coord coord--file'>{(flipped ? 'hgfedcba' : 'abcdefgh')[col]}</span>
              )}
              {piece && (
                <img
                  key={isLastTo ? `moving-${lastMove?.from}-${index}` : 'still'}
                  src={getPieceSrc(piece.pieceType, piece.color)}
                  alt=''
                  className={[
                    'piece',
                    isLastTo ? 'piece--moving' : '',
                    dragFrom === index ? 'piece--ghost' : '',
                  ].join(' ')}
                  style={pieceStyle}
                  draggable={draggableColor !== null && piece.color === draggableColor}
                  onDragStart={(e) => handleDragStart(index, e)}
                  onDragEnd={endDrag}
                />
              )}
              {hint && <div className={`sq__hint${hint === 'capture' ? ' sq__hint--capture' : ''}`} />}
            </div>
          );
        })}
        {overlay}
      </div>
    </div>
  );
}
