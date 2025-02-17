import { Button } from '@chakra-ui/react';
import { IoArrowRedo } from 'react-icons/io5';
import { useAppSelector } from '../../game-board/hooks/useBoard';

interface RedoButtonProps {
  handleClick: () => void;
}
export function RedoButton({ handleClick }: RedoButtonProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const isDisabled = gameInfo.moveHistoryRedo.length === 0 || !gameSettings.isUndoRedo;

  return (
    <Button
      disabled={isDisabled}
      rounded='full'
      colorScheme='green'
      onClick={handleClick}
      children={<IoArrowRedo />}
    />
  );
}
