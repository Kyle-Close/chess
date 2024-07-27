import { Button } from '@chakra-ui/react';
import { IoArrowRedo } from 'react-icons/io5';
import { useAppSelector } from '../hooks/useBoard';

interface RedoButtonProps {
  handleClick: () => void;
}
export function RedoButton({ handleClick }: RedoButtonProps) {
  const gameInfo = useAppSelector((state) => state.gameInfo);
  const gameSettings = useAppSelector((state) => state.gameSettings);
  const isDisabled = gameInfo.moveHistoryRedo.length === 0 || !gameSettings.isUndoRedo;

  return (
    <Button
      isDisabled={isDisabled}
      iconSpacing={0}
      rounded='full'
      colorScheme='green'
      onClick={handleClick}
      rightIcon={<IoArrowRedo />}
    />
  );
}
