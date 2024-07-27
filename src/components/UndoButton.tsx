import { Button } from '@chakra-ui/react';
import { IoArrowUndo } from 'react-icons/io5';
import { useAppSelector } from '../hooks/useBoard';

interface UndoButtonProps {
  handleClick: () => void;
}
export function UndoButton({ handleClick }: UndoButtonProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const isDisabled = gameInfo.moveHistory.length === 0;

  return (
    <Button
      isDisabled={isDisabled}
      iconSpacing={0}
      rounded='full'
      colorScheme='red'
      onClick={handleClick}
      leftIcon={<IoArrowUndo />}
    />
  );
}
