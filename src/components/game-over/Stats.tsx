import { Box, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useBoard';
import { selectPlayerById } from '../../redux/slices/player';
import { selectTimerById } from '../../redux/slices/timer';

interface GameOverDataRow {
  title: string;
  whiteData: string;
  blackData: string;
}

export function Stats() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const whiteTimer = useAppSelector((state) => selectTimerById(state, whitePlayer.timerId));
  const blackTimer = useAppSelector((state) => selectTimerById(state, blackPlayer.timerId));

  const titleClass = 'text-white';
  const dataClass = 'text-green-200';

  function buildDataRow(data: GameOverDataRow) {
    return (
      <>
        <Text fontWeight='bold' fontSize='large' fontFamily='caveat' className={titleClass}>
          {data.title}
        </Text>
        <Box borderRight='1px solid white' className='flex flex-grow justify-center'>
          <Text
            alignSelf='center'
            justifySelf='center'
            fontFamily='Montserrat Alternates'
            className={dataClass}
          >
            {data.whiteData}
          </Text>
        </Box>
        <Box className='flex flex-grow justify-center'>
          <Text
            alignSelf='center'
            justifySelf='center'
            fontFamily='Montserrat Alternates'
            className={dataClass}
          >
            {data.blackData}
          </Text>
        </Box>
      </>
    );
  }

  return (
    <Box borderRadius='0 0 1rem 1rem' className='bg-black grid grid-cols-3 p-4 py-6'>
      <Box mb='1rem' />
      <Text
        mb='1rem'
        fontWeight='bold'
        justifySelf='center'
        fontSize='x-large'
        fontFamily='caveat'
        className={titleClass}
      >
        White
      </Text>
      <Text
        mb='1rem'
        fontWeight='bold'
        justifySelf='center'
        fontSize='x-large'
        fontFamily='caveat'
        className={titleClass}
      >
        Black
      </Text>
      {buildDataRow({ title: 'Clock', whiteData: '3:00', blackData: '0:20' })}
      {buildDataRow({ title: 'Captures', whiteData: '12', blackData: '10' })}
      {buildDataRow({ title: 'Total Moves', whiteData: '25', blackData: '25' })}
    </Box>
  );
}
