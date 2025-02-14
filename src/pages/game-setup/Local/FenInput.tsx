import { Input } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';
import { LocalGameSetupFormInputs } from '../../../features/game-settings/hooks/useGameSettings';

interface FenInputProps {
  register: UseFormRegister<LocalGameSetupFormInputs>;
}

export function FenInput({ register }: FenInputProps) {
  return <Input size='sm' placeholder='FEN string (optional)' {...register('fen')} />;
}
