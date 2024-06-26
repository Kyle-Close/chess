import { Timer } from './Timer';
import whitePlayerImg from '../../assets/profile-white.png';
import blackPlayerImg from '../../assets/profile-black.png';

interface PlayerDataProps {
  isWhite: boolean;
}
export function PlayerData({ isWhite }: PlayerDataProps) {
  return (
    <div className='flex w-full justify-between p-2 items-center'>
      <img className='max-w-12 max-h-12 ml-4' src={isWhite ? whitePlayerImg : blackPlayerImg} />
      <Timer isWhite={isWhite} />
    </div>
  );
}
