import { Timer } from './Timer';
import whitePlayerImg from '../../assets/profile-white.png';
import blackPlayerImg from '../../assets/profile-black.png';
import { useContext } from 'react';
import { GameState } from '../../context/game-state/GameState';

interface PlayerDataProps {
  isWhite: boolean;
}
export function PlayerData({ isWhite }: PlayerDataProps) {
  const gameState = useContext(GameState);
  return (
    <div className={getPlayerDataClasses(gameState.showWhiteOnBottom)}>
      <img className='max-w-12 max-h-12 ml-4' src={isWhite ? whitePlayerImg : blackPlayerImg} />
      <Timer isWhite={isWhite} />
    </div>
  );
}

function getPlayerDataClasses(isShowWhiteBottom: boolean) {
  const core = ['flex', 'w-full', 'justify-between', 'p-2', 'items-center'];
  const flipped = isShowWhiteBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
