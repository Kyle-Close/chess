import { Box, Heading, IconButton } from '@chakra-ui/react';
import { BaseModal } from '../generic/BaseModal';
import { FaChessQueen } from 'react-icons/fa';
import { FaChessKnight } from 'react-icons/fa';
import { FaChessBishop } from 'react-icons/fa6';
import { FaChessRook } from 'react-icons/fa';
import { useAppDispatch, useAppSelector, useBoard } from '../../hooks/useBoard';
import { clearPawnPromotionSquare, setIsPlaying } from '../../redux/slices/gameInfo';
import { PieceType } from '../../enums/PieceType';

interface PromotePawnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromotePawnModal({ isOpen, onClose }: PromotePawnModalProps) {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const { replacePieceAtPosition } = useBoard();

  const handleClick = (pieceType: PieceType) => {
    if (!gameInfo.pawnPromotionSquare) return;

    replacePieceAtPosition(gameInfo.pawnPromotionSquare, pieceType);
    dispatch(clearPawnPromotionSquare());
    dispatch(setIsPlaying(true));
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Box className='flex flex-col gap-2 items-center bg-gray-300 rounded-md p-4 pb-6'>
        <Heading fontSize='lg' fontFamily='Montserrat Alternates'>
          Promote to
        </Heading>
        <Box className='flex gap-4'>
          <IconButton
            size='lg'
            colorScheme='green'
            aria-label='Black Queen'
            icon={<FaChessQueen />}
            onClick={() => handleClick(PieceType.QUEEN)}
          />
          <IconButton
            size='lg'
            colorScheme='green'
            aria-label='Black Bishop'
            icon={<FaChessBishop />}
            onClick={() => handleClick(PieceType.BISHOP)}
          />
          <IconButton
            size='lg'
            colorScheme='green'
            aria-label='Black Knight'
            icon={<FaChessKnight />}
            onClick={() => handleClick(PieceType.KNIGHT)}
          />
          <IconButton
            size='lg'
            colorScheme='green'
            aria-label='Black Rook'
            icon={<FaChessRook />}
            onClick={() => handleClick(PieceType.ROOK)}
          />
        </Box>
      </Box>
    </BaseModal>
  );
}
