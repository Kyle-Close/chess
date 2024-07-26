import { useAppSelector } from '../../hooks/useBoard';
import { Board } from '../board';
import { PlayerData } from '../player-data';

export function Game() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  if (!gameInfo.whitePlayerId || !gameInfo.blackPlayerId) return <></>;
  return (
    <div className={getGameClasses()}>
      <PlayerData playerId={gameInfo.blackPlayerId} />
      <Board />
      <PlayerData playerId={gameInfo.whitePlayerId} />
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
