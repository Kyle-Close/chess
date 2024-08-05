import { Timer } from './Timer';
import whitePlayerImg from '../../assets/profile-white.png';
import blackPlayerImg from '../../assets/profile-black.png';
import { useAppSelector } from '../../hooks/useBoard';
import { selectPlayerById } from '../../redux/slices/player';
import { PieceColor } from '../../enums/PieceColor';
import { Box, Text } from '@chakra-ui/react';
import { TimeControl } from '../../redux/slices/gameSettings';
import { ResignButton } from '../resign/ResignButton';
import { OfferDrawButton } from '../offer-draw';

interface PlayerDataProps {
  playerId: string;
  openModal: () => void;
}
export function PlayerData({ playerId, openModal }: PlayerDataProps) {
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const showTimer = gameSettings.timeControl !== TimeControl.FREE_PLAY;

  return (
    <Box className={getPlayerDataClasses()}>
      <Box className='flex gap-4 items-end'>
        <img
          className='max-w-12 max-h-12 ml-4'
          src={player.color === PieceColor.WHITE ? whitePlayerImg : blackPlayerImg}
        />
        <Text className=''>{player.name}</Text>
      </Box>
      <Box className='flex gap-4 items-center'>
        <Box className='flex gap-2 items-center'>
          <OfferDrawButton playerId={playerId} openModal={openModal} />
          <ResignButton playerId={playerId} openModal={openModal} />
        </Box>
        {showTimer && <Timer timerId={player.timerId} color={player.color} />}
      </Box>
    </Box>
  );
}

function getPlayerDataClasses(isShowWhiteBottom = false) {
  const core = ['flex', 'w-full', 'justify-between', 'p-2', 'items-end'];
  const flipped = isShowWhiteBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
