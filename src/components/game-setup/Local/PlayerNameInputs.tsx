import { Box } from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react';
import { UseLocalSetupReturn } from '../../../hooks/useLocalSetup';
import { PieceColor } from '../../../enums/PieceColor';

interface PlayerNameInputsProps {
  localSetup: UseLocalSetupReturn;
}

export function PlayerNameInputs({ localSetup }: PlayerNameInputsProps) {
  return (
    <>
      <Box className='flex flex-col gap-2'>
        <Text>White</Text>
        <Input
          value={localSetup.whiteName}
          onChange={(e) => localSetup.handleNameUpdate(PieceColor.WHITE, e.target.value)}
          size='sm'
          placeholder='Player name (optional)'
        />
      </Box>
      <Box className='flex flex-col gap-2'>
        <Text>Black</Text>
        <Input
          value={localSetup.blackName}
          onChange={(e) => localSetup.handleNameUpdate(PieceColor.BLACK, e.target.value)}
          size='sm'
          placeholder='Player name (optional)'
        />
      </Box>
    </>
  );
}
