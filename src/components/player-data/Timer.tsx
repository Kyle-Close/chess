import { useContext } from 'react';
import { GameState } from '../../context/game-state/GameState';
import clockImg from '../../assets/clock.png';
import { convertSecondsToMin } from '../../helpers/utilities/convertSecondsToMin';

interface TimerProps {
  isWhite: boolean;
  onComplete: () => void;
}
export function Timer({ isWhite, onComplete }: TimerProps) {
  const gameState = useContext(GameState);
  const player = isWhite ? gameState.whitePlayer : gameState.blackPlayer;
  const timeLeft = player.timer.remainingSeconds;
  if (player.timer.isTimeOut) {
    gameState.updateMatchResult();
  }
  console.log(player.timer.isTimeOut);

  return (
    <div className='w-36 h-12 bg-slate-100 rounded-md  border-2 border-black flex px-4 justify-between items-center'>
      <img className='max-w-6' src={clockImg} />
      <h6 className='text-black font-bold text-lg'>{convertSecondsToMin(timeLeft)}</h6>
    </div>
  );
}
