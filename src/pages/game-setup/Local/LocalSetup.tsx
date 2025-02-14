import { Box, Button } from '@chakra-ui/react';
import { PlayerNameInputs } from './PlayerNameInputs';
import { TimeControls } from './TimeControls';
import { AdditionalOptions } from './AdditionalOptions';
import { useGameSettings } from '../../../features/game-settings/hooks/useGameSettings';
import { FenInput } from './FenInput';

export function LocalSetup() {
  const gameSettings = useGameSettings();
  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={gameSettings.handleSubmit(gameSettings.onLocalFormSubmit)}
    >
      <PlayerNameInputs register={gameSettings.register} />
      <TimeControls register={gameSettings.register} />
      <AdditionalOptions register={gameSettings.register} />
      <FenInput register={gameSettings.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}
