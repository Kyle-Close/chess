import { BaseModal } from '../generic/BaseModal';
import { Result } from './result';
import { Stats } from './Stats';

interface GameOverProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function GameOver({ isOpen, handleClose }: GameOverProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <Result />
      <Stats />
    </BaseModal>
  );
}
