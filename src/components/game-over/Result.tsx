import { Box, Button, Text } from '@chakra-ui/react';
import ChessPlayerImg from '../../assets/profile-white.png';

export function Result() {
  return (
    <Box className='flex flex-col bg-gray-300'>
      <Text textAlign='center'>White Win by Checkmate!</Text>
      <Box className='flex gap-4 justify-center'>
        <Box as='img' src={ChessPlayerImg} />
        <Box className='flex flex-col gap-2'>
          <Button>Rematch</Button>
          <Button>New Game</Button>
        </Box>
      </Box>
    </Box>
  );
}
