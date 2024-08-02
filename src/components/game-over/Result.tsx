import { Box, Button, Heading, Text } from '@chakra-ui/react';
import ChessPlayerImg from '../../assets/profile-white.png';

export function Result() {
  return (
    <Box className='flex flex-col bg-gray-300 gap-12'>
      <Heading as='h1' textAlign='center' fontFamily='Montserrat Alternates' fontSize='large'>
        White Win by Checkmate!
      </Heading>
      <Box className='flex gap-10 justify-between items-end'>
        <Box className='max-w-16 max-h-16' as='img' src={ChessPlayerImg} />
        <Box className='flex-grow flex flex-col gap-2'>
          <Button
            colorScheme='green'
            borderRadius='99999px'
            className='w-24 self-center border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
          >
            Rematch
          </Button>
          <Button
            colorScheme='blue'
            borderRadius='99999px'
            className='border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
          >
            New Game
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
