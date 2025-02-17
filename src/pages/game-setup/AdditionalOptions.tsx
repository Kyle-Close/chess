import { Field, Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { Switch } from 'base/components/ui/switch';
import { LocalGameSetupFormInputs } from 'base/features/game-settings/hooks/useGameSettings';

interface AdditionalOptionsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function AdditionalOptions({ register }: AdditionalOptionsProps) {
  return (
    <Box className='flex flex-col gap-2'>
      <Text className='underline' fontWeight={500}>
        Additional Options
      </Text>
      <Field.Root className='flex gap-3 items-center'>
        <Switch size='sm' id='increment-time' {...register('isIncrement')} />
        <Field.Label fontSize='0.9rem' htmlFor='increment-time' mb='0'>
          Increment time on move
        </Field.Label>
      </Field.Root>
      <Field.Root className='flex gap-3 items-center'>
        <Switch size='sm' id='undo-redo-moves' {...register('isUndoRedo')} />
        <Field.Label fontSize='0.9rem' htmlFor='undo-redo-moves' mb='0'>
          Undo/redo moves
        </Field.Label>
      </Field.Root>
      <Field.Root className='flex gap-3 items-center'>
        <Switch defaultChecked size='sm' id='fifty-move-rule' {...register('isFiftyMoveRule')} />
        <Field.Label fontSize='0.9rem' htmlFor='fifty-move-rule' mb='0'>
          Fifty-move rule
        </Field.Label>
      </Field.Root>
    </Box>
  );
}
