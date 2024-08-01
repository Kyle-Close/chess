import { Box, Button, Heading, Text } from '@chakra-ui/react';
import ChessPlayerImg from '../../assets/profile-white.png';

export function Result() {
  return (
    <Box className='flex flex-col bg-gray-300 gap-4'>
      <Heading as='h1' textAlign='center' fontFamily='Montserrat Alternates' fontSize='large'>
        White Win by Checkmate!
      </Heading>
      <Box className='flex gap-4 justify-between items-end'>
        <Box className='max-w-16 max-h-16' as='img' src={ChessPlayerImg} />
        <Box className='flex flex-col gap-2'>
          <Button borderRadius='99999px' className='w-24'>
            Rematch
          </Button>
          <Button borderRadius='99999px'>New Game</Button>
        </Box>
      </Box>
    </Box>
  );
}
