import { Box, Heading, IconButton } from '@chakra-ui/react';
import { FaChessQueen } from 'react-icons/fa';
import { FaChessKnight } from 'react-icons/fa';
import { FaChessBishop } from 'react-icons/fa6';
import { FaChessRook } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from 'base/features/game-board/hooks/useBoard';
import { useTransitionTurn } from '../hooks/useTransitionTurn';
import { clearPawnPromotionSquare, setIsPlaying } from 'base/redux/slices/gameInfo';
import { PieceType } from 'base/features/game-board/hooks/usePiece';
import { BaseModal } from 'base/components/BaseModal';
import { MoveMetaData } from '../utils/move-execution/buildMoveMetaData';
import { Piece } from 'base/data/getInitialBoardState';

interface PromotePawnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromotePawnModal({ isOpen, onClose }: PromotePawnModalProps) {
  const dispatch = useAppDispatch();
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const moveMetaData = useAppSelector((state) => state.move);
  const { transition } = useTransitionTurn();

  const handleClick = (pieceType: PieceType) => {
    if (!gameInfo.pawnPromotionSquare) return;

    const copyMove: MoveMetaData = JSON.parse(JSON.stringify(moveMetaData));
    const copyBoard = copyMove.updatedBoard;
    const newPiece: Piece = { type: pieceType, hasMoved: true, color: copyMove.piece.color };

    copyBoard[copyMove.endPosition].piece = newPiece;

    dispatch(clearPawnPromotionSquare());
    dispatch(setIsPlaying(true));
    transition(copyMove);
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
