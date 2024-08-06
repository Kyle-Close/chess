import { Box, Heading, IconButton } from '@chakra-ui/react';
import { BaseModal } from '../generic/BaseModal';
import BlackQueen from '../../assets/black-queen.png';
import BlackBishop from '../../assets/black-bishop.png';
import BlackKnight from '../../assets/black-knight.png';
import BlackRook from '../../assets/black-rook.png';

interface PromotePawnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromotePawnModal({ isOpen, onClose }: PromotePawnModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Box className='flex flex-col gap-2 items-center bg-red-400'>
        <Heading>Pawn Promotion</Heading>
        <Box className='flex gap-2'>
          <IconButton
            colorScheme='green'
            aria-label='Black Queen'
            icon={<Box maxW='1.5rem' as='img' src={BlackQueen} />}
          />
          <IconButton
            colorScheme='green'
            aria-label='Black Bishop'
            icon={<Box maxW='1rem' as='img' src={BlackBishop} />}
          />
          <IconButton
            colorScheme='green'
            aria-label='Black Knight'
            icon={<Box maxW='1.2rem' as='img' src={BlackKnight} />}
          />
          <IconButton
            colorScheme='green'
            aria-label='Black Rook'
            icon={<Box maxW='1rem' as='img' src={BlackRook} />}
          />
        </Box>
      </Box>
    </BaseModal>
  );
}
