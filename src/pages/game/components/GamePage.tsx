import { Box } from '@chakra-ui/react';
import { useAppSelector } from 'base/features/game-board/hooks/useBoard';
import { useUndoRedoMove } from 'base/features/game-logic/hooks/useUndoRedoMove';
import { useGamePage } from '../hooks/useGamePage';
import { PromotePawnModal } from 'base/features/game-logic/modals/PromotePawnModal';
import { Board } from 'base/features/game-board/components/Board';
import { GameOver } from 'base/features/game-logic/modals/game-over';
import { RedoButton } from 'base/features/game-logic/components/RedoButton';
import { UndoButton } from 'base/features/game-logic/components/UndoButton';
import { PlayerData } from 'base/features/game-logic/components/PlayerData';

export function GamePage() { // this should be under a pages directory.
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const { undo, redo } = useUndoRedoMove();
  const gamePage = useGamePage()

  if (!gamePage) return <></>

  return (
    <div className={getGameClasses()}>
      <GameOver isOpen={gamePage.showModal} closeModal={gamePage.closeModal} />
      <PromotePawnModal isOpen={gamePage.showPromotion} onClose={() => { }} />
      <PlayerData
        materialDiff={gamePage.blackMaterialDiff}
        playerId={gamePage.gameInfo.blackPlayerId}
        openModal={gamePage.openModal}
      />
      <Board />
      <PlayerData
        materialDiff={gamePage.whiteMaterialDiff}
        playerId={gamePage.gameInfo.whitePlayerId}
        openModal={gamePage.openModal}
      />
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
