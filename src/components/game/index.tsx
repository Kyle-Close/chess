import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useBoard';
import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';
import { UndoButton } from '../UndoButton';
import { Board } from '../board';
import { PlayerData } from '../player-data';
import { RedoButton } from '../RedoButton';

export function Game() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const { undo, redo } = useUndoRedoMove();
  if (!gameInfo.whitePlayerId || !gameInfo.blackPlayerId) return <></>;
  return (
    <div className={getGameClasses()}>
      <PlayerData playerId={gameInfo.blackPlayerId} />
      <Board />
      <PlayerData playerId={gameInfo.whitePlayerId} />
      <Box>
        <UndoButton handleClick={undo} />
        <RedoButton handleClick={redo} />
      </Box>
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
