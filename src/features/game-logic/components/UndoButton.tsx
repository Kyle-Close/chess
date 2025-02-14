import { Button } from '@chakra-ui/react';
import { useAppSelector } from 'base/features/game-board/hooks/useBoard';
import { IoArrowUndo } from 'react-icons/io5';

interface UndoButtonProps {
  handleClick: () => void;
}
export function UndoButton({ handleClick }: UndoButtonProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const isDisabled = gameInfo.moveHistory.length === 0 || !gameSettings.isUndoRedo;

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
