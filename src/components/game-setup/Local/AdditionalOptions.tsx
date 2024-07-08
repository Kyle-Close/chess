import { FormLabel, Text } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { UseLocalSetupReturn } from '../../../hooks/useLocalSetup';

interface AdditionalOptionsProps {
  localSetup: UseLocalSetupReturn;
}

export function AdditionalOptions({ localSetup }: AdditionalOptionsProps) {
  return (
    <Box className='flex flex-col gap-2'>
      <Text className='underline' fontWeight={500}>
        Additional Options
      </Text>
      <Box className='flex gap-3 items-center'>
        <Switch
          onChange={(e) => localSetup.updateIsIncrement(e.target.checked)}
          size='sm'
          id='increment-time'
        />
        <FormLabel fontSize='0.9rem' htmlFor='increment-time' mb='0'>
          Increment time on move
        </FormLabel>
      </Box>
      <Box className='flex gap-3 items-center'>
        <Switch
          onChange={(e) => localSetup.updateIsUndoRedo(e.target.checked)}
          size='sm'
          id='undo-redo-moves'
        />
        <FormLabel fontSize='0.9rem' htmlFor='undo-redo-moves' mb='0'>
          Undo/redo moves
        </FormLabel>
      </Box>
      <Box className='flex gap-3 items-center'>
        <Switch
          defaultChecked
          onChange={(e) => localSetup.updateIsFiftyMoveRule(e.target.checked)}
          size='sm'
          id='fifty-move-rule'
        />
        <FormLabel fontSize='0.9rem' htmlFor='fifty-move-rule' mb='0'>
          Fifty-move rule
        </FormLabel>
      </Box>
    </Box>
  );
}
