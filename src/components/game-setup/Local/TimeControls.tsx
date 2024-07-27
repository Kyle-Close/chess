import { Select, Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../hooks/useLocalGameSetup';
import { TimeControl } from '../../../redux/slices/gameSettings';

interface TimeControlsProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function TimeControls({ register }: TimeControlsProps) {
  const freePlayString = TimeControl.FREE_PLAY;
  const blitzString = TimeControl.BLITZ;
  const rapidString = TimeControl.RAPID;
  const classicalString = TimeControl.CLASSICAL;

  return (
    <Box className='flex flex-col my-2 gap-4'>
      <Text className='underline' fontWeight={500}>
        Time Control
      </Text>
      <Select
        iconColor='black'
        className='text-black font-semibold'
        bg=''
        size='sm'
        {...register('selectedTimeControl')}
      >
        <option className='font-semibold' value={blitzString}>
          {blitzString}
        </option>
        <option className='font-semibold' value={rapidString}>
          {rapidString}
        </option>
        <option className='font-semibold' value={classicalString}>
          {classicalString}
        </option>
        <option className='font-semibold' value={freePlayString}>
          {freePlayString}
        </option>
      </Select>
    </Box>
  );
}
