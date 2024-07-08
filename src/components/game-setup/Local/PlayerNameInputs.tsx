import { Box } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';

export function PlayerNameInputs() {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Text>White</Text>
        <Input size='sm' placeholder='Player name (optional)' />
      </Box>
      <Box className='flex flex-col gap-2'>
        <Text>Black</Text>
        <Input size='sm' placeholder='Player name (optional)' />
      </Box>
    </>
  );
}
