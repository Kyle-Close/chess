import { FormLabel, Text } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../hooks/useLocalGameSetup';

interface AdditionalOptionsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function AdditionalOptions({ register }: AdditionalOptionsProps) {
  return (
    <Box className='flex flex-col gap-2'>
      <Text className='underline' fontWeight={500}>
        Additional Options
      </Text>
      <Box className='flex gap-3 items-center'>
        <Switch size='sm' id='increment-time' {...register('isIncrement')} />
        <FormLabel fontSize='0.9rem' htmlFor='increment-time' mb='0'>
          Increment time on move
        </FormLabel>
      </Box>
      <Box className='flex gap-3 items-center'>
        <Switch size='sm' id='undo-redo-moves' {...register('isUndoRedo')} />
        <FormLabel fontSize='0.9rem' htmlFor='undo-redo-moves' mb='0'>
          Undo/redo moves
        </FormLabel>
      </Box>
      <Box className='flex gap-3 items-center'>
        <Switch defaultChecked size='sm' id='fifty-move-rule' {...register('isFiftyMoveRule')} />
        <FormLabel fontSize='0.9rem' htmlFor='fifty-move-rule' mb='0'>
          Fifty-move rule
        </FormLabel>
      </Box>
    </Box>
  );
}
