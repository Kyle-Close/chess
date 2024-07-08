import { Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { TimeControl } from '../../../hooks/useGameSettings';
import { UseLocalSetupReturn } from '../../../hooks/useLocalSetup';

interface TimeControlsProps {
  localSetup: UseLocalSetupReturn;
}

export function TimeControls({ localSetup }: TimeControlsProps) {
  const handleChange = (e: string) => {
    if (e === TimeControl.FREE_PLAY.toString())
      localSetup.updateSelectedTimeControl(TimeControl.FREE_PLAY);
    else if (e === TimeControl.BLITZ.toString())
      localSetup.updateSelectedTimeControl(TimeControl.BLITZ);
    else if (e === TimeControl.RAPID.toString())
      localSetup.updateSelectedTimeControl(TimeControl.RAPID);
    else if (e === TimeControl.CLASSICAL.toString())
      localSetup.updateSelectedTimeControl(TimeControl.CLASSICAL);
    else throw new Error('Invalid radio button selection. Not a time control.');
  };

  return (
    <Box className='flex flex-col my-2 gap-4'>
      <Text className='underline' fontWeight={500}>
        Time Controls
      </Text>
      <RadioGroup onChange={handleChange} className='ml-2' size='sm'>
        <Stack direction='column'>
          <Radio defaultChecked value={TimeControl.FREE_PLAY.toString()}>
            Free Play
          </Radio>
          <Radio value={TimeControl.BLITZ.toString()}>Blitz</Radio>
          <Radio value={TimeControl.RAPID.toString()}>Rapid</Radio>
          <Radio value={TimeControl.CLASSICAL.toString()}>Classical</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}
