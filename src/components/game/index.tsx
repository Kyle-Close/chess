import { Board } from '../board';
import { PlayerData } from '../player-data';

export function Game() {
  return (
    <div className='flex flex-col grow min-h-full min-w-sm justify-center items-center gap-2 max-w-sm'>
      <PlayerData isWhite={true} />
      <Board />
      <PlayerData isWhite={false} />
    </div>
  );
}
