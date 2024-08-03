import { BaseModal } from '../generic/BaseModal';
import { Result } from './result';
import { Stats } from './Stats';

export function GameOver() {
  return (
    <BaseModal isOpen={true} onClose={() => console.log('')}>
      <Result />
      <Stats />
    </BaseModal>
  );
}
