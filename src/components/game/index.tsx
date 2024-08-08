import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/useBoard';
import { useUndoRedoMove } from '../../hooks/useUndoRedoMove';
import { UndoButton } from '../UndoButton';
import { Board } from '../board';
import { PlayerData } from '../player-data';
import { RedoButton } from '../RedoButton';
import { GameOver } from '../game-over';
import { MatchResult, setIsPlaying } from '../../redux/slices/gameInfo';
import { useEffect, useState } from 'react';
import { PromotePawnModal } from '../promote';
import { setIsOn } from '../../redux/slices/timer';
import { selectPlayerById } from '../../redux/slices/player';

export function Game() {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const [showModal, setShowModal] = useState(gameInfo.matchResult !== MatchResult.ONGOING);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const { undo, redo } = useUndoRedoMove();

  if (!gameInfo.whitePlayerId || !gameInfo.blackPlayerId) return <></>;
  const showPromotion = gameInfo.pawnPromotionSquare !== null;

  useEffect(() => {
    if (gameInfo.matchResult !== MatchResult.ONGOING) setShowModal(true);
  }, [gameInfo.matchResult]);

  useEffect(() => {
    if (!gameInfo.isPlaying) return;

    if (whitePlayer.isTurn) {
      dispatch(setIsOn({ id: whitePlayer.id, isOn: true }));
      dispatch(setIsOn({ id: blackPlayer.id, isOn: false }));
    } else {
      dispatch(setIsOn({ id: whitePlayer.id, isOn: false }));
      dispatch(setIsOn({ id: blackPlayer.id, isOn: true }));
    }
  }, [gameInfo.isPlaying]);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  return (
    <div className={getGameClasses()}>
      <GameOver isOpen={showModal} closeModal={closeModal} />
      <PromotePawnModal isOpen={showPromotion} onClose={() => {}} />
      <PlayerData playerId={gameInfo.blackPlayerId} openModal={openModal} />
      <Board />
      <PlayerData playerId={gameInfo.whitePlayerId} openModal={openModal} />
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
