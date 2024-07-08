import { Box } from '@chakra-ui/react';
import { PlayerNameInputs } from './PlayerNameInputs';
import { TimeControls } from './TimeControls';
import { AdditionalOptions } from './AdditionalOptions';

export function LocalSetup() {
  return (
    <Box className='flex flex-col my-2 gap-4'>
      <PlayerNameInputs />
      <TimeControls />
      <AdditionalOptions />
    </Box>
  );
}
