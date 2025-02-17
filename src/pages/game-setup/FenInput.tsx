import { Input } from '@chakra-ui/react';
import { GameSetup } from 'base/features/game-settings/hooks/useGameSettings';
import { UseFormRegister } from 'react-hook-form';

interface FenInputProps {
  register: UseFormRegister<GameSetup>;
}

export function FenInput({ register }: FenInputProps) {
  return <Input size='sm' placeholder='FEN string (optional)' {...register('fen')} />;
}
