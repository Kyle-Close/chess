import { Timer } from './Timer';
import whitePlayerImg from '../../assets/profile-white.png';
import blackPlayerImg from '../../assets/profile-black.png';
import { useAppSelector } from '../../hooks/useBoard';
import { selectPlayerById } from '../../redux/slices/player';
import { PieceColor } from '../../enums/PieceColor';
import { Box, Heading, Text } from '@chakra-ui/react';
import { TimeControl } from '../../redux/slices/gameSettings';
import { ResignButton } from '../resign/ResignButton';
import { OfferDrawButton } from '../offer-draw';

interface PlayerDataProps {
  playerId: string;
  materialDiff: number;
  openModal: () => void;
}
export function PlayerData({ playerId, openModal, materialDiff }: PlayerDataProps) {
  const player = useAppSelector((state) => selectPlayerById(state, playerId));
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const showTimer = gameSettings.timeControl !== TimeControl.FREE_PLAY;
  const materialDiffColor = materialDiff >= 0 ? 'green.200' : 'red.300';
  const displayValue = materialDiff >= 0 ? `+${materialDiff}` : materialDiff;

  return (
    <Box className={getPlayerDataClasses()}>
      <Box className='flex gap-4'>
        <Box className='flex gap-4 grow-0 self-start'>
          <img
            className='max-w-12 max-h-12 ml-4'
            src={player.color === PieceColor.WHITE ? whitePlayerImg : blackPlayerImg}
          />
          <Box className='flex flex-col gap-2 justify-end'>
            <Text opacity='0.8' fontSize='small' color={materialDiffColor}>
              {materialDiff === 0 ? '' : displayValue}
            </Text>
            <Heading as='h6' className='font-medium' fontSize='x-large'>
              {player.name}
            </Heading>
          </Box>
        </Box>
      </Box>
      <Box className='flex gap-4 flex-col items-center'>
        {showTimer && <Timer timerId={player.timerId} color={player.color} />}
        <Box className='flex gap-2 items-end'>
          <OfferDrawButton playerId={playerId} openModal={openModal} />
          <ResignButton playerId={playerId} openModal={openModal} />
        </Box>
      </Box>
    </Box>
  );
}

function getPlayerDataClasses(isShowWhiteBottom = false) {
  const core = ['flex', 'w-full', 'justify-between', 'p-2'];
  const flipped = isShowWhiteBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
