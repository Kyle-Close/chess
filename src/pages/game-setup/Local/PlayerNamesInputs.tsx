import { Box } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../features/game-settings/hooks/useGameSettings';

interface PlayerNamesInputsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function PlayerNamesInputs({ register }: PlayerNamesInputsProps) {
  return (
    <>
      <Box className='flex gap-2 items-end'>
        <Text className='basis-1/5 font-semibold'>White</Text>
        <Input
          variant='flushed'
          className='basis-4/5'
          size='sm'
          placeholder='Player name (optional)'
          {...register('whiteName')}
        />
      </Box>
      <Box className='flex gap-2 items-end'>
        <Text className='basis-1/5 font-semibold'>Black</Text>
        <Input
          variant='flushed'
          className='basis-4/5'
          size='sm'
          placeholder='Player name (optional)'
          {...register('blackName')}
        />
      </Box>
    </>
  );
}
