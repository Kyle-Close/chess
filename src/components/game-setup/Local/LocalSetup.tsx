import { Box, Button } from '@chakra-ui/react';
import { PlayerNameInputs } from './PlayerNameInputs';
import { TimeControls } from './TimeControls';
import { AdditionalOptions } from './AdditionalOptions';
import { useLocalGameSetup } from '../../../hooks/useLocalGameSetup';

export function LocalSetup() {
  const localSetup = useLocalGameSetup();
  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={localSetup.handleSubmit(localSetup.onSubmit)}
    >
      <PlayerNameInputs register={localSetup.register} />
      <TimeControls register={localSetup.register} />
      <AdditionalOptions register={localSetup.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}
