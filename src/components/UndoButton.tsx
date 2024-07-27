import { Button } from '@chakra-ui/react';
import { IoArrowUndo } from 'react-icons/io5';

interface UndoButtonProps {
  handleClick: () => void;
}
export function UndoButton({ handleClick }: UndoButtonProps) {
  return <Button onClick={handleClick} leftIcon={<IoArrowUndo />} />;
}
