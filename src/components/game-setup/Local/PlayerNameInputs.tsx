import { Box } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../hooks/useGameSettings';

interface PlayerNameInputsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function PlayerNameInputs({ register }: PlayerNameInputsProps) {
  return (
    <>
      <Box className='flex gap-2 items-end'>
        <Text className='basis-1/5'>White</Text>
        <Input
          className='basis-4/5'
          size='sm'
          placeholder='Player name (optional)'
          {...register('whiteName')}
        />
      </Box>
      <Box className='flex gap-2 items-end'>
        <Text className='basis-1/5'>Black</Text>
        <Input
          className='basis-4/5'
          size='sm'
          placeholder='Player name (optional)'
          {...register('blackName')}
        />
      </Box>
    </>
  );
}
