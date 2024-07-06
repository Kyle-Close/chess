import { useContext } from 'react';
import { Board } from '../board';
import { PlayerData } from '../player-data';
import { GameState } from '../../context/game-state/GameState';

export function Game() {
  const gameState = useContext(GameState);

  return (
    <div className={getGameClasses(gameState.showWhiteOnBottom)}>
      <PlayerData isWhite={true} />
      <Board />
      <PlayerData isWhite={false} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom: boolean) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
