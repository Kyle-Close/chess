import { Color } from 'base/zod/emums/Color';
import { PieceType } from 'base/zod/emums/PieceType';
import { getPieceName, getPieceSrc } from '../utils/pieceAssets';

const CHOICES = [PieceType.QUEEN, PieceType.KNIGHT, PieceType.ROOK, PieceType.BISHOP];

interface PromotionPickerProps {
  square: number;
  color: Color;
  flipped: boolean;
  onSelect: (pieceType: PieceType) => void;
  onCancel: () => void;
}

/** Lichess-style picker: a column of pieces that drops down from the promotion square */
export function PromotionPicker({ square, color, flipped, onSelect, onCancel }: PromotionPickerProps) {
  const display = flipped ? 63 - square : square;
  const col = display % 8;
  const fromTop = Math.floor(display / 8) === 0;
  const choices = fromTop ? CHOICES : [...CHOICES].reverse();

  return (
    <div className='board__overlay' onClick={onCancel} role='dialog' aria-label='Choose promotion piece'>
      <div
        className='promo'
        style={{ left: `${col * 12.5}%`, ...(fromTop ? { top: 0 } : { bottom: 0 }) }}
        onClick={(e) => e.stopPropagation()}
      >
        {choices.map((pieceType, i) => (
          <button
            key={pieceType}
            type='button'
            autoFocus={i === (fromTop ? 0 : choices.length - 1)}
            aria-label={`Promote to ${getPieceName(pieceType, color)}`}
            onClick={() => onSelect(pieceType)}
          >
            <img src={getPieceSrc(pieceType, color)} alt='' />
          </button>
        ))}
      </div>
    </div>
  );
}
