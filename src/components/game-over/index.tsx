import { Box } from '@chakra-ui/react';
import { BaseModal } from '../generic/BaseModal';
import { Result } from './Result';

export function GameOver() {
  return (
    <BaseModal isOpen={true} onClose={() => console.log('')}>
      <Box className='flex p-6 bg-gray-300 justify-center rounded-lg caveat'>
        <Result />
      </Box>
    </BaseModal>
  );
}
