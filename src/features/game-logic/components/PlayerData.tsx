import { Timer } from './Timer';
import whitePlayerImg from 'base/assets/profile-white.png'
import blackPlayerImg from 'base/assets/profile-black.png'
import { useAppSelector } from '../../game-board/hooks/useBoard';
import { selectPlayerById } from '../../../redux/slices/player';
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import { TimeControl } from '../../../redux/slices/gameSettings';
import { ResignButton } from './ResignButton';
import { OfferDrawButton } from './OfferDrawButton';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';

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
  const reverse = player.color === PieceColor.BLACK;

  return (
    <Box className={getPlayerDataClasses()}>
      <Box className='flex gap-4'>
        <Box alignSelf={reverse ? 'end' : 'start'} className='flex gap-4 grow-0'>
          <img
            className='max-w-12 max-h-12 ml-4'
            src={player.color === PieceColor.WHITE ? whitePlayerImg : blackPlayerImg}
          />
          <Box className='flex flex-col gap-2 justify-end'>
            <Text opacity='0.8' fontSize='small' color={materialDiffColor}>
              {materialDiff === 0 ? '' : displayValue}
            </Text>
            <Heading
              visibility={player.name ? 'visible' : 'hidden'}
              as='h6'
              className='font-medium'
              fontSize='x-large'
            >
              {player.name ? player.name : 'hidden'}
            </Heading>
          </Box>
        </Box>
      </Box>
      <Grid
        templateColumns='1fr'
        templateRows='auto auto'
        gridTemplateAreas={reverse ? `"buttons" "timer"` : `"timer" "buttons"`}
        gap={4}
      >
        {showTimer && (
          <GridItem gridArea='timer'>
            <Timer timerId={player.timerId} color={player.color} />
          </GridItem>
        )}
        <GridItem gridArea='buttons' className='flex gap-2 items-end'>
          <OfferDrawButton playerId={playerId} openModal={openModal} />
          <ResignButton playerId={playerId} openModal={openModal} />
        </GridItem>
      </Grid>
    </Box>
  );
}

function getPlayerDataClasses(isShowWhiteBottom = false) {
  const core = ['flex', 'w-full', 'justify-between', 'p-2'];
  const flipped = isShowWhiteBottom ? ['rotate-180'] : [];

  return [...core, ...flipped].join(' ');
}
