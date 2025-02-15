import { PieceColor } from 'base/features/game-board/hooks/usePiece';
import { convertSecondsToMin } from 'base/utils/convertSecondsToMin';
import { useTimer } from '../hooks/useTimer';
import clockImg from 'base/assets/clock.png'

interface TimerProps {
  timerId: string;
  color: PieceColor;
}
export function Timer({ timerId, color }: TimerProps) {
  const timer = useTimer({ id: timerId, color: color });

  return (
    <div className='w-36 h-12 bg-slate-100 rounded-md  border-2 border-black flex px-4 justify-between items-center'>
      <img className='max-w-6' src={clockImg} />
      <h6 className='text-black font-bold text-lg'>
        {convertSecondsToMin(timer.remainingSeconds)}
      </h6>
    </div>
  );
}
