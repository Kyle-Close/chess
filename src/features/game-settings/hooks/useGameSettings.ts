import { GameType, TimeControl } from 'base/redux/slices/gameSettings';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetupForLocalGame } from './useSetupForLocalGame';

export type LocalGameSetupFormInputs = {
  whiteName: string;
  blackName: string;
  selectedTimeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
  fen: string;
};

export function useGameSettings(gameType: GameType) {
  // Game settings are determined by the setup forms
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();

  const { setupLocalGame } = useSetupForLocalGame()

  const onFormSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) => {
    switch (gameType) {
      case GameType.LOCAL:
        setupLocalGame(data);
        break;
      case GameType.COMPUTER:
        break;
      case GameType.ONLINE:
        break;
      default:
        throw new Error('Invalid game type sent to useGameSettings')
    }
  }

  return {
    onFormSubmit,
    register,
    handleSubmit,
  };
}
