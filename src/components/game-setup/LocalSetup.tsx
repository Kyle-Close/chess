import { FormLabel, Input, Stack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Switch } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export function LocalSetup() {
  return (
    <Box className='flex flex-col my-2 gap-4'>
      <Box className='flex flex-col gap-2'>
        <Text>White</Text>
        <Input size='sm' placeholder='Player name (optional)' />
      </Box>
      <Box className='flex flex-col gap-2'>
        <Text>Black</Text>
        <Input size='sm' placeholder='Player name (optional)' />
      </Box>
      <Box className='flex flex-col gap-2'>
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
      <Box className='flex flex-col gap-2'>
        <Text className='underline' fontWeight={500}>
          Additional Options
        </Text>
        <Box className='flex gap-3'>
          <Switch id='increment-time' />
          <FormLabel fontSize='0.9rem' htmlFor='increment-time' mb='0'>
            Increment time on move
          </FormLabel>
        </Box>
        <Box className='flex gap-3'>
          <Switch id='undo-redo-moves' />
          <FormLabel fontSize='0.9rem' htmlFor='undo-redo-moves' mb='0'>
            Undo/redo moves
          </FormLabel>
        </Box>
        <Box className='flex gap-3'>
          <Switch id='fifty-move-rule' />
          <FormLabel fontSize='0.9rem' htmlFor='fifty-move-rule' mb='0'>
            Fifty-move rule
          </FormLabel>
        </Box>
      </Box>
    </Box>
  );
}
