import { Box, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks/useBoard';
import { selectPlayerById } from '../../redux/slices/player';
import { selectTimerById } from '../../redux/slices/timer';

export function Stats() {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const whitePlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.whitePlayerId));
  const blackPlayer = useAppSelector((state) => selectPlayerById(state, gameInfo.blackPlayerId));
  const whiteTimer = useAppSelector((state) => selectTimerById(state, whitePlayer.timerId));
  const blackTimer = useAppSelector((state) => selectTimerById(state, blackPlayer.timerId));

  function buildTimeRemaining() {
    return (
      <>
        <Text>Time Remaining</Text>
        <Text>{whiteTimer.remainingSeconds}</Text>
        <Text>{blackTimer.remainingSeconds}</Text>
      </>
    );
  }

  return (
    <Box className='bg-black grid grid-cols-3 gap-4'>
      <Box />
      <Text>White</Text>
      <Text>Black</Text>
      {buildTimeRemaining()}
    </Box>
  );
}
