import { Box, Button } from '@chakra-ui/react';
import { useGameSettings } from 'base/features/game-settings/hooks/useGameSettings';
import { TimeControls } from '../TimeControls';
import { AdditionalOptions } from '../AdditionalOptions';
import { FenInput } from '../FenInput';
import { PlayerNamesInputs } from './PlayerNamesInputs';

export function LocalSetup() {
  const gameSettings = useGameSettings();
  return (
    <Box
      as='form'
      className='flex flex-col my-2 gap-4 flex-grow'
      onSubmit={gameSettings.handleSubmit(gameSettings.onLocalFormSubmit)}
    >
      <PlayerNamesInputs register={gameSettings.register} />
      <TimeControls register={gameSettings.register} />
      <AdditionalOptions register={gameSettings.register} />
      <FenInput register={gameSettings.register} />
      <Button mt='auto' type='submit' colorScheme='green'>
        Play
      </Button>
    </Box>
  );
}
