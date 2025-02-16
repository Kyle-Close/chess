import { TimeControl } from 'base/redux/slices/gameSettings';
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

export function useGameSettings() {
  // Game settings are determined by the setup forms
  const { register, handleSubmit } = useForm<LocalGameSetupFormInputs>();
  const { setupLocalGame } = useSetupForLocalGame()

  const onLocalFormSubmit: SubmitHandler<LocalGameSetupFormInputs> = (data) =>
    setupLocalGame(data);

  return {
    onLocalFormSubmit,
    register,
    handleSubmit,
  };
}
