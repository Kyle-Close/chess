import { Button } from '@chakra-ui/react';
import { IoArrowRedo } from 'react-icons/io5';

interface RedoButtonProps {
  handleClick: () => void;
}
export function RedoButton({ handleClick }: RedoButtonProps) {
  return <Button onClick={handleClick} leftIcon={<IoArrowRedo />} />;
}
