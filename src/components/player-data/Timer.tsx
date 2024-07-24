import clockImg from '../../assets/clock.png';
import { PieceColor } from '../../enums/PieceColor';
import { convertSecondsToMin } from '../../helpers/utilities/convertSecondsToMin';
import { useTimer } from '../../hooks/useTimer';

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
