import { Board } from '../board';
import { PlayerData } from '../player-data';

export function Game() {
  return (
    <div className='flex flex-col min-h-full justify-center gap-2'>
      <PlayerData isWhite={true} />
      <Board />
      <PlayerData isWhite={false} />
    </div>
  );
}
