import { Box, Button } from '@chakra-ui/react';

export function ButtonSection() {
  return (
    <Box className='flex-grow flex flex-col gap-2'>
      <Button
        fontSize='large'
        colorScheme='green'
        borderRadius='99999px'
        className='w-24 self-center border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
      >
        Rematch
      </Button>
      <Button
        fontSize='large'
        colorScheme='blue'
        borderRadius='99999px'
        className='border-black border-2 drop-shadow-lg hover:scale-105 active:scale-95'
      >
        New Game
      </Button>
    </Box>
  );
}
