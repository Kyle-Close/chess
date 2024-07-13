import { Box } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../hooks/useLocalGameSetup';

interface PlayerNameInputsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function PlayerNameInputs({ register }: PlayerNameInputsProps) {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Text>White</Text>
        <Input size='sm' placeholder='Player name (optional)' {...register('whiteName')} />
      </Box>
      <Box className='flex flex-col gap-2'>
        <Text>Black</Text>
        <Input size='sm' placeholder='Player name (optional)' {...register('blackName')} />
      </Box>
    </>
  );
}
