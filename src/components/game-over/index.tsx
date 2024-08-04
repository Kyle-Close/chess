import { BaseModal } from '../generic/BaseModal';
import { Result } from './result';
import { Stats } from './Stats';

interface GameOverProps {
  isOpen: boolean;
  closeModal: () => void;
}

export function GameOver({ isOpen, closeModal }: GameOverProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={() => {}}>
      <Result closeModal={closeModal} />
      <Stats />
    </BaseModal>
  );
}
