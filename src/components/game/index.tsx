import { Box } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useBoard';
import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';
import { UndoButton } from '../UndoButton';
import { Board } from '../board';
import { PlayerData } from '../player-data';
import { RedoButton } from '../RedoButton';
import { GameOver } from '../game-over';
import { MatchResult } from '../../redux/slices/gameInfo';
import { useEffect, useState } from 'react';

export function Game() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const [showModal, setShowModal] = useState(gameInfo.matchResult !== MatchResult.ONGOING);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const { undo, redo } = useUndoRedoMove();
  if (!gameInfo.whitePlayerId || !gameInfo.blackPlayerId) return <></>;
  useEffect(() => {
    if (gameInfo.matchResult !== MatchResult.ONGOING) setShowModal(true);
  }, [gameInfo.matchResult]);

  return (
    <div className={getGameClasses()}>
      <GameOver isOpen={showModal} handleClose={() => setShowModal(false)} />
      <PlayerData playerId={gameInfo.blackPlayerId} />
      <Board />
      <PlayerData playerId={gameInfo.whitePlayerId} />
      {gameSettings.isUndoRedo && (
        <Box className='flex justify-end gap-2 mr-6'>
          <UndoButton handleClick={undo} />
          <RedoButton handleClick={redo} />
        </Box>
      )}
    </div>
  );
}

function getGameClasses(isShowWhiteOnBottom = false) {
  const core = ['flex', 'flex-col', 'min-h-full', 'justify-center', 'gap-2'];
  const flipped = isShowWhiteOnBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
