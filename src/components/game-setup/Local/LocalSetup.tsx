import { Box } from '@chakra-ui/react';
import { PlayerNameInputs } from './PlayerNameInputs';
import { TimeControls } from './TimeControls';
import { AdditionalOptions } from './AdditionalOptions';
import { useLocalSetup } from '../../../hooks/useLocalSetup';

export function LocalSetup() {
  const localSetup = useLocalSetup();
  return (
    <Box className='flex flex-col my-2 gap-4'>
      <PlayerNameInputs localSetup={localSetup} />
      <TimeControls localSetup={localSetup} />
      <AdditionalOptions localSetup={localSetup} />
    </Box>
  );
}
