import { FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export function TimeControls() {
  return (
    <Box className='flex flex-col my-2 gap-4'>
      <Text className='underline' fontWeight={500}>
        Time Controls
      </Text>
      <RadioGroup className='ml-2' size='sm'>
        <Stack direction='column'>
          <Radio value='1'>Free Play</Radio>
          <Radio value='2'>Blitz</Radio>
          <Radio value='3'>Rapid</Radio>
          <Radio value='4'>Classical</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
}
